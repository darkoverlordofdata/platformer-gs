uses sdx.math
uses sdx.graphics

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

struct Timer 
	begin: int
	finish: int
	best: int 

struct ScaleTween
	min : float
	max : float
	speed : float
	repeat : bool
	active : bool

struct Health
	curHealth: int
	maxHealth: int

struct Entity 
	id: int					 	/* Unique sequential id */
	name: string				/* Display name */
	active: bool				/* In use */
	category: Category		  	/* Category */
	actor: Actor				/* Display Actor */
	position: Vector2		   	/* Position on screen */
	bounds: Rect				/* Sprite dimensions*/
	sprite: Sprite 				/* Sprite */
								/* Optional: */
	size: Vector2?				/* Display size */
	scale: Vector2?				/* Display scale */
	tint: Color?				/* Color to use as tint */
	expires: Timer?			 	/* Countdown until expiration */
	health: Health?			 	/* Track health */
	velocity: Vector2?		 	/* Cartesian velocity*/


def inline rect(x:int, y:int, h:int, w:int): SDL.Video.Rect
	return { x, y, h, w }

def inline color(r: uint8, g: uint8, b: uint8, a: uint8): SDL.Video.Color
	return { r, g, b, a }


