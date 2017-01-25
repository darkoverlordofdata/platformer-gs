[indent=4]
/**
 * 'you think you're so clever & classless' - John Lennon
 *
 *
 *  a change of pace, based on the Nim tutorial:
 *
 * https://hookrace.net/blog/writing-a-2d-platform-game-in-nim-with-sdl2/
 *
 * classes used like simple types, as in Nim. Emulate methods by passing explicit this as first param.
 *
 */
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
const PLAYER_PNG:string = "/home/bruce/Git/platformer/data/res/player.png"
const GRASS_PNG:string = "/home/bruce/Git/platformer/data/res/grass.png"
const DEFAULT_MAP:string = "/home/bruce/Git/platformer/data/res/default.map"
const FONT_TTF:string = "/home/bruce/Git/platformer/data/res/DejaVuSans.ttf"

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

playerTexture: Texture
grassTexture: Texture

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

def clamp(value: double, low: double, hi: double): double
    if value < low do return low
    if value > hi do return hi
    return value

def inline epochTime(): double
    return (double)GLib.get_real_time()/1000000

def loadTexture(renderer: Renderer, path: string): Texture
    var surface = SDLImage.load(path)
    sdlFailIf(surface == null, "Unable to load image!")
    var texture = Video.Texture.create_from_surface(renderer, surface)
    sdlFailIf(texture == null, "Unable to load texture!")
    texture.set_blend_mode(Video.BlendMode.BLEND)
    return texture


/** struct constructor helpers */
def rect(x:int, y:int, h:int, w:int): Rect
    rect:Rect = {x,y,h,w}
    return rect

def bodypart(source:SDL.Video.Rect, dest:SDL.Video.Rect, flip: SDL.Video.RendererFlip): BodyPart
    bodypart:BodyPart = {source, dest, flip}
    return bodypart

def point2d(x: double, y: double): Point2d
    point2d: Point2d = {x, y}
    return point2d

def vector2d(x: double, y: double): Vector2d
    vector2d: Vector2d = {x, y}
    return vector2d

def color(r: uint8, g: uint8, b: uint8, a: uint8): Color
    color: Color = {r, g, b, a}
    return color

class TextCache
    text: string
    cache: array of CacheLine

class Time : Object
    begin: int
    finish: int
    best: int 

class Map : Object
    width: int
    height: int
    tiles: list of uint8
    texture: unowned Texture

class Player : Object
    texture: unowned Video.Texture
    pos: Point2d
    vel: Vector2d
    time: Time

class Game : Object
    inputs: array of bool
    renderer: unowned Renderer
    font: Font
    evt : private SDL.Event
    player: Player
    map: Map
    camera: Vector2d
    cameraType: CameraType
    pos: Point2d


def inline sdlFailIf(cond: bool, reason: string)
    if cond
        raise new Exception.SDLException(reason + ", SDL error: " + SDL.get_error())
        GLib.Process.exit(0)

def renderTee(renderer: SDL.Video.Renderer, texture: SDL.Video.Texture, pos: Point2d)
    var x = (int)pos.x
    var y = (int)pos.y
    //print "renderTee %d, %d", x, y
    bodyParts: array of BodyPart = {
        bodypart(rect(192,  64, 64, 32), rect(x-60, y,    96, 48), RendererFlip.NONE),
        bodypart(rect( 96,   0, 96, 96), rect(x-48, y-48, 96, 96), RendererFlip.NONE),
        bodypart(rect(192,  64, 64, 32), rect(x-36,    y, 96, 48), RendererFlip.NONE),
        bodypart(rect(192,  32, 64, 32), rect(x-60,    y, 96, 48), RendererFlip.NONE),
        bodypart(rect(  0,   0, 96, 96), rect(x-48, y-48, 96, 96), RendererFlip.NONE),
        bodypart(rect(192,  32, 64, 32), rect(x-36,    y, 96, 48), RendererFlip.NONE),
        bodypart(rect( 64,  96, 32, 32), rect(x-18, y-21, 36, 36), RendererFlip.NONE),
        bodypart(rect( 64,  96, 32, 32), rect(x- 6, y-21, 36, 36), RendererFlip.HORIZONTAL)
    }

    for var part in bodyParts
        renderer.copyex(texture, part.source, part.dest, 0, null, part.flip)


def renderMap(renderer: Renderer, map: Map, camera: Vector2d)
    var clip = rect(0, 0, TILES_SIZE.x, TILES_SIZE.y)
    var dest = rect(0, 0, TILES_SIZE.x, TILES_SIZE.y)
    for var i = 0 to (map.tiles.size-1)
        if i == 0 do continue
        var tileNr = (int)map.tiles[i]
        clip.x = (int)(tileNr % TILES_PER_ROW) * TILES_SIZE.x
        clip.y = (int)(tileNr / TILES_PER_ROW) * TILES_SIZE.y
        dest.x = (i % map.width) * (int)TILES_SIZE.x - (int)camera.x
        dest.y = (int)(i / map.width) * (int)TILES_SIZE.y - (int)camera.y
        renderer.copy(map.texture, clip, dest)

def newTextCache(): TextCache
    return new TextCache()

def renderText(renderer: Renderer, font: Font, text: string, x: int, y: int, outline: FontStyle, color: Color)
    font.font_style = outline
    var surface = font.render_blended(text, color)
    sdlFailIf(surface == null, "Could not render text surface")
    surface.set_alphamod(color.a)

    var source = rect(0, 0, surface.w, surface.h)
    var dest = rect(x - outline, y - outline, surface.w, surface.h)
    var texture = Texture.create_from_surface(renderer, surface)
    sdlFailIf(texture == null, "Could not create texture from rendered text")
    surface = null
    renderer.copyex(texture, source, dest, 0, null, RendererFlip.NONE)
    texture = null
    
def renderTextGame(game: Game, text: string, x: int, y: int, foreColor: Color)
    var outlineColor = color(0, 0, 0, 64)
    renderText(game.renderer, game.font, text, x, y, (FontStyle)2, outlineColor)
    renderText(game.renderer, game.font, text, x, y, (FontStyle)0, foreColor)


def renderTextCached(game: Game, text: string, x: int, y: int, color: Color)
    pass

def restartPlayer(player: Player)
    player.pos = point2d(170, 500)
    player.vel = vector2d(0, 0)
    player.time.begin = -1
    player.time.finish = -1

def newTime(): Time
    var result = new Time()
    result.finish = -1
    result.best = -1
    return result

def newPlayer(texture: Video.Texture): Player
    var result = new Player()
    result.texture = texture
    result.time = new Time()
    restartPlayer(result)
    return result

def newMap(texture: Video.Texture, filename: string): Map
    var result = new Map()
    result.texture = texture
    result.tiles = new list of uint8

    var file = new DataInputStream(File.new_for_path(filename).read())
    var line = ""
    while (line = file.read_line(null)) != null
        var width = 0
        for var word in line.split(" ")
            if word == "" do continue
            var value = int.parse(word)
            if value > 255
                raise new Exception.InvalidValue("Invalid value %s in map %s", word, filename)
            result.tiles.add((uint8)value)
            width++

        if result.width > 0 and result.width != width
            raise new Exception.InvalidValue("Incompatible line length in map %s", filename)
        result.width = width
        result.height++
    return result

def newGame(renderer: Renderer): Game
    var result = new Game()
    result.inputs = new array of bool[6]
    result.font = new Font(FONT_TTF, 28)
    sdlFailIf(result.font == null, "Failed to load font")
    result.renderer = renderer
    result.player = newPlayer(playerTexture)
    result.map = newMap(grassTexture, DEFAULT_MAP)
    result.cameraType = CameraType.simpleCamera //fluidCamera
    return result

def toInput(key: SDL.Input.Scancode): Input
    case key    
        when SDL.Input.Scancode.LEFT
            return Input.left
        when SDL.Input.Scancode.RIGHT
            return Input.right
        when SDL.Input.Scancode.SPACE
            return Input.jump
        when SDL.Input.Scancode.R
            return Input.restart
        when SDL.Input.Scancode.Q
            return Input.quit
    return Input.none

def handleInput(game: Game)
    evt: Event
    while SDL.Event.poll(out evt) != 0
        case evt.type
            when SDL.EventType.QUIT
                game.inputs[Input.quit] = true
            when SDL.EventType.KEYDOWN
                game.inputs[toInput(evt.key.keysym.scancode)] = true
            when SDL.EventType.KEYUP
                game.inputs[toInput(evt.key.keysym.scancode)] = false


def formatTime(ticks: int): string
    var mins = (ticks / 50) / 60
    var secs = (ticks / 50) % 60
    return "%2f%2f%".printf(mins, secs)
    
def render(game: Game, tick: int)
    game.renderer.set_draw_color(110, 132, 174, 255)
    game.renderer.clear()
    renderTee(game.renderer, game.player.texture, point2d(game.player.pos.x - game.camera.x, game.player.pos.y - game.camera.y)) // game.player.pos - game.camera
    renderMap(game.renderer, game.map, game.camera)
    
    var time = game.player.time
    var white = color(255, 255, 255, 255)
    if time.begin >= 0
        renderTextGame(game, formatTime(tick - time.begin), 50, 100, white)
    else if time.finish >= 0
        renderTextGame(game, "Finished in: " + formatTime(time.finish), 50, 100, white)
    if time.best >= 0
        renderTextGame(game, "Best time: " + formatTime(time.best), 50, 150, white)

    game.renderer.present()

def getTile(map: Map, x: double, y: double): int
    var nx = (int)clamp(x / TILES_SIZE.x, 0, map.width-1)
    var ny = (int)clamp(y / TILES_SIZE.y, 0, map.height-1)
    var pos = ny * map.width + nx
    return map.tiles[pos]

def isSolid(map: Map, x: double, y: double): bool
    case getTile(map, x, y)
        when AIR
            return false
        when START
            return false
        when FINISH
            return false
    return true

def onGround(map: Map, pos: Point2d, size: Vector2d): bool
    return (isSolid(map, pos.x - size.x*0.5, pos.y + size.y*0.5 + 1) 
        || isSolid(map, pos.x + size.x*0.5, pos.y + size.y*0.5 + 1))

def testBox(map: Map, pos: Point2d, size: Vector2d): bool
    return (isSolid(map, pos.x - size.x*0.5, pos.y - size.y*0.5)
        || isSolid(map, pos.x + size.x*0.5, pos.y - size.y*0.5)
        || isSolid(map, pos.x - size.x*0.5, pos.y + size.y*0.5)
        || isSolid(map, pos.x + size.x*0.5, pos.y + size.y*0.5))

def moveBox(map: Map, ref pos: Point2d, ref vel: Vector2d, size: Vector2d)
    var result = new list of Collision
    var distance = Math.sqrt(vel.x*vel.x+vel.y*vel.y)
    var maximum = (int)distance
    if distance < 0 do return

    var fraction = 1.0 / (double)(maximum + 1)

    for var i = 0 to maximum  

        //var newPos = pos + vel * fraction
        var newPos = point2d(pos.x+vel.x*fraction, pos.y+vel.y*fraction)
        if testBox(map, newPos, size)
            var hit = false

            if testBox(map, point2d(pos.x, newPos.y), size)
                result.add(Collision.y)
                newPos.y = pos.y
                vel.y = 0
                hit = true
            
            if testBox(map, point2d(newPos.x, pos.y), size)
                result.add(Collision.x)
                newPos.x = pos.x
                vel.x = 0
                hit = true

            if !hit 
                result.add(Collision.corner)
                newPos = pos
                vel = vector2d(0, 0)

        pos = newPos


def physics(game: Game)
    if game.inputs[Input.restart] do restartPlayer(game.player)

    var ground = onGround(game.map, game.player.pos, PLAYER_SIZE)
    if game.inputs[Input.jump]
        if ground
            game.player.vel.y = -21

    var direction = (double)((int)game.inputs[Input.right] - (int)game.inputs[Input.left])

    game.player.vel.y += 0.75
    if ground
        game.player.vel.x = 0.5 * game.player.vel.x + 4.0 * direction
    else
        game.player.vel.x = 0.95 * game.player.vel.x + 2.0 * direction


    game.player.vel.x = clamp(game.player.vel.x, -8, 8)
    moveBox(game.map, ref game.player.pos, ref game.player.vel, PLAYER_SIZE)
        
def moveCamera(game: Game)
    var halfWin = (double)WINDOW_SIZE.x/2
    if game.cameraType == CameraType.fluidCamera
        var dist = game.camera.x - game.player.pos.x + halfWin
        game.camera.x -= 0.05 * dist
    else if game.cameraType == CameraType.innerCamera
        var leftArea  = game.player.pos.x - halfWin - 100
        var rightArea = game.player.pos.x - halfWin + 100
        game.camera.x = clamp(game.camera.x, leftArea, rightArea)
    else // CameraType.simpleCamera
        game.camera.x = game.player.pos.x - halfWin

def logic(game: Game, tick: int)
    case getTile(game.map, game.player.pos.x, game.player.pos.y)
        when START
            game.player.time.begin = tick
        when FINISH
            if game.player.time.begin >= 0
                game.player.time.finish = tick - game.player.time.begin
                game.player.time.begin = -1
                if game.player.time.best < 0 || game.player.time.finish < game.player.time.best
                    game.player.time.best = game.player.time.finish
                print "Finished in %s", formatTime(game.player.time.finish)
            


def main(args: array of string)

    sdlFailIf(SDL.init(SDL.InitFlag.VIDEO | SDL.InitFlag.TIMER | SDL.InitFlag.EVENTS) < 0, 
        "SDL could not initialize!")

    sdlFailIf(!SDL.Hint.set_hint(Hint.RENDER_SCALE_QUALITY, "2"), 
        "Warning: Linear texture filtering not enabled!!")

    var window = new Window("Our own 2D platformer", Window.POS_CENTERED, Window.POS_CENTERED, WINDOW_SIZE.x, WINDOW_SIZE.y, WindowFlags.SHOWN)
    sdlFailIf(window == null, 
        "Window could not be created!")

    var renderer = Renderer.create(window, -1, RendererFlags.ACCELERATED | RendererFlags.PRESENTVSYNC)
    sdlFailIf(renderer == null, 
        "Renderer could not be created!")

    sdlFailIf(SDLTTF.init() == -1, 
        "SDL_ttf could not initialize!")

    playerTexture = loadTexture(renderer, PLAYER_PNG)
    grassTexture = loadTexture(renderer, GRASS_PNG)

    var game = newGame(renderer)
    var startTime = epochTime()
    var lastTick = 0

    while !game.inputs[Input.quit]
        handleInput(game)

        var newTick = (int)((epochTime() - startTime) * 50)
        for var tick = (lastTick+1) to newTick
            physics(game)
            moveCamera(game)
            logic(game, tick)
        lastTick = newTick
        render(game, lastTick)

