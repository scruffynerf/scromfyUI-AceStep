"""AceStepZerobytesConditioningGenerator node for ACE-Step"""
import json
import logging
import torch
import torch.nn.functional as F

from .includes.zerobytes_utils import (
    position_hash, hash_to_float, coherent_value, coherent_field,
    FSQ_LEVELS, DIM_SALTS, SECTION_TYPE_IDS, dims_to_composite,
    parse_section_map, build_default_section_map, lookup_section,
    section_start_token, all_previous_same_type,
    section_repetition_factor, motif_echo, call_response_influence,
)

logger = logging.getLogger(__name__)


class AceStepZerobytesConditioningGenerator:
    """Generate audio codes via Zerobyte Family position-is-seed determinism.

    No LLM required. The coordinate IS the seed. O(1) access to any timestep.
    Produces the same codes regardless of execution order.

    Uses three Zerobyte Family methodologies:
    - Zerobytes: hierarchical point hashing (song -> section -> measure -> beat)
    - Zero-Quadratic: section repetition, motif echo, call-and-response
    - Coherent noise: smooth transitions between adjacent timesteps
    """

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "seed": ("INT", {"default": 42, "min": 0, "max": 0xFFFFFFFF}),
                "duration": ("FLOAT", {"default": 30.0, "min": 1.0, "max": 600.0, "step": 0.1}),
                "bpm": ("FLOAT", {"default": 120.0, "min": 20.0, "max": 300.0, "step": 0.1}),
                "time_signature": (["4/4", "3/4", "6/8", "2/4", "5/4", "7/8"], {"default": "4/4"}),
                "coherence_fine": ("FLOAT", {"default": 0.6, "min": 0.0, "max": 1.0, "step": 0.01}),
                "coherence_coarse": ("FLOAT", {"default": 0.8, "min": 0.0, "max": 1.0, "step": 0.01}),
                "section_mode": (["auto", "manual", "none"], {"default": "auto"}),
            },
            "optional": {
                "section_map": ("STRING", {"default": "", "multiline": True}),
                "energy": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                "density": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                "crossfade_beats": ("INT", {"default": 2, "min": 0, "max": 8}),
            }
        }

    RETURN_TYPES = ("LIST", "STRING")
    RETURN_NAMES = ("audio_codes", "section_map_info")
    FUNCTION = "generate"
    CATEGORY = "Scromfy/Ace-Step/Conditioning/Zerobytes"

    def generate(self, seed, duration, bpm, time_signature, coherence_fine,
                 coherence_coarse, section_mode, section_map="",
                 energy=0.5, density=0.5, crossfade_beats=2):
        # Parse time signature
        parts = time_signature.split("/")
        time_sig_num = int(parts[0])

        # Compute timing
        beats_per_second = bpm / 60.0
        tokens_per_beat = 5.0 / beats_per_second
        tokens_per_measure = tokens_per_beat * time_sig_num
        T = int(duration * 5)

        if T < 1:
            return ([[[0]]], json.dumps([]))

        # Build section map
        if section_mode == "manual" and section_map.strip():
            sections = parse_section_map(section_map)
            if not sections:
                sections = [{"type": "verse", "start": 0.0, "end": duration}]
        elif section_mode == "auto":
            sections = build_default_section_map(duration)
        else:
            sections = [{"type": "verse", "start": 0.0, "end": duration}]

        # Coherence frequencies based on user controls
        fine_freq = 0.15 + (1.0 - coherence_fine) * 0.15    # 0.15-0.30
        coarse_freq = 0.03 + (1.0 - coherence_coarse) * 0.07  # 0.03-0.10
        fine_octaves = 3 if coherence_fine > 0.3 else 2
        coarse_octaves = 2 if coherence_coarse > 0.3 else 1

        # Crossfade window in tokens
        crossfade_tokens = int(crossfade_beats * tokens_per_beat) if crossfade_beats > 0 else 0

        # Phase 1: Pre-calculate all base dimensions (Vectorized where possible)
        base_dims = self._generate_base_dims_vectorized(
            T, seed, sections, tokens_per_measure, tokens_per_beat,
            fine_freq, coarse_freq, fine_octaves, coarse_octaves,
            energy, density, duration)

        # Phase 2: Apply relational transforms (repetition, echo, call-response)
        # These are still somewhat sequential in logic but use pre-calculated base_dims
        final_dims = base_dims.clone()

        # Zero-Quadratic: section repetition
        final_dims = self._apply_section_repetition_vectorized(
            T, final_dims, base_dims, seed, sections, tokens_per_measure, tokens_per_beat)

        # Zero-Quadratic: motif echo
        final_dims = self._apply_motif_echo_vectorized(
            T, final_dims, base_dims, seed, sections, tokens_per_measure, tokens_per_beat)

        # Zero-Quadratic: call-and-response
        final_dims = self._apply_call_response_vectorized(
            T, final_dims, base_dims, seed, sections, tokens_per_measure, tokens_per_beat)

        # Crossfade at section boundaries
        if crossfade_tokens > 0:
            final_dims = self._apply_crossfade_vectorized(
                T, final_dims, seed, sections, crossfade_tokens)

        # Phase 3: Quantize and Format
        codes = []
        for t in range(T):
            dims_list = final_dims[t].tolist()
            codes.append(dims_to_composite(dims_list))

        section_info = json.dumps(sections)
        logger.info(f"ZeroCond: generated {len(codes)} codes (vectorized), seed={seed}, "
                     f"sections={len(sections)}")
        
        # Return as a standard 1D list (wrapped in [ ] for Comfy batch compatibility).
        # patch_conditioning() will automatically convert this to [[[c],...]] for the model.
        return ([codes], section_info)

    def _generate_base_dims_vectorized(self, T, seed, sections, tpm, tpb,
                                        fine_freq, coarse_freq, fine_oct, coarse_oct,
                                        energy, density, duration):
        """Vectorized generation of base 6D dims for all timesteps.
        
        CONVERSION LOGIC (Scalar -> Vector):
        - Scalar loop over T is replaced by torch.arange(T) and boolean masking.
        - Hierarchical attributes (section, measure) are pre-allocated as tensors.
        - Coherent noise lookups are batched into a single coherent_field call per dimension.
        """
        device = "cpu" # Default to CPU for coordinate hashing
        
        # Pre-calculate section properties for each timestep
        ts = torch.arange(T, device=device)
        sec_ids = torch.zeros(T, dtype=torch.long)
        sec_idxs = torch.zeros(T, dtype=torch.long)
        sec_seeds = torch.zeros(T, dtype=torch.long)
        measure_in_secs = torch.zeros(T, dtype=torch.long)
        
        # Fill section data (small number of sections, so loop is fine)
        type_counts = {}
        for sec in sections:
            s_type = sec["type"]
            type_id = SECTION_TYPE_IDS.get(s_type, 1)
            if s_type not in type_counts:
                type_counts[s_type] = 0
            
            # Vector mask replaces the IF-check inside the old scalar loop
            mask = (ts >= int(sec["start"] * 5)) & (ts < int(sec["end"] * 5))
            if mask.any():
                sec_ids[mask] = type_id
                sec_idxs[mask] = type_counts[s_type]
                
                # Derive section seeds (once per section instance instead of per-token)
                s_seed = position_hash(type_id, type_counts[s_type], 0x5EC, seed)
                sec_seeds[mask] = s_seed
                
                sec_start_t = int(sec["start"] * 5)
                m_in_sec = ((ts[mask] - sec_start_t) / tpm).long() if tpm > 0 else 0
                measure_in_secs[mask] = m_in_sec
                
            type_counts[s_type] += 1

        mea_seeds = torch.zeros(T, dtype=torch.long)
        # We need mea_seeds for each timestep. Mea seed depends on measure_in_sec and sec_seed.
        # This remains an O(T) scalar loop due to the non-vectorized nature of xxhash.
        for t in range(T):
            mea_seeds[t] = position_hash(measure_in_secs[t].item(), 0, 0x4EA, sec_seeds[t].item())

        ts_float = ts.float()
        dims = torch.zeros((T, 6), device=device)
        
        from .includes.zerobytes_utils import coherent_field
        
        # Coalesce all noise requests to minimize roundtrips
        # Coarse dims (3, 4, 5)
        for d in range(3, 6):
            levels = FSQ_LEVELS[d]
            salt = DIM_SALTS[d]
            
            # Base from section seed
            bases = torch.tensor([hash_to_float(position_hash(d, 0, salt, sec_seeds[t].item())) for t in range(T)])
            
            # Variation from coherent noise
            noises = torch.tensor(coherent_field(
                (ts_float * coarse_freq).tolist(),
                [d * 0.1] * T,
                (mea_seeds + salt).tolist(),
                octaves=coarse_oct
            ))
            
            combined = bases * 0.7 + (noises * 0.5 + 0.5) * 0.3
            
            # Apply energy/density bias
            if d == 3:
                combined = combined * 0.6 + energy * 0.4
            elif d == 4:
                combined = combined * 0.7 + density * 0.3
                
            # Intro/outro envelope on d3
            if d == 3:
                for sec in sections:
                    if sec["type"] in ["intro", "outro"]:
                        s_t = int(sec["start"] * 5)
                        e_t = int(sec["end"] * 5)
                        dur = max(1, e_t - s_t)
                        mask = (ts >= s_t) & (ts < e_t)
                        if mask.any():
                            progress = (ts_float[mask] - s_t) / dur
                            if sec["type"] == "intro":
                                combined[mask] *= progress * progress * (3 - 2 * progress)
                            else: # outro
                                combined[mask] *= 1.0 - progress * progress * (3 - 2 * progress)
            
            dims[:, d] = combined * (levels - 1)

        # Fine dims (0, 1, 2)
        beat_in_measures = ((ts % tpm) / tpb).long() if tpb > 0 else 0
        for d in range(3):
            levels = FSQ_LEVELS[d]
            salt = DIM_SALTS[d]
            
            # Base from measure seed + beat
            bases = torch.tensor([hash_to_float(position_hash(d, beat_in_measures[t].item(), salt, mea_seeds[t].item())) for t in range(T)])
            
            noises = torch.tensor(coherent_field(
                (ts_float * fine_freq).tolist(),
                [d * 0.1] * T,
                [seed + salt] * T,
                octaves=fine_oct
            ))
            
            combined = bases * 0.4 + (noises * 0.5 + 0.5) * 0.6
            dims[:, d] = combined * (levels - 1)

        return dims.clamp(0.0, 7.0) 

    def _apply_section_repetition_vectorized(self, T, final_dims, base_dims, seed, sections, tpm, tpb):
        """Blend dims with earlier same-type sections.
        
        CONVERSION LOGIC (Scalar -> Vector):
        - Scalar 't_in_section' mapping is replaced by tensor slice operations [start:end].
        - Repetition factor is still calculated per section-pair (hierarchical).
        """
        ts = torch.arange(T)
        for sec in sections:
            s_type = sec["type"]
            type_id = SECTION_TYPE_IDS.get(s_type, 1)
            # Find which instance of this type we are
            all_instances = [s for s in sections if s["type"] == s_type]
            sec_idx = all_instances.index(sec)
            
            if sec_idx == 0:
                continue
                
            current_start = int(sec["start"] * 5)
            current_end = int(sec["end"] * 5)
            sec_len = current_end - current_start
            if sec_len <= 0:
                continue
                
            for prev_idx in range(sec_idx):
                rep_factor = section_repetition_factor(type_id, prev_idx, type_id, sec_idx, seed)
                if rep_factor > 0.5:
                    prev_sec = all_instances[prev_idx]
                    prev_start = int(prev_sec["start"] * 5)
                    prev_end = int(prev_sec["end"] * 5)
                    copy_len = min(sec_len, prev_end - prev_start)
                    
                    # Blend base_dims from prev section into current section
                    final_dims[current_start:current_start+copy_len] = \
                        final_dims[current_start:current_start+copy_len] * (1 - rep_factor) + \
                        base_dims[prev_start:prev_start+copy_len] * rep_factor
        return final_dims

    def _apply_motif_echo_vectorized(self, T, final_dims, base_dims, seed, sections, tpm, tpb):
        """Apply motif echo from previous measures.
        
        CONVERSION LOGIC (Scalar -> Vector):
        - Replaces per-token measure lookback with per-measure slice blending.
        - Relies on pre-calculated 'base_dims' for the echo source.
        """
        if tpm <= 0: return final_dims
        num_measures = int(T / tpm) + 1
        lookback = 16
        
        for m in range(num_measures):
            m_start = int(m * tpm)
            if m_start >= T: break
            m_end = min(T, int((m + 1) * tpm))
            m_len = m_end - m_start
            
            for prev_m in range(max(0, m - lookback), m):
                echo = motif_echo(prev_m, m, seed)
                if echo is not None:
                    prev_start = int(prev_m * tpm)
                    copy_len = min(m_len, T - prev_start)
                    if copy_len <= 0: continue
                    
                    blend = echo["strength"] * (1 - echo["variation"])
                    for d in echo["echo_dims"]:
                        final_dims[m_start:m_start+copy_len, d] = \
                            final_dims[m_start:m_start+copy_len, d] * (1 - blend) + \
                            base_dims[prev_start:prev_start+copy_len, d] * blend
        return final_dims

    def _apply_call_response_vectorized(self, T, final_dims, base_dims, seed, sections, tpm, tpb):
        """Apply directional call-and-response influence.
        
        CONVERSION LOGIC (Scalar -> Vector):
        - Double loop (t, prev_t) is preserved to maintain per-pair distance-based influence.
        - The source of the response is now the pre-calculated 'base_dims' tensor.
        """
        lookback = 20
        for t in range(T):
            for prev_t in range(max(0, t - lookback), t):
                influence = call_response_influence(prev_t, t, seed)
                if influence > 0.3:
                    # Only fine dims respond (0,1,2)
                    final_dims[t, :3] = final_dims[t, :3] * (1 - influence * 0.4) + \
                                        base_dims[prev_t, :3] * influence * 0.4
        return final_dims

    def _apply_crossfade_vectorized(self, T, final_dims, seed, sections, crossfade_tokens):
        """Smoothstep crossfade at section boundaries.
        
        CONVERSION LOGIC (Scalar -> Vector):
        - Scalar boundary distance check is replaced by a boolean mask on 'ts'.
        - Smoothstep formula is applied to the masked tensor slice.
        """
        ts = torch.arange(T)
        for i, sec in enumerate(sections[:-1]):
            boundary_t = int(sec["end"] * 5)
            start_fade = boundary_t - crossfade_tokens
            if start_fade < 0: start_fade = 0
            
            mask = (ts >= start_fade) & (ts < boundary_t)
            if mask.any():
                next_sec = sections[i + 1]
                next_type_id = SECTION_TYPE_IDS.get(next_sec["type"], 1)
                next_sec_seed = position_hash(next_type_id, 0, 0x5EC, seed)
                
                dist_to_boundary = boundary_t - ts[mask]
                progress = 1.0 - (dist_to_boundary.float() / crossfade_tokens)
                progress = progress * progress * (3 - 2 * progress) # smoothstep
                
                for d in range(3, 6):
                    next_base = hash_to_float(position_hash(d, 0, DIM_SALTS[d], next_sec_seed))
                    target_val = next_base * (FSQ_LEVELS[d] - 1)
                    final_dims[mask, d] = final_dims[mask, d] * (1 - progress * 0.5) + \
                                          target_val * progress * 0.5
        return final_dims


NODE_CLASS_MAPPINGS = {
    "AceStepZerobytesConditioningGenerator": AceStepZerobytesConditioningGenerator,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepZerobytesConditioningGenerator": "Zerobytes Conditioning Generator",
}
