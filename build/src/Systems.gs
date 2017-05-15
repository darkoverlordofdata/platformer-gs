
uses SDL
uses SDL.Video
uses SDLTTF



[Compact, CCode ( /** reference counting */
	ref_function = "systems_retain", 
	unref_function = "systems_release"
)]
class Systems
	retainCount__: int = 1
	def retain() : unowned Systems
		GLib.AtomicInt.add (ref retainCount__, 1)
		return this
	def release() 
		if GLib.AtomicInt.dec_and_test (ref retainCount__) do this.free ()
	def extern free()
	game: Game

	construct(game: Game)
		this.game = game

	/**
	 *  Physics
	 */
	def physics(ref player:Entity, tick: int)
		if game.inputs[Input.restart]
			player.position = point2d(170, 500)
			player.velocity = vector2d(0, 0)
			player.expires = timer(0, 0, player.expires.best)

		var ground = game.map.onGround(player.position, PLAYER_SIZE)
		if game.inputs[Input.jump]
			if ground
				player.velocity.y = -21

		var direction = (double)((int)game.inputs[Input.right] - (int)game.inputs[Input.left])

		player.velocity.y += 0.75
		if ground
			player.velocity.x = 0.5 * player.velocity.x + 4.0 * direction
		else
			player.velocity.x = 0.95 * player.velocity.x + 2.0 * direction


		player.velocity.x = clamp(player.velocity.x, -8, 8)
		game.map.moveBox(ref player.position, ref player.velocity, PLAYER_SIZE)
			
	/**
	 *  Camera
	 */
	def camera(ref player:Entity, tick: int)
		var halfWin = (double)WINDOW_SIZE.x/2
		if game.cameraType == CameraType.fluidCamera
			var dist = game.camera.x - player.position.x + halfWin
			game.camera.x -= 0.05 * dist
		else if game.cameraType == CameraType.innerCamera
			var leftArea  = player.position.x - halfWin - 100
			var rightArea = player.position.x - halfWin + 100
			game.camera.x = clamp(game.camera.x, leftArea, rightArea)
		else // CameraType.simpleCamera
			game.camera.x = player.position.x - halfWin

	/**
	 *  Logic
	 */
	def logic(ref player:Entity, tick: int)
		case game.map.getTile(player.position.x, player.position.y)
			when START
				player.expires.begin = tick
			when FINISH
				if player.expires.begin >= 0
					player.expires.finish = tick - player.expires.begin
					player.expires.begin = -1
					if player.expires.best < 0 || player.expires.finish < player.expires.best
						player.expires.best = player.expires.finish
					print "Finished in %s", formatTime(player.expires.finish)
			

