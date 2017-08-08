namespace sdx.math { 

    public inline float clamp(float value, float low, float hi) {
	    return value < low ? low : value > hi ? hi : value;
    }

    public inline float sign(float s) {
        return s<0 ? -1 : s>0 ? 1 : 0;
    }

    
    
}