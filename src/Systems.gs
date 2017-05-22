uses SDL
uses SDL.Video
uses SDLTTF

class Systems : Object

	game: Game

	construct(game: Game)
		this.game = game

	/**
	 *  Physics
	 */
	def physics(ref player:Entity*, tick: int)
		if sdx.keys[114] == 1
			player.position = { 170, 500 }
			player.velocity = { 0, 0 } 
			player.expires = { 0, 0, player.expires.best }

		var ground = game.map.onGround(player.position, player.size)
		if sdx.dir[sdx.Direction.UP]
			if ground
				player.velocity.y = -21

		var direction = (double)((int)sdx.dir[sdx.Direction.RIGHT] - (int)sdx.dir[sdx.Direction.LEFT])

		player.velocity.y += 0.75
		if ground
			player.velocity.x = 0.5 * player.velocity.x + 4.0 * direction
		else
			player.velocity.x = 0.95 * player.velocity.x + 2.0 * direction

		player.velocity.x = clamp(player.velocity.x, -8, 8)
		game.map.moveBox(ref player.position, ref player.velocity, player.size)
			
	/**
	 *  Camera
	 */
	def camera(ref player:Entity*, tick: int)
		var halfWin = (double)WINDOW_SIZE.x/2
		if game.cameraType == CameraType.FLUID_CAMERA
			var dist = game.camera.x - player.position.x + halfWin
			game.camera.scrollBy(-0.05 * dist)
		else if game.cameraType == CameraType.INNER_CAMERA
			var leftArea  = player.position.x - halfWin - 100
			var rightArea = player.position.x - halfWin + 100
			game.camera.scrollTo(clamp(game.camera.x, leftArea, rightArea))
		else // CameraType.simpleCamera
			game.camera.scrollTo(player.position.x - halfWin)

	/**
	 *  Logic
	 */
	def logic(ref player:Entity*, tick: int)
		case game.map.getTile(player.position.x, player.position.y)
			when Map.START
				player.expires.begin = tick
			when Map.FINISH
				if player.expires.begin >= 0
					player.expires.finish = tick - player.expires.begin
					player.expires.begin = -1
					if player.expires.best < 0 || player.expires.finish < player.expires.best
						player.expires.best = player.expires.finish
					print "Finished in %s", formatTime(player.expires.finish)
			

