[indent=4]
uses SDL
uses SDL.Video
uses SDLTTF
/**
 * No framework approach based on the 
 * map-reduce-ecs in fsharp
 *
 * Uses idiomatic Genie to create entities and components
 */

const WINDOW_SIZE: Point = {640, 720}

exception Exception
    SDLException
    InvalidValue

def inline sdlFailIf(cond: bool, reason: string)
    if cond
        raise new Exception.SDLException(reason + ", SDL error: " + SDL.get_error())
        GLib.Process.exit(0)

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


    var game = new Game(renderer)
    var startTime = (double)GLib.get_real_time()/1000000
    var lastTime = startTime
    var deltaTime = 0.0

    while !game.inputs[Input.QUIT]
        game.handleEvents()
        deltaTime = startTime-lastTime
        lastTime = startTime
        startTime = (double)GLib.get_real_time()/1000000
        game.update(deltaTime)
        game.draw()



