using sdx;
using sdx.math;
using sdx.graphics;

public const Vector2 WINDOW_SIZE = { 1280, 720 };

public class Game : AbstractPlatform {
	public static List<Entity*> display;
	public static Entity[] pool;
	public Game() {

		display = new List<Entity*>();
		bgdColor = sdx.Color.LiteSlateBlue;
		setResourceBase("/darkoverlordofdata/platformer");
		setDefaultFont("assets/OpenDyslexic-Bold.otf", 28);

		var camera = new Camera.InnerCamera();
		var map = new Map("assets/default.json");
		var factory = new Factory();
		var touch = false;

		pool = {
			factory.createBerry(),
			factory.createPlayer()
		};

		for (var i=0; i<pool.length; i++) 
			display.append(&pool[i]);
		
		System[] systems = {
			new LogicSystem(map),
			new PhysicsSystem(map),
			new HudSystem()
		};
		foreach (var system in systems) 
			system.initialize();

		Entity* player = &pool[1];

		/**
		 * Update
		 * a fixed update
		 * 
		 * @param tick count
		 */
		update = (tick) => {

			touch = processInput(touch);
			camera.setPosition(player.position);
			foreach (var system in systems) 
				system.execute(ref player, tick);
		};

		/**
		 * Render
		 * render the background, sprites & foregound
		 * 
		 * @param tick count
		 */
		render = (tick) => {

			sdx.begin();
			map.render(camera);		
			foreach (var entity in display) {
				var position = entity.position.sub(camera.position);
				entity.sprite.render((int)position.x, (int)position.y);
			}
			foreach (var system in systems) 
				system.render(ref player, tick);
			sdx.end();
		};

	}
	/**
	 *	map touch input for android into left/right/jump
	 * 
	 * 	 +------------------- // // --------------------+
	 * 	 | (0, 0) |                            | (w, 0) |
	 * 	 |        |  	        	       	   |        |
	 * 	 |   J    |                            |   J    |
	 * 	 |        |                            |        |
	 * 	 +--------+                            +--------+
	 * 	 |        |                            |        |
	 * 	 |        |                            |        |
	 * 	 |   LJ   |                            |   RJ   |
	 * 	 |        |                            |        |
	 * 	 +--------+                            +--------+
	 * 	 |        |                            |        |
	 * 	 |    L   |                            |    R   |
	 * 	 |        |                            |        |
	 * 	 | (0, h) |                            | (w, h) |
	 * 	 +------------------- // // --------------------+
	 * 
	 */
	public bool processInput(bool touch) {
		var sz = height/3;			

		if (touch) {
			direction[sdx.Direction.LEFT] = false;	
			direction[sdx.Direction.RIGHT] = false;	
			direction[sdx.Direction.UP] = false;	
			direction[sdx.Direction.DOWN] = false;	
			touch = false;
		}
		if (mouseDown) { 
			touch = true;
			if (mouseY < sz*2)
				direction[sdx.Direction.UP] = true;
			if (mouseX < sz)
				direction[sdx.Direction.LEFT] = true;
			else if (mouseX > sdx.width-sz)
				direction[sdx.Direction.RIGHT] = true;
		}
		return touch;
	}
}
		
