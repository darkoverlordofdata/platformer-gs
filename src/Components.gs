uses SDL
uses SDL.Video
uses SDLTTF

def inline clamp(value: double, low: double, hi: double): double
	return value < low ? low : value > hi ? hi : value

enum Collision
	X
	Y
	CORNER

enum CameraType
	FLUID_CAMERA
	INNER_CAMERA
	SIMPLE_CAMERA

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
	sprite: sdx.graphics.Sprite			  	/* Sprite */
	size: Vector2d?
								/* Optional: */
	scale: Vector2d?			/* Display scale */
	tint: Color?				/* Color to use as tint */
	expires: Timer?			 	/* Countdown until expiration */
	health: Health?			 	/* Track health */
	velocity: Vector2d?		 	/* Cartesian velocity*/

struct Blit
	source: SDL.Video.Rect
	dest: SDL.Video.Rect
	flip: SDL.Video.RendererFlip

struct Timer 
	begin: int
	finish: int
	best: int 
	
struct ScaleTween
	min : double
	max : double
	speed : double
	repeat : bool
	active : bool

struct Sprite
	texture: unowned Texture
	width: int
	height: int

struct Point2d
	x: double
	y: double
	def inline add(v: Vector2d): Point2d
		return point2d(x+v.x, y+v.y)
	def inline sub(v: Vector2d): Point2d
		return point2d(x-v.x, y-v.y)

struct Vector2d
	x: double
	y: double
	def inline mul(f: double): Vector2d
		return vector2d(x*f, y*f)
	def inline div(f: double): Vector2d
		return vector2d(x/f, y/f)
	def inline len(): double
		return Math.sqrt(x*x+y*y)

struct Camera : Vector2d
	def scrollTo(x:double)
		this.x = x
	def scrollBy(x:double)
		this.x += x

struct Health
	curHealth: int
	maxHealth: int

def sprite(texture:Texture, width:int, height:int): Sprite
	sprite:Sprite = { texture, width, height }
	return sprite

def timer(begin: int=-1, finish: int=-1, best:int=-1): Timer
	timer:Timer = { begin, finish, best }
	return timer

def rect(x:int, y:int, h:int, w:int): Rect
	rect:Rect = { x, y, h, w } 
	return rect

def point2d(x: double=0, y: double=0): Point2d
	point2d: Point2d = { x, y }
	return point2d

def vector2d(x: double=0, y: double=0): Vector2d
	vector2d: Vector2d = { x, y }
	return vector2d

def color(r: uint8=0, g: uint8=0, b: uint8=0, a: uint8=255): Color
	color: Color = { r, g, b, a }
	return color

def blit(source:SDL.Video.Rect, dest:SDL.Video.Rect, flip: SDL.Video.RendererFlip): Blit
	blit:Blit = { source, dest, flip }
	return blit

def health(curHealth: int, maxHealth: int): Health
	health: Health = { curHealth, maxHealth }
	return health

def scaletween(min: double, max: double, speed: double, repeat: bool, active: bool): ScaleTween
	scaletween: ScaleTween = { min, max, speed, repeat, active }
	return scaletween

