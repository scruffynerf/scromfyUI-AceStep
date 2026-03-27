"""Utility functions for matching tensor sequence lengths in mixer nodes."""
import torch
import torch.nn.functional as F

def interpolate_tensor(t, target_len, dim=1):
    """Interpolate a tensor to a target length along a specific dimension.
    Supports 2D [B, L] or [L, D] and 3D [B, L, D] tensors.
    """
    orig_dim = t.dim()
    if orig_dim == 3:
        # Standard: [B, L, D] -> [B, D, L] for interpolate
        if dim == 1:
            t = t.transpose(1, 2)
            t = F.interpolate(t, size=target_len, mode='linear', align_corners=False)
            return t.transpose(1, 2)
        elif dim == 2:
            # [B, L, D] -> [B, L, D_new]
            t = t.transpose(0, 1) # [L, B, D]
            t = t.transpose(1, 2) # [L, D, B]
            t = F.interpolate(t, size=target_len, mode='linear', align_corners=False)
            t = t.transpose(1, 2)
            return t.transpose(0, 1)
    elif orig_dim == 2:
        # [B, L] or [L, D]
        if dim == 0:
            # [L, D] -> [1, D, L]
            t = t.unsqueeze(0).transpose(1, 2)
            t = F.interpolate(t, size=target_len, mode='linear', align_corners=False)
            return t.transpose(1, 2).squeeze(0)
        else:
            # [B, L] -> [1, B, L]
            t = t.unsqueeze(0)
            t = F.interpolate(t, size=target_len, mode='linear', align_corners=False)
            return t.squeeze(0)
    return t

def pad_tensor(t, target_len, dim=1):
    """Pad a tensor with zeros to a target length along a specific dimension."""
    curr_len = t.shape[dim]
    if curr_len >= target_len:
        return t
    pad_size = target_len - curr_len
    pad_shape = list(t.shape)
    pad_shape[dim] = pad_size
    padding = torch.zeros(pad_shape, device=t.device, dtype=t.dtype)
    return torch.cat([t, padding], dim=dim)

def loop_tensor(t, target_len, dim=1):
    """Loop or crop a tensor to a target length along a specific dimension."""
    curr_len = t.shape[dim]
    if curr_len >= target_len:
        # Crop
        slices = [slice(None)] * t.dim()
        slices[dim] = slice(0, target_len)
        return t[tuple(slices)]
    
    # Loop
    reps = [1] * t.dim()
    reps[dim] = (target_len + curr_len - 1) // curr_len
    out = t.repeat(*reps)
    
    # Crop to exact target
    slices = [slice(None)] * out.dim()
    slices[dim] = slice(0, target_len)
    return out[tuple(slices)]

def match_lengths(A, B, scale_mode, dim=1):
    """Match lengths of two tensors A and B according to scale_mode.
    
    Args:
        A (torch.Tensor): First tensor.
        B (torch.Tensor): Second tensor.
        scale_mode (str): One of "scale_B_to_A", "scale_A_to_B", "pad_to_match", "loop_match", "none".
        dim (int): Dimension to match (default: 1, usually the sequence length).
        
    Returns:
        tuple: (Matched A, Matched B)
    """
    len_A = A.shape[dim]
    len_B = B.shape[dim]
    
    if len_A == len_B:
        return A, B

    if scale_mode == "scale_B_to_A":
        B = interpolate_tensor(B, len_A, dim)
    elif scale_mode == "scale_A_to_B":
        A = interpolate_tensor(A, len_B, dim)
    elif scale_mode == "pad_to_match":
        target = max(len_A, len_B)
        A = pad_tensor(A, target, dim)
        B = pad_tensor(B, target, dim)
    elif scale_mode == "loop_match":
        target = max(len_A, len_B)
        A = loop_tensor(A, target, dim)
        B = loop_tensor(B, target, dim)
    elif scale_mode == "none":
        # Fallback for element-wise ops if not concatenating; safely scale B to A
        B = interpolate_tensor(B, len_A, dim)
    else:
        # Default fallback
        B = interpolate_tensor(B, len_A, dim)
        
    return A, B
