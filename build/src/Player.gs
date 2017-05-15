
uses SDL
uses SDL.Video
uses SDLTTF
	
[Compact, CCode ( /** reference counting */
	ref_function = "player_retain", 
	unref_function = "player_release"
)]
class Player
	retainCount__: int = 1
	def retain() : unowned Player
		GLib.AtomicInt.add (ref retainCount__, 1)
		return this
	def release() 
		if GLib.AtomicInt.dec_and_test (ref retainCount__) do this.free ()
	def extern free()
	texture: unowned Video.Texture
	source: unowned Video.Surface
	pos: Point2d
	vel: Vector2d
	time: Timer
	first: bool = true
	construct(texture: Video.Texture, surface: Video.Surface)
		this.texture = texture
		this.source = surface
		restart()

	def restart()
		pos = point2d(170, 500)
		vel = vector2d(0, 0)
		time.begin = -1
		time.finish = -1 

	def render(renderer: SDL.Video.Renderer, texture: Texture,  pos: Point2d)
		renderer.copy(texture, null, {(int)pos.x-48, (int)pos.y-48, 96, 96})

	def composite(renderer: SDL.Video.Renderer): Texture
		var flags = (uint32)0x00010000  // SDL_SRCALPHA
		var rmask = (uint32)0x000000ff  
		var gmask = (uint32)0x0000ff00
		var bmask = (uint32)0x00ff0000
		var amask = (uint32)0xff000000
		var surface = new Video.Surface.legacy_rgb(flags, 96, 96, 
				32, rmask, gmask, bmask, amask)
		for var part in bodyParts()
			source.blit_scaled(part.source, surface, part.dest)
		var texture = Video.Texture.create_from_surface(renderer, surface)
		return texture

	def bodyParts(x:int=48, y:int=48): array of BodyPart		
		return {
			bodypart(rect(192,  64, 64, 32), rect(x-60, y,	96, 48), RendererFlip.NONE),
			bodypart(rect( 96,   0, 96, 96), rect(x-48, y-48, 96, 96), RendererFlip.NONE),
			bodypart(rect(192,  64, 64, 32), rect(x-36,	y, 96, 48), RendererFlip.NONE),
			bodypart(rect(192,  32, 64, 32), rect(x-60,	y, 96, 48), RendererFlip.NONE),
			bodypart(rect(  0,   0, 96, 96), rect(x-48, y-48, 96, 96), RendererFlip.NONE),
			bodypart(rect(192,  32, 64, 32), rect(x-36,	y, 96, 48), RendererFlip.NONE),
			bodypart(rect( 64,  96, 32, 32), rect(x-18, y-21, 36, 36), RendererFlip.NONE),
			bodypart(rect( 64,  96, 32, 32), rect(x- 6, y-21, 36, 36), RendererFlip.HORIZONTAL)
		}


	def entity(renderer: SDL.Video.Renderer):Entity
		return CreatePlayer(composite(renderer), 96, 96)

