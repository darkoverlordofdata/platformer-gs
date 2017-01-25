[indent=4]
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
const PLAYER_PNG:string     = "/home/bruce/Git/platformer/data/res/player.bmp"
const GRASS_PNG:string      = "/home/bruce/Git/platformer/data/res/grass.bmp"
const DEFAULT_MAP:string    = "/home/bruce/Git/platformer/data/res/default.map"
const FONT_TTF:string       = "/home/bruce/Git/platformer/data/res/DejaVuSans.ttf"

exception Exception
    SDLException
    InvalidValue

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

struct Point2d
    x: double
    y: double

struct Vector2d
    x: double
    y: double
    
struct BodyPart
    source: SDL.Video.Rect
    dest: SDL.Video.Rect
    flip: SDL.Video.RendererFlip
    
struct CacheLine
    texture: unowned Texture
    w: int
    h: int

def inline rect(x:int, y:int, h:int, w:int): Rect
    rect:Rect = {x,y,h,w}
    return rect

def inline bodypart(source:SDL.Video.Rect, dest:SDL.Video.Rect, flip: SDL.Video.RendererFlip): BodyPart
    bodypart:BodyPart = {source, dest, flip}
    return bodypart

def inline point2d(x: double, y: double): Point2d
    point2d: Point2d = {x, y}
    return point2d

def inline vector2d(x: double, y: double): Vector2d
    vector2d: Vector2d = {x, y}
    return vector2d

def inline color(r: uint8, g: uint8, b: uint8, a: uint8): Color
    color: Color = {r, g, b, a}
    return color

def inline sdlFailIf(cond: bool, reason: string)
    if cond
        raise new Exception.SDLException(reason + ", SDL error: " + SDL.get_error())
        GLib.Process.exit(0)

def inline clamp(value: double, low: double, hi: double): double
    if value < low do return low
    if value > hi do return hi
    return value

def inline epochTime(): double
    return (double)GLib.get_real_time()/1000000



