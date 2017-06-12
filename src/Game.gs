uses sdx.graphics

const WINDOW_SIZE: Point2d = { 1280, 720 }

class Game : Object
	map: Map
	camera: Camera.InnerCamera
	factory: Entities
	hud: Hud
	player: Entity*
	touch: bool
	sprites: List of Entity* = new List of Entity*()
	pool: array of Entity
	sys: array of systems.System
	space: cp.Space
	body: cp.Body
	shape: cp.CircleShape
	groundBody: unowned cp.Body
	groundShape: cp.SegmentShape

	construct()
		sdx.setResourceBase("/darkoverlordofdata/platformer")
		sdx.setDefaultFont("assets/OpenDyslexic-Bold.otf", 28)

		camera = new Camera.InnerCamera()
		sdx.bgdColor = sdx.Color.LiteSlateBlue
		factory = new Entities()		 
		map = new Map("assets/default.json")

		pool = {
			factory.createBerry(),
			factory.createPlayer()
		}
		
		sys = {
			new systems.LogicSystem(this),
			new systems.PhysicsSystem(this)
		}
		
		hud = new Hud()
		player = &pool[1]
		for var i=0 to (pool.length-1) do sprites.append(&pool[i])

		space = new cp.Space()
		space.set_gravity({ 0, 100 })
		body = new cp.Body(100, cp.INFINITY)
		body.set_position({ player.position.x, player.position.y })
		space.add_body(body)
		shape = new cp.CircleShape(body, 20, { 0, 0 })
		shape.set_elasticity(0.5)
		shape.set_friction(0.8)
		shape.set_user_data(player)
		shape.set_collision_type(1)
		space.add_shape(shape)

		groundBody = cp.Body.new_static()
		groundShape = new cp.SegmentShape(groundBody, { 0, sdx.height-150 }, { sdx.width, sdx.height-150 }, 10)
		groundShape.set_elasticity(0.5)
		groundShape.set_friction(1.0)
		space.add_shape(groundShape)


	/**
	 * increment the game model
	 */
	def update(tick: int)
		mapInput()
		space.step(0.1)
		var pos = body.get_position()

		sdx.update()
		player.position = { pos.x, pos.y }
		camera.setPosition(player.position)
		for var system in sys do system.execute(ref player, tick)

	/**
	 * render the background, sprites & foregound
	 */
	def render(tick: int)
		sdx.begin()
		map.render(camera)		
		for sprite in sprites 
			var position = sprite.position.sub(camera.position)
			sprite.sprite.render((int)position.x, (int)position.y)
		hud.render(ref player, tick)
		sdx.end()


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
	def mapInput()
		var sz = sdx.height/3			

		if touch
			sdx.direction[sdx.Direction.LEFT] = false	
			sdx.direction[sdx.Direction.RIGHT] = false	
			sdx.direction[sdx.Direction.UP] = false	
			sdx.direction[sdx.Direction.DOWN] = false	
			touch = false

		if sdx.mouseDown 
			touch = true
			if sdx.mouseY < sz*2 
				sdx.direction[sdx.Direction.UP] = true
			if sdx.mouseX < sz
				sdx.direction[sdx.Direction.LEFT] = true
			else if sdx.mouseX > sdx.width-sz
				sdx.direction[sdx.Direction.RIGHT] = true

		
