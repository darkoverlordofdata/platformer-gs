namespace  sdx.math { 

    public struct Vector2 {

        public float x;
        public float y;

        public static Vector2 zero  { get {return {  0,  0 }; } }
        public static Vector2 one   { get {return {  1,  1 }; } }
        public static Vector2 down  { get {return {  0, -1 }; } }
        public static Vector2 left  { get {return { -1,  0 }; } }
        public static Vector2 right { get {return {  1,  0 }; } }
        public static Vector2 up    { get {return {  0,  1 }; } }
        

        public static float distance(Vector2 a, Vector2 b) {
            return Math.sqrtf( (a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y) );
        }

        public Vector2(float x = 0, float y = 0) {
            this.x = x;
            this.y = y;
        }

        public inline Vector2 mul(float f) {
            return { x*f, y*f };
        }

        public inline Vector2 div(float f) {
            return { x/f, y/f };
        }

        public inline float len() {
            return Math.sqrtf(x*x + y*y);
        }

        public inline Vector2 add(Vector2 v) {
            return { x+v.x, y+v.y };
        }

        public inline Vector2 sub(Vector2 v) {
            return { x-v.x, y-v.y };
        }            

        public static inline Vector2 lerp(Vector2 a, Vector2 b, float t) {
            return { a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t };
        }

        
    }
}