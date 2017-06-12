//  namespace sdx.graphics {
//  	public enum CameraType {
//  		FLUID_CAMERA,
//  		INNER_CAMERA,
//  		SIMPLE_CAMERA
//  	}


//  	public class Camera : Object {
//  		public CameraType type;
//  		public Vector2d position;
//  		public Camera(CameraType type = CameraType.INNER_CAMERA, double x = 0, double y = 0) {
//  			this.type = type;
//  			this.position = { x, y };
//  		}
//  		public void setPosition(Point2d player) {
//  			switch(type) {

//  				case CameraType.FLUID_CAMERA:
//  					//  var dist = position.x - player.x + (double)WINDOW_SIZE.x/2;
//  					var dist = position.x - player.x + (double)sdx.width/2;
//  					position.x += (-0.05 * dist);
//  					break;

//  				case CameraType.INNER_CAMERA:
//                      print("%d - %d\n", WINDOW_SIZE.x, sdx.width);

//  					var area = player.x - (double)WINDOW_SIZE.x/2;
//  					//  var area = player.x - (double)sdx.width/2;
//  					position.x = clamp(position.x, area-100, area+100);
//  					break;
					
//  				case CameraType.SIMPLE_CAMERA:
//  					//  position.x = player.x - (double)WINDOW_SIZE.x/2;
//  					position.x = player.x - (double)sdx.width/2;
//  					break;
//  			}
//  		}
//  	}

//  }