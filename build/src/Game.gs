
uses SDL
uses SDL.Video
uses SDLTTF

const UNUSED_Game: Vector2d = { 0, 0 } 
// unused base type to generate forward reference so that Camera typedef works in this file...
const WINDOW_SIZE: Point	= { 1280, 720 }

[Compact, CCode ( /** reference counting */
	ref_function = "game_retain", 
	unref_function = "game_release"
)]
class Game
	retainCount__: int = 1
	def retain() : unowned Game
		GLib.AtomicInt.add (ref retainCount__, 1)
		return this
	def release() 
		if GLib.AtomicInt.dec_and_test (ref retainCount__) do this.free ()
	def extern free()
	map: Map
	camera: Camera
	cameraType: CameraType
	factory: Entities
	entities: array of Entity
	system: Systems
	hud: Hud
	player: Entity*
	sprites: List of Entity* = new List of Entity*()

	construct()
		cameraType = CameraType.SIMPLE_CAMERA 
		sdx.setDefaultFont("assets/OpenDyslexic-Bold.otf", 28);
		sdx.bgdColor = sdx.Color.LiteSlateBlue
		factory = new Entities()		 
		map = new Map("assets/default.json")
		entities = {
			factory.createBerry(),
			factory.createPlayer()
		}
		system = new Systems(this)
		hud = new Hud()
		player = &entities[1]
		for var i=0 to (entities.length-1) do sprites.append(&entities[i])


	def update(tick: int)
		sdx.update()
		system.physics(ref player, tick)
		system.camera(ref player, tick)
		system.logic(ref player, tick)			

	def render(tick: int)
		sdx.begin()
		map.render(camera)		
		for sprite in sprites 
			var x = sprite.position.x - camera.x
			var y = sprite.position.y - camera.y
			sprite.sprite.render((int)x, (int)y)
		hud.render(ref player, tick)
		sdx.end()

