using Lua;

public errordomain Exception {
	SDLException,
	InvalidValue,
	MapFileFormat
}

public double startTime;
public int lastTick;

public inline string formatTime(int ticks) {
	var mins = (ticks / 50) / 60;
	var secs = (ticks / 50) % 60;
	return "%02d:%02d".printf((int)mins, (int)secs);
}

public inline void sdlFailIf(bool cond, string reason) {
	if (cond)
		throw new Exception.SDLException(reason + ", SDL error: " + SDL.get_error());
}

#if (DESKTOP || ANDROID)
public int main(string[] args) {

	test();

	var window = sdx.initialize((int)WINDOW_SIZE.x, (int)WINDOW_SIZE.y, "Shmupwarz");
	var game = new Game();
	startTime = sdx.getNow();
	lastTick = 0;

	sdx.start();
	while (sdx.running) {
		sdx.processEvents();

		var newTick = (int)((sdx.getNow() - startTime) * 50);
		for (var tick = lastTick+1; tick<=newTick; tick++) {
			game.update(tick);
		}
		lastTick = newTick;
		game.render(lastTick);
	}
	return 0;
}
#else
public void game() {

	var window = sdx.initialize((int)WINDOW_SIZE.x, (int)WINDOW_SIZE.y, "Shmupwarz");
	var game = new Game();
	startTime = sdx.getNow();
	lastTick = 0;
	sdx.start();
	Emscripten.emscripten_set_main_loop_arg(mainloop, game, 0, 1);
}

public void mainloop(void* arg) {
	var game = (Game)arg;
	sdx.processEvents();
	var newTick = (int)((sdx.getNow() - startTime) * 50);

	for (var tick = lastTick+1; tick<=newTick; tick++) {
		game.update(tick);
	}
	lastTick = newTick;
	game.render(lastTick);
}	

#endif

#if (DESKTOP)

public static int my_func (LuaVM vm) {
    stdout.printf ("Vala Code From Lua Code! (%f)\n", vm.to_number (1));
    return 1;
}


public static void test() {
    var vm = new LuaVM ();
    vm.open_libs ();

    // Create a Lua table with name 'foo'
    vm.new_table ();
    for (int i = 1; i <= 9; i++) {
        vm.push_number (i);         // Push the table index
        vm.push_number (i * 2);     // Push the cell value
        vm.raw_set (-3);            // Stores the pair in the table
    }
    vm.set_global ("foo");

    // Ask Lua to run our little script
    vm.do_string ("""

        -- Receives a table, returns the sum of its components.
        io.write("The table the script received has:\n");
        x = 0
        for i = 1, #foo do
          print(i, foo[i])
          x = x + foo[i]
        end
        io.write("Returning data back to C\n");
        return x

    """);

    // Get the returned value at the top of the stack (index -1)
    var sum = vm.to_number (-1);

    stdout.printf ("Script returned: %.0f\n", sum);

    vm.pop (1);  // Take the returned value out of the stack

	
}
public static void test2() {

    string code = """
            print "Lua Code From Vala Code!"
            my_func(33)
        """;

    var vm = new LuaVM ();
    vm.open_libs ();
    vm.register ("my_func", my_func);
    vm.do_string (code);

}
#else
public static void test() {
}
#endif
