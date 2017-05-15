
uses SDL
uses SDL.Video
uses SDLTTF

exception Exception
	SDLException
	InvalidValue

timerFreq: double
window: Window
startTime: double
lastTick: int

def inline sdlFailIf(cond: bool, reason: string)
	if cond
		raise new Exception.SDLException(reason + ", SDL error: " + SDL.get_error())

def inline clamp(value: double, low: double, hi: double): double
	if value < low do return low
	if value > hi do return hi
	return value

def inline epochTime(): double
	return (double)SDL.Timer.get_performance_counter()/timerFreq


def initialize(): Renderer

	sdlFailIf(SDL.init(SDL.InitFlag.VIDEO | SDL.InitFlag.TIMER | SDL.InitFlag.EVENTS) < 0, 
		"SDL could not initialize!")

	sdlFailIf(!SDL.Hint.set_hint(Hint.RENDER_SCALE_QUALITY, "2"), 
		"Warning: Linear texture filtering not enabled!!")

	window = new Window("Our own 2D platformer", Window.POS_CENTERED, Window.POS_CENTERED, WINDOW_SIZE.x, WINDOW_SIZE.y, WindowFlags.SHOWN)
	sdlFailIf(window == null, 
		"Window could not be created!")

	var renderer = Renderer.create(window, -1, RendererFlags.ACCELERATED | RendererFlags.PRESENTVSYNC)
	sdlFailIf(renderer == null, 
		"Renderer could not be created!")

	sdlFailIf(SDLTTF.init() == -1, 
		"SDL_ttf could not initialize!")

	timerFreq = SDL.Timer.get_performance_frequency()

	return renderer

#if (DESKTOP)
def main(args: array of string)
	var renderer = initialize()
	var game = new Game(renderer)
	startTime = epochTime()
	lastTick = 0

	while !game.inputs[Input.quit]
		game.handleInput()

		var newTick = (int)((epochTime() - startTime) * 50)
		for var tick = (lastTick+1) to newTick
			game.update(tick)
		lastTick = newTick
		game.render(lastTick)

#else
def game()
	var renderer = initialize()
	var game = new Game(renderer)
	startTime = epochTime()
	lastTick = 0
	Emscripten.emscripten_set_main_loop_arg(mainloop, game, 0, 1);

def mainloop(arg: void*)
	var game = (Game)arg
	game.handleInput()

	var newTick = (int)((epochTime() - startTime) * 50)
	for var tick = (lastTick+1) to newTick
		game.update(tick)
	lastTick = newTick
	game.render(lastTick)
	

#endif

