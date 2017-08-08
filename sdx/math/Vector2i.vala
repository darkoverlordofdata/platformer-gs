namespace sdx.math { 
    
    public struct Vector2i {
        public int x;
        public int y;
        
        public Vector2i(int _x, int _y) {
            x = _x;
            y = _y;
        }

        public static Vector2i add(Vector2i v, Vector2i v2) {
            return { v.x + v2.x, v.y + v2.y };
        }

        public bool equals(Vector2i other) {
            return x == other.x && y == other.y;
        }
    }
}