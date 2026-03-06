import numpy as np
import torch
from abc import ABC, abstractmethod
from typing import Union, List, Any
from comfy.utils import ProgressBar
from tqdm import tqdm

class ProgressMixin:
    def start_progress(self, total_steps, desc="Processing"):
        self.progress_bar = ProgressBar(total_steps)
        self.tqdm_bar = tqdm(total=total_steps, desc=desc, leave=False)
        self.current_progress = 0
        self.total_steps = total_steps

    def update_progress(self, step=1):
        self.current_progress += step
        if self.progress_bar:
            self.progress_bar.update(step)
        if self.tqdm_bar:
            self.tqdm_bar.update(step)

    def end_progress(self):
        if self.tqdm_bar:
            self.tqdm_bar.close()
        self.progress_bar = None
        self.tqdm_bar = None
        self.current_progress = 0
        self.total_steps = 0

class ScheduledParameter:
    """Wrapper class for parameters that can be either single values or sequences"""
    def __init__(self, value: Union[float, int, List[Union[float, int]]], frame_count: int):
        self.original_value = value
        self.frame_count = frame_count
        self._sequence = None
        self._initialize_sequence()

    def _initialize_sequence(self):
        if isinstance(self.original_value, (list, tuple)):
            # If it's a sequence, interpolate to match frame count
            x = np.linspace(0, 1, len(self.original_value))
            y = np.array(self.original_value)
            f = np.interp(np.linspace(0, 1, self.frame_count), x, y)
            self._sequence = f
        else:
            # If it's a single value, repeat it
            self._sequence = np.full(self.frame_count, self.original_value)

    def get_value(self, frame_index: int) -> Union[float, int]:
        """Get the parameter value for a specific frame"""
        if frame_index < 0 or frame_index >= self.frame_count:
            # Fallback to last frame if out of bounds (can happen with rounding)
            frame_index = np.clip(frame_index, 0, self.frame_count - 1)
        return float(self._sequence[frame_index])

    def get_normalized_sequence(self) -> np.ndarray:
        """Get the sequence normalized to [0,1] range for feature-like behavior"""
        if self._sequence is None:
            return None
        seq = np.array(self._sequence)
        min_val = np.min(seq)
        max_val = np.max(seq)
        if max_val > min_val:
            return (seq - min_val) / (max_val - min_val)
        return np.full_like(seq, 0.5)  # If all values are the same, return 0.5

    @property
    def is_scheduled(self) -> bool:
        """Returns True if the parameter is a sequence, False if it's a single value"""
        return isinstance(self.original_value, (list, tuple))

class ParameterScheduler:
    """Helper class to manage scheduled parameters for a node"""
    def __init__(self, frame_count: int):
        self.frame_count = frame_count
        self.parameters = {}

    def register_parameter(self, name: str, value: Any) -> None:
        """Register a parameter that might be scheduled"""
        if isinstance(value, (int, float)) or (isinstance(value, (list, tuple)) and all(isinstance(x, (int, float)) for x in value)):
            self.parameters[name] = ScheduledParameter(value, self.frame_count)

    def get_value(self, name: str, frame_index: int) -> Any:
        """Get the value of a parameter for a specific frame"""
        if name in self.parameters:
            return self.parameters[name].get_value(frame_index)
        raise KeyError(f"Parameter {name} not registered")

    def get_as_feature(self, name: str) -> np.ndarray:
        """Get a parameter's sequence normalized as a feature (0-1 range)"""
        if name in self.parameters:
            return self.parameters[name].get_normalized_sequence()
        return None

    def is_scheduled(self, name: str) -> bool:
        """Check if a parameter is scheduled"""
        if name in self.parameters:
            return self.parameters[name].is_scheduled
        return False

    def has_scheduled_parameters(self) -> bool:
        """Check if any parameters are scheduled"""
        return any(param.is_scheduled for param in self.parameters.values())

class FlexBase(ProgressMixin, ABC):
    @classmethod
    def INPUT_TYPES(cls):
        base_inputs = {
            "required": {
                "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "feature_threshold": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "feature_param": (["None"],),
                "feature_mode": (["relative", "absolute"], {"default": "relative"}),
            },
            "optional": {
                "opt_feature": ("FEATURE",),
            }
        }
        return base_inputs

    def __init__(self):
        self.parameter_scheduler = None
        self.frame_count = None

    def initialize_scheduler(self, frame_count: int, **kwargs):
        """Initialize parameter scheduler with all numeric parameters"""
        self.frame_count = frame_count
        self.parameter_scheduler = ParameterScheduler(frame_count)
        for key, value in kwargs.items():
            if isinstance(value, (int, float, list, tuple)):
                self.parameter_scheduler.register_parameter(key, value)

    def get_feature_value(self, frame_index: int, feature=None):
        """Get feature value from a provided feature"""
        if feature is not None:
            return feature.get_value_at_frame(frame_index)
        return None

    @classmethod
    @abstractmethod
    def get_modifiable_params(cls):
        """Return a list of parameter names that can be modulated."""
        return []

    def modulate_param(self, param_name: str, base_value: float,
                      feature_value: float, strength: float, mode: str) -> float:
        """Modulate a parameter value based on a feature value."""
        # Apply modulation
        if mode == "relative":
            # Adjust parameter relative to its value and the feature
            return base_value * (1 + (feature_value - 0.5) * 2 * strength)
        else:  # absolute
            # Adjust parameter directly based on the feature
            return base_value * feature_value * strength

    @abstractmethod
    def apply_effect(self, *args, **kwargs):
        """Apply the effect with potential parameter scheduling"""
        pass

    @abstractmethod
    def apply_effect_internal(self, *args, **kwargs):
        """Internal method to be implemented by subclasses."""
        pass

    def process_parameters(self, frame_index: int = 0, feature_value: float = None, 
                          feature_param: str = None, feature_mode: str = "relative", **kwargs) -> dict:
        """Process parameters considering both scheduling and feature modulation."""
        # Initialize parameter scheduler if not already done
        if self.parameter_scheduler is None:
            frame_count = kwargs.get('frame_count', 1)
            for value in kwargs.values():
                if isinstance(value, (list, tuple, np.ndarray)):
                    frame_count = len(value)
                    break
            self.initialize_scheduler(frame_count, **kwargs)

        # Get input types to determine parameter types
        input_types = self.INPUT_TYPES()["required"]

        # Get all parameters that could be scheduled
        processed_kwargs = {}
        
        # Helper function to process schedulable parameters
        def process_schedulable_param(param_name: str, default_value: float) -> float:
            value = kwargs.get(param_name, default_value)
            if isinstance(value, (list, tuple, np.ndarray)):
                try:
                    value = float(value[frame_index])
                except (IndexError, TypeError):
                    value = float(value[0])
            else:
                value = float(value)
            processed_kwargs[param_name] = value
            return value

        # Process parameters needed for feature modulation
        strength = process_schedulable_param('strength', 1.0)
        feature_threshold = process_schedulable_param('feature_threshold', 0.0)

        # Process remaining parameters
        for param_name, value in kwargs.items():
            if param_name in ['strength', 'feature_threshold']:  # Skip already processed parameters
                continue
                
            # Pass through any non-numeric parameters
            if param_name not in input_types or input_types[param_name][0] not in ["INT", "FLOAT"]:
                processed_kwargs[param_name] = value
                continue

            try:
                # Handle different types of inputs
                if isinstance(value, (list, tuple, np.ndarray)):
                    if isinstance(value, np.ndarray):
                        if value.ndim > 1:
                            value = value.flatten().tolist()
                        else:
                            value = value.tolist()
                    try:
                        base_value = float(value[frame_index])
                    except (IndexError, TypeError):
                        base_value = float(value[0])
                else:
                    base_value = float(value)

                # Only modulate if:
                # 1. This parameter is the target parameter
                # 2. We have a feature value
                if (param_name == feature_param and 
                    feature_value is not None):
                    
                    if feature_value >= feature_threshold:
                        processed_value = self.modulate_param(param_name, base_value, feature_value, strength, feature_mode)
                    else:
                        processed_value = base_value
                        
                    if input_types[param_name][0] == "INT":
                        processed_kwargs[param_name] = int(processed_value)
                    else:
                        processed_kwargs[param_name] = processed_value
                else:
                    if input_types[param_name][0] == "INT":
                        processed_kwargs[param_name] = int(base_value)
                    else:
                        processed_kwargs[param_name] = base_value
            except (ValueError, TypeError):
                processed_kwargs[param_name] = value

        # Ensure feature_value is passed through unmodified
        if feature_value is not None:
            processed_kwargs['feature_value'] = feature_value
        processed_kwargs['frame_index'] = frame_index
        processed_kwargs['feature_param'] = feature_param
        processed_kwargs['feature_mode'] = feature_mode
        return processed_kwargs
