[indent=4]
uses SDL
uses SDL.Video
uses SDLTTF


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
    var startTime = epochTime()
    var lastTick = 0

    while !game.inputs[Input.quit]
        game.handleInput()

        var newTick = (int)((epochTime() - startTime) * 50)
        if newTick > (lastTick+1)
            print "%d - %d", lastTick, newTick
        for var tick = (lastTick+1) to newTick
            game.physics()
            game.moveCamera()
            game.logic(tick)
        lastTick = newTick
        game.render(lastTick)



