
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



#if (DESKTOP || ANDROID)
def main(args: array of string)
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

	var window = sdx.initialize((int)WINDOW_SIZE.x, (int)WINDOW_SIZE.y, "Shmupwarz")
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

