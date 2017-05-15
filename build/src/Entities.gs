
uses SDL
uses SDL.Video
uses SDLTTF
/**
 * Entity Factory
 */

 struct Entity 
	id: int					 /* Unique sequential id */
	name: string				/* Display name */
	active: bool				/* In use */
	category: Category		  /* Category */
	actor: Actor				/* Display Actor */
	position: Point2d		   /* Position on screen */
	bounds: Rect				/* Sprite dimensions*/
	sprite: Sprite			  /* Sprite */
								/* Optional: */
	scale: Vector2d?			/* Display scale */
	tint: Color?				/* Color to use as tint */
	expires: Timer?			 /* Countdown until expiration */
	health: Health?			 /* Track health */
	velocity: Vector2d?		 /* Cartesian velocity*/


def CreatePlayer(texture: SDL.Video.Texture, h:int, w:int): Entity
	return Entity(){
		id = 0,
		name = "Player",
		active = true,
		category = Category.PLAYER,
		actor = Actor.PLAYER,
		position = point2d(170, 500),
		bounds = rect(0, 0, h, w),
		sprite = sprite(texture, h, w),
		scale = vector2d(1, 1),
		tint = color(),
		expires = timer(),
		health = health(0, 0),
		velocity = vector2d()
	}


def playerSegments(x:int, y:int): array of Segment		
	return {
		segment(rect(192,  64, 64, 32), rect(x-60, y,	96, 48), RendererFlip.NONE),
		segment(rect( 96,   0, 96, 96), rect(x-48, y-48, 96, 96), RendererFlip.NONE),
		segment(rect(192,  64, 64, 32), rect(x-36,	y, 96, 48), RendererFlip.NONE),
		segment(rect(192,  32, 64, 32), rect(x-60,	y, 96, 48), RendererFlip.NONE),
		segment(rect(  0,   0, 96, 96), rect(x-48, y-48, 96, 96), RendererFlip.NONE),
		segment(rect(192,  32, 64, 32), rect(x-36,	y, 96, 48), RendererFlip.NONE),
		segment(rect( 64,  96, 32, 32), rect(x-18, y-21, 36, 36), RendererFlip.NONE),
		segment(rect( 64,  96, 32, 32), rect(x- 6, y-21, 36, 36), RendererFlip.HORIZONTAL)
	}

def buildSprite(renderer: SDL.Video.Renderer, source: SDL.Video.Surface, builder: SpriteBuilder, h: int, w: int): Texture
	var flags = (uint32)0x00010000  // SDL_SRCALPHA
	var rmask = (uint32)0x000000ff  
	var gmask = (uint32)0x0000ff00
	var bmask = (uint32)0x00ff0000
	var amask = (uint32)0xff000000
	var surface = new Video.Surface.legacy_rgb(flags, h, w, 32, rmask, gmask, bmask, amask)
	for var segment in builder(h/2, w/2)
		source.blit_scaled(segment.source, surface, segment.dest)
	var texture = Video.Texture.create_from_surface(renderer, surface)
	return texture

def loadTexture(renderer: Renderer, path: string): Texture
	var surface = SDLImage.load(path)
	sdlFailIf(surface == null, "Unable to load image!")
	var texture = Video.Texture.create_from_surface(renderer, surface)
	sdlFailIf(texture == null, "Unable to load texture!")
	texture.set_blend_mode(Video.BlendMode.BLEND)
	return texture


