[indent=4]
uses SDL
uses SDL.Video
uses SDLTTF

enum Input
    none
    left
    right
    jump
    restart
    quit

enum Collision
    x
    y
    corner

enum CameraType
    fluidCamera
    innerCamera
    simpleCamera

enum Actor
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

enum Category 
    BACKGROUND   = 0
    BULLET       = 1
    ENEMY        = 2
    EXPLOSION    = 3
    PARTICLE     = 4
    PLAYER       = 5

struct Segment
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

struct Health
    curHealth: int
    maxHealth: int

def sprite(texture:Texture, width:int, height:int): Sprite
    sprite:Sprite = {texture, width, height}
    return sprite

def timer(begin: int=-1, finish: int=-1, best:int=-1): Timer
    timer:Timer = {begin, finish, best}
    return timer

def rect(x:int, y:int, h:int, w:int): Rect
    rect:Rect = {x,y,h,w}
    return rect

def point2d(x: double=0, y: double=0): Point2d
    point2d: Point2d = {x, y}
    return point2d

def vector2d(x: double=0, y: double=0): Vector2d
    vector2d: Vector2d = {x, y}
    return vector2d

def color(r: uint8=0, g: uint8=0, b: uint8=0, a: uint8=255): Color
    color: Color = {r, g, b, a}
    return color

def segment(source:SDL.Video.Rect, dest:SDL.Video.Rect, flip: SDL.Video.RendererFlip): Segment
    segment:Segment = {source, dest, flip}
    return segment

def health(curHealth: int, maxHealth: int): Health
    health: Health = {curHealth, maxHealth}
    return health

def scaletween(min: double, max: double, speed: double, repeat: bool, active: bool): ScaleTween
    scaletween: ScaleTween = {min, max, speed, repeat, active}
    return scaletween

