uses SDL
uses SDL.Video
uses SDLTTF

def inline clamp(value: double, low: double, hi: double): double
	return value < low ? low : value > hi ? hi : value

enum Collision
	X
	Y
	CORNER

enum Actor
	DEFAULT
	BACKGROUND
	TEXT
	PLAYER
	BONUS
	HUD

enum Category 
	BACKGROUND
	PLAYER
	BONUS

struct Entity 
	id: int					 	/* Unique sequential id */
	name: string				/* Display name */
	active: bool				/* In use */
	category: Category		  	/* Category */
	actor: Actor				/* Display Actor */
	position: Point2d		   	/* Position on screen */
	bounds: Rect				/* Sprite dimensions*/
	sprite: sdx.graphics.Sprite /* Sprite */
								/* Optional: */
	size: Vector2d?				/* Display size */
	scale: Vector2d?			/* Display scale */
	tint: Color?				/* Color to use as tint */
	expires: Timer?			 	/* Countdown until expiration */
	health: Health?			 	/* Track health */
	velocity: Vector2d?		 	/* Cartesian velocity*/

struct Blit
	source: SDL.Video.Rect
	dest: SDL.Video.Rect
	flip: SDL.Video.RendererFlip

def blit(source:SDL.Video.Rect, dest:SDL.Video.Rect, flip: SDL.Video.RendererFlip): Blit
	return { source, dest, flip }

struct Timer 
	begin: int
	finish: int
	best: int 
	
def timer(begin: int=-1, finish: int=-1, best:int=-1): Timer
	return { begin, finish, best }

struct ScaleTween
	min : double
	max : double
	speed : double
	repeat : bool
	active : bool

def scaletween(min: double, max: double, speed: double, repeat: bool, active: bool): ScaleTween
	return { min, max, speed, repeat, active }

struct Sprite
	texture: unowned Texture
	width: int
	height: int

def sprite(texture:Texture, width:int, height:int): Sprite
	return { texture, width, height }

struct Point2d
	x: double
	y: double
	def inline add(v: Vector2d): Point2d
		return point2d(x+v.x, y+v.y)
	def inline sub(v: Vector2d): Point2d
		return point2d(x-v.x, y-v.y)

def point2d(x: double=0, y: double=0): Point2d
	return { x, y }

struct Vector2d
	x: double
	y: double
	def inline mul(f: double): Vector2d
		return vector2d(x*f, y*f)
	def inline div(f: double): Vector2d
		return vector2d(x/f, y/f)
	def inline len(): double
		return Math.sqrt(x*x+y*y)

def vector2d(x: double=0, y: double=0): Vector2d
	return { x, y }

struct Health
	curHealth: int
	maxHealth: int

def health(curHealth: int, maxHealth: int): Health
	return { curHealth, maxHealth }


/**
 * Component constructor helpers
 */
def rect(x:int, y:int, h:int, w:int): Rect
	return { x, y, h, w }

def color(r: uint8=0, g: uint8=0, b: uint8=0, a: uint8=255): Color
	return { r, g, b, a }


