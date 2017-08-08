namespace sdx.math { 

    public inline float clamp(float value, float low, float hi) {
	    return value < low ? low : value > hi ? hi : value;
    }

    public inline float sign(float s) {
        return s<0 ? -1 : s>0 ? 1 : 0;
    }

    
    public enum KeyInput {
        GoLeft = 0,
        GoRight,
        GoDown,
        Jump,
        Count
    }    

    public enum ObjectType {
        None,
        Player,
        NPC
    }

    public struct CollisionData {
        public CollisionData(MovingObject other, Vector2 overlap, Vector2 speed1, Vector2 speed2, 
            Vector2 oldPos1, Vector2 oldPos2, Vector2 pos1, Vector2 pos2) 
            {
            this.other = other;
            this.overlap = overlap;
            this.speed1 = speed1;
            this.speed2 = speed2;
            this.oldPos1 = oldPos1;
            this.oldPos2 = oldPos2;
            this.pos1 = pos1;
            this.pos2 = pos2;
        }

        public MovingObject other;
        public Vector2 overlap;
        public Vector2 speed1;
        public Vector2 speed2;
        public Vector2 oldPos1;
        public Vector2 oldPos2;
        public Vector2 pos1;
        public Vector2 pos2;
    }

    public class Constants : Object
    {
        public const float cGravity = -1030.0f;
        public const float cMaxFallingSpeed = -900.0f;
        public const float cWalkSpeed = 160.0f;
        public const float cJumpSpeed = 410.0f;
        public const float cHalfSizeY = 20.0f;
        public const float cHalfSizeX = 6.0f;
        public const float cMinJumpSpeed = 200.0f;
        public const float cOneWayPlatformThreshold = 2.0f;
        //public const float cJumpSpeed = 210.0f; //1
        //public const float cJumpSpeed = 280.0f; //2
        //public const float cJumpSpeed = 350.0f; //3
        //public const float cJumpSpeed = 380.0f; //4
        //public const float cJumpSpeed = 410.0f; //5
        //public const float cJumpSpeed = 460.0f; //6

        public static float[] cJumpSpeeds = { 210.0f, 280.0f, 350.0f, 380.0f, 410.0f, 460.0f };
        public static float[] cHalfSizes = { 6.0f, 12.0f, 20.0f, 30.0f, 36.0f, 42.0f, 50.0f, 60.0f, 62.0f};
        public const int cJumpFramesThreshold = 10;

        public const float cBotMaxPositionError = 1.0f;

        public const float cGrabLedgeStartY = 0.0f;
        public const float cGrabLedgeEndY = 2.0f;
        public const float cGrabLedgeTileOffsetY = -4.0f;
    }
    
}