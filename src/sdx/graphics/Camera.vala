namespace sdx.graphics {

	public class Camera : Object {
        
		public enum Kind {
            FluidCamera, InnerCamera, SimpleCamera
		}
        
	    public delegate void CameraSetPosition(Point2d position);

		public Kind kind;
		public Vector2d position;
        public CameraSetPosition setPosition = (position) => {};


        public class InnerCamera : Camera {
            /**
             * InnerCamera
             * 
             */
            public InnerCamera(double x = 0, double y = 0) {
                kind = Kind.InnerCamera;
                position = { x, y };

                setPosition = (player) => {
                    var area = player.x - (double)sdx.width/2;
                    position = { clamp(position.x, area-100, area+100), position.y };
                };
            }
        }
        
        public class FluidCamera : Camera {
            /**
             * FluidCamera
             * 
             */
            public FluidCamera(double x = 0, double y = 0) {
                kind = Kind.FluidCamera;
                position = { x, y };

                setPosition = (player) => {
                    var dist = position.x - player.x + (double)sdx.width/2;
                    position = { position.x += (-0.05 * dist), position.y };
                };
            }
        }

        public class SimpleCamera : Camera {
            /**
             * SimpleCamera
             * 
             */
            public SimpleCamera(double x = 0, double y = 0) {
                kind = Kind.SimpleCamera;
                position = { x, y };

                setPosition = (player) => {
                    position = { player.x - (double)sdx.width/2, position.y };
                };
            }
        }

    }
}
