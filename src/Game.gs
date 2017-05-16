
uses SDL
uses SDL.Video
uses SDLTTF

const WINDOW_SIZE: Point = {1280, 720}
const TILES_PER_ROW: int = 16
const TILES_SIZE: Point = {64, 64}
const PLAYER_SIZE: Vector2d = {64, 64}
const AIR: int = 0
const START: int = 78
const FINISH: int = 110
const PLAYER_PNG:string	 = "assets/player.png"
const GRASS_PNG:string	  = "assets/grass.png"
const DEFAULT_MAP:string	= "assets/default.map"
const FONT_TTF:string	   = "assets/OpenDyslexic-Bold.otf"

delegate SpriteBuilder(x:int, y:int): array of Segment		

const WHITE: Color = {255, 255, 255, 255}

class Game : Object
	inputs: array of bool
	renderer: unowned Renderer
	font: Font
	font_rw: RWops
	evt : SDL.Event
	map: Map
	camera: Vector2d
	cameraType: CameraType
	pos: Point2d
	playerSurface: Surface
	playerTexture: Texture
	grassTexture: Texture
	system: Systems
	entities: array of Entity

	construct(renderer: Renderer)
		this.renderer = renderer
		grassTexture = loadTexture(renderer, GRASS_PNG)
		playerSurface = SDLImage.load(PLAYER_PNG)
		playerTexture = buildSprite(renderer, playerSurface, playerSegments, 96, 96)
		inputs = new array of bool[6]
		font_rw = new RWops.from_file(FONT_TTF, "r")
		font = new Font.RW(font_rw, 0, 28)
		sdlFailIf(font == null, "Failed to load font")

		map = new Map(grassTexture, DEFAULT_MAP)
		cameraType = CameraType.simpleCamera 
		entities = {
			CreatePlayer(playerTexture, 96, 96)
		}
		system = new Systems(this)
	   


	def draw(entity: Entity)
		var x = entity.position.x - camera.x
		var y = entity.position.y - camera.y
		var h = entity.sprite.height
		var w = entity.sprite.width
		renderer.copy(entity.sprite.texture, null, {(int)x-h/2, (int)y-w/2, h, w})

	def draw_text(entity: Entity, tick: int)
		if entity.expires.begin >= 0
			render_text(formatTime(tick - entity.expires.begin), 50, 100, WHITE)
		else if entity.expires.finish >= 0
			render_text("Finished in: " + formatTime(entity.expires.finish), 50, 100, WHITE)
		if entity.expires.best >= 0
			render_text("Best time: " + formatTime(entity.expires.best), 50, 150, WHITE)
		
	def render(tick: int)
		renderer.set_draw_color(110, 132, 174, 255)
		renderer.clear()

		for entity in entities
			draw(entity)

		map.render(renderer, camera)		
		draw_text(entities[0], tick)
		renderer.present()

	def render_text(text: string, x: int, y: int, foreColor: Color)
		var outlineColor = color(0, 0, 0, 64)
		// try
		renderText(renderer, font, text, x, y, (FontStyle)2, outlineColor)
		renderText(renderer, font, text, x, y, (FontStyle)0, foreColor)
		// except e:Error
		// 	print e.message

	def update(tick: int)
		system.physics(ref entities[0], tick)
		system.camera(ref entities[0], tick)
		system.logic(ref entities[0], tick)			

	def toInput(key: SDL.Input.Scancode): Input
		case key	
			when SDL.Input.Scancode.LEFT
				return Input.left
			when SDL.Input.Scancode.RIGHT
				return Input.right
			when SDL.Input.Scancode.UP
				return Input.jump
			when SDL.Input.Scancode.SPACE
				return Input.jump
			when SDL.Input.Scancode.R
				return Input.restart
			when SDL.Input.Scancode.Q
				return Input.quit
		return Input.none

	def handleInput()
		evt: Event
		while SDL.Event.poll(out evt) != 0
			case evt.type
				when SDL.EventType.QUIT
					inputs[Input.quit] = true
				when SDL.EventType.KEYDOWN
					inputs[toInput(evt.key.keysym.scancode)] = true
				when SDL.EventType.KEYUP
					inputs[toInput(evt.key.keysym.scancode)] = false
