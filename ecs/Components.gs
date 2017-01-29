[indent=4]
uses SDL.Video
/**
 * Component Factory
 */
    
enum Input  /* User Input */
    NONE
    LEFT
    RIGHT
    JUMP
    RESTART
    QUIT

enum Actor      /* Indidual actor types */
    DEFAULT      = 0
    BACKGROUND   = 1
    TEXT         = 2
    LIVES        = 3
    ENEMY1       = 4
    ENEMY2       = 5
    ENEMY3       = 6
    PLAYER       = 7
    BULLET       = 8
    EXPLOSION    = 9
    BANG         = 10
    PARTICLE     = 11
    HUD          = 12

enum Category   /* Actor categories */
    BACKGROUND   = 0
    BULLET       = 1
    ENEMY        = 2
    EXPLOSION    = 3
    PARTICLE     = 4
    PLAYER       = 5

enum Effect     /* Sound Effect */
    PEW          = 0
    ASPLODE      = 1
    SMALLASPLODE = 2

enum Enemies    /* Enemy types */
    ENEMY1       = 0
    ENEMY2       = 1
    ENEMY3       = 2

enum Timers     /* Spawn enemy timers */
    TIMER1      = 2
    TIMER2      = 7
    TIMER3      = 13


struct Health
    current: int
    maxumum: int

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

def sprite(texture:Texture, width:int, height:int): Sprite
    sprite:Sprite = {texture, width, height}
    return sprite

def health(current: int, maximum: int): Health
    health: Health = {current, maximum}
    return health

def scaletween(min: double, max: double, speed: double, repeat: bool, active: bool): ScaleTween
    scaletween: ScaleTween = {min, max, speed, repeat, active}
    return scaletween

def rect(x:int, y:int, h:int, w:int): Rect
    rect:Rect = {x,y,h,w}
    return rect

def point2d(x: double, y: double): Point2d
    point2d: Point2d = {x, y}
    return point2d

def vector2d(x: double, y: double): Vector2d
    vector2d: Vector2d = {x, y}
    return vector2d

def color(r: uint8, g: uint8, b: uint8, a: uint8=0xff): Color
    color: Color = {r, g, b, a}
    return color

