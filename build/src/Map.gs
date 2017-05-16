
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
	tiles: array of uint8 
	texture: unowned Texture

	construct(texture: Video.Texture, filename: string)
		this.texture = texture
		var data = new List of uint8

		var map = new util.File("assets/default.map")
		for var line in map.read().split("\n")

			var width = 0
			for var word in line.split(" ")
				if word == "" do continue
				var value = int.parse(word)
				if value > 255
					raise new Exception.InvalidValue("Invalid value +" + word + " in map " + filename)
				data.append((uint8)value)
				width++

			if this.width > 0 and this.width != width
				raise new Exception.InvalidValue("Incompatible line length in map " + filename)
			this.width = width
			this.height++
		
		tiles = new array of uint8[data.length()]
		for var i=0 to tiles.length
			tiles[i] = data.nth_data(i)



	def getTile(x: double, y: double): int
		var nx = (int)clamp(x / TILES_SIZE.x, 0, width-1)
		var ny = (int)clamp(y / TILES_SIZE.y, 0, height-1)
		var pos = ny * width + nx
		return tiles[pos]

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
		for var i = 0 to (tiles.length-1)
			if i == 0 do continue
			var tileNr = (int)tiles[i]
			clip.x = (int)(tileNr % TILES_PER_ROW) * TILES_SIZE.x
			clip.y = (int)(tileNr / TILES_PER_ROW) * TILES_SIZE.y
			dest.x = (i % width) * (int)TILES_SIZE.x - (int)camera.x
			dest.y = (int)(i / width) * (int)TILES_SIZE.y - (int)camera.y
			renderer.copy(texture, clip, dest)

