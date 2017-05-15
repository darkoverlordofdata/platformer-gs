
uses SDL
uses SDL.Video
uses SDLTTF

[Compact, CCode ( /** reference counting */
	ref_function = "map_retain", 
	unref_function = "map_release"
)]
class Map
	retainCount__: int = 1
	def retain() : unowned Map
		GLib.AtomicInt.add (ref retainCount__, 1)
		return this
	def release() 
		if GLib.AtomicInt.dec_and_test (ref retainCount__) do this.free ()
	def extern free()
	width: int
	height: int
	lines: array of string = {
		" 0  0  0  0 78  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0 110  0  0  0  0",
		" 4  5  0  0 78  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0 110  0  0  4  5",
		"20 21  0  0 78  0  0  0  0  0  0  0  0  0  0  0  0  0  4  5  0  0  0  0  0  0  0  0  0  0  0  0 110  0  0 20 21",
		"20 21  0  0 78  0  0  0  0  0  0  0  0  4  5  0  0  0 36 37  0  0  0  0  0  0  0  0  0  0  0  0 110  0  0 20 21",
		"20 21  0  0 78  0  0  0  0  0  0  0  0 20 21  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0 110  0  0 20 21",
		"20 21  0  0 78  0  0  0  0  0  0  0  0 20 21  0  0  0  0  0  0  0  4 16 16 16 16  5  0  0  0  0 110  0  0 20 21",
		"20 21  0  0 78  0  0  4  5  0  0  0  0 20 21  0  0  0  0  0  0  0 36 52 54 53 52 37  0  0  0  0 110  0  0 20 21",
		"20 21  0  0 78  0  0 20 21  0  0  0  0 20 21  0  0  0  0  0  0  0  0  0 20 21  0  0  0  0  0  0 110  0  0 20 21",
		"20 38  0  0 78  0  0 22 38  0  0  0  0 22 38  0  0  0  0  0  0  0  0  0 22 38  0  0  0  0  0  0 110  0  0 22 21",
		"20 49 16 16 16 16 16 48 49 16 16 16 16 48 49 16 16 16 16 16 16 16 16 16 48 49 16 16 16 16 16 16  16 16 16 48 21",
		"36 52 52 52 52 52 52 52 52 52 52 52 52 52 52 52 52 52 52 52 52 52 52 52 52 52 52 52 52 52 52 52  52 52 52 52 37"
	}
	buf: array of uint8 = new array of uint8[4096]
	stat: Posix.Stat?
	ioBuff: array of char
	
	tiles: List of uint8 
	texture: unowned Texture
	construct(texture: Video.Texture, filename: string)
		this.texture = texture
		tiles = new List of uint8

		var line = ""
		var l2 = ""
		var path = (string)Posix.realpath("assets/default.map", buf)
		print(path)	
		var exists = Posix.stat(path, out stat)	
		var isFile = Posix.S_ISREG(stat.st_mode)
		var size = (int)stat.st_size
		ioBuff = new array of char[size+1]
		hFile: Posix.FILE = Posix.FILE.open(path, "r")
		// var file = new DataInputStream(File.new_for_path(filename).read())
		// while (line = file.read_line(null)) != null
		var i= 0
		var eof = false
		// while (line = (string)hFile.gets(ioBuff)) != null
		while !eof //i < lines.length
			line = (string)hFile.gets(ioBuff)
			print line
			if line == "EOF" do eof = true
			else
				var width = 0
				for var word in line.split(" ")
					if word == "" do continue
					var value = int.parse(word)
					if value > 255
						raise new Exception.InvalidValue("Invalid value +" + word + " in map ")// + filename)
					tiles.append((uint8)value)
					width++

				if this.width > 0 and this.width != width
					raise new Exception.InvalidValue("Incompatible line length in map ") // + filename)
				this.width = width
				this.height++



	def getTile(x: double, y: double): int
		var nx = (int)clamp(x / TILES_SIZE.x, 0, width-1)
		var ny = (int)clamp(y / TILES_SIZE.y, 0, height-1)
		var pos = ny * width + nx
		return tiles.nth_data(pos) //[pos]

	def isSolid(x: double, y: double): bool
		case getTile(x, y)
			when AIR
				return false
			when START
				return false
			when FINISH
				return false
		return true

	def onGround(pos: Point2d, size: Vector2d): bool
		return (isSolid(pos.x - size.x*0.5, pos.y + size.y*0.5 + 1) 
			|| isSolid(pos.x + size.x*0.5, pos.y + size.y*0.5 + 1))

	def testBox(pos: Point2d, size: Vector2d): bool
		return (isSolid(pos.x - size.x*0.5, pos.y - size.y*0.5)
			|| isSolid(pos.x + size.x*0.5, pos.y - size.y*0.5)
			|| isSolid(pos.x - size.x*0.5, pos.y + size.y*0.5)
			|| isSolid(pos.x + size.x*0.5, pos.y + size.y*0.5))

	def moveBox(ref pos: Point2d, ref vel: Vector2d, size: Vector2d)
		var result = new List of Collision
		var distance = vel.len()
		var maximum = (int)distance
		if distance < 0 do return

		var fraction = 1.0 / (double)(maximum + 1)

		for var i = 0 to maximum  

			var newPos = pos.add(vel.mul(fraction))
			if testBox(newPos, size)
				var hit = false

				if testBox(point2d(pos.x, newPos.y), size)
					result.append(Collision.y)
					newPos.y = pos.y
					vel.y = 0
					hit = true
				
				if testBox(point2d(newPos.x, pos.y), size)
					result.append(Collision.x)
					newPos.x = pos.x
					vel.x = 0
					hit = true

				if !hit 
					result.append(Collision.corner)
					newPos = pos
					vel = vector2d(0, 0)

			pos = newPos

	def render(renderer: Renderer, camera: Vector2d)
		var clip = rect(0, 0, TILES_SIZE.x, TILES_SIZE.y)
		var dest = rect(0, 0, TILES_SIZE.x, TILES_SIZE.y)
		for var i = 0 to (tiles.length()-1)
			if i == 0 do continue
			var tileNr = (int)tiles.nth_data(i) //[i]
			clip.x = (int)(tileNr % TILES_PER_ROW) * TILES_SIZE.x
			clip.y = (int)(tileNr / TILES_PER_ROW) * TILES_SIZE.y
			dest.x = (i % width) * (int)TILES_SIZE.x - (int)camera.x
			dest.y = (int)(i / width) * (int)TILES_SIZE.y - (int)camera.y
			renderer.copy(texture, clip, dest)

