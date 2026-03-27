"""Color utility functions for Ace-Step nodes."""

def hsv_to_rgb(h, s, v):
    """Simple HSV to RGB conversion.
    
    Args:
        h (float): Hue in [0, 1]
        s (float): Saturation in [0, 1]
        v (float): Value in [0, 1]
        
    Returns:
        tuple: (r, g, b) each in [0, 1]
    """
    if s == 0:
        return v, v, v
    i = int(h * 6)
    f = (h * 6) - i
    p = v * (1 - s)
    q = v * (1 - s * f)
    t = v * (1 - s * (1 - f))
    i %= 6
    if i == 0: return v, t, p
    if i == 1: return q, v, p
    if i == 2: return p, v, t
    if i == 3: return p, q, v
    if i == 4: return t, p, v
    return v, p, q
