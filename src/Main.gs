
uses SDL
uses SDL.Video
uses SDLTTF

exception Exception
	SDLException
	InvalidValue
	MapFileFormat

startTime: double
lastTick: int

def inline formatTime(ticks: int): string
	var mins = (ticks / 50) / 60
	var secs = (ticks / 50) % 60
	return "%02d:%02d".printf((int)mins, (int)secs)

def inline sdlFailIf(cond: bool, reason: string)
	if cond
		raise new Exception.SDLException(reason + ", SDL error: " + SDL.get_error())

def test()
	pass
	// new Map().parseJson("assets/default.json")
	// var js = util.Json.parse("{\"name\": [1, 2, 3] }")
	// print util.Json.stringify(js, null, "  ")
	// var map = new util.File("assets/default.json")
	// var js = util.Json.parse(map.read());
	// print util.Json.stringify(js, null, "  ")



	


#if (DESKTOP)
def main(args: array of string)
	test()
	var window = sdx.initialize((int)WINDOW_SIZE.x, (int)WINDOW_SIZE.y, "Shmupwarz");
	var game = new Game()
	startTime = sdx.getNow()
	lastTick = 0

	sdx.start()
	while sdx.running
		sdx.processEvents()

		var newTick = (int)((sdx.getNow() - startTime) * 50)
		for var tick = (lastTick+1) to newTick
			game.update(tick)
		lastTick = newTick
		game.render(lastTick)

#else
def game()
	test()

	var window = sdx.initialize(WINDOW_SIZE.x, WINDOW_SIZE.y, "Shmupwarz")
	var game = new Game()
	startTime = sdx.getNow()
	lastTick = 0
	sdx.start()
	Emscripten.emscripten_set_main_loop_arg(mainloop, game, 0, 1)

def mainloop(arg: void*)
	var game = (Game)arg
	sdx.processEvents()
	var newTick = (int)((sdx.getNow() - startTime) * 50)
	for var tick = (lastTick+1) to newTick
		game.update(tick)
	lastTick = newTick
	game.render(lastTick)
	

#endif

