uses SDL
uses SDL.Video
uses SDLTTF

class Map : Object
	width: int
	height: int
	tileheight: int
	tilewidth: int
	tileset: string
	tiles: array of uint8 
	sprite: sdx.graphics.Sprite
	const static AIR:  int = 0;
	const static START: int = 79
	const static FINISH: int = 111
	const TILES_PER_ROW: int = 16
	
	/**
	 * Load json map file created with Tiled
	 */
	construct(mapPath: string)
		var map = new util.File(mapPath)
		var json = util.Json.parse(map.read());

		width = (int)json.member("width").number
		height = (int)json.member("height").number
		tilewidth = (int)json.member("tilewidth").number
		tileheight = (int)json.member("tileheight").number

		tileset = json.member("tilesets").at(0).member("image").string
		sprite = new sdx.graphics.Sprite(map.getParent()+"/"+tileset)
		sprite.centered = false

		var data = json.member("layers").at(0).member("data")
		tiles = new array of uint8[ data.@array.length() ]
		var i = 0
		for d in data.@array do tiles[i++] = (uint8)d.number
		
		

	def getTile(x: double, y: double): int
		var nx = (int)clamp(x / tilewidth, 0, width-1)
		var ny = (int)clamp(y / tileheight, 0, height-1)
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
		return (isSolid(pos.x - size.x*0.25, pos.y + size.y*0.25 + 1) 
			|| isSolid(pos.x + size.x*0.25, pos.y + size.y*0.25 + 1))

	def testBox(pos: Point2d, size: Vector2d): bool
		return (isSolid(pos.x - size.x*0.25, pos.y - size.y*0.25)
			|| isSolid(pos.x + size.x*0.25, pos.y - size.y*0.25)
			|| isSolid(pos.x - size.x*0.25, pos.y + size.y*0.25)
			|| isSolid(pos.x + size.x*0.25, pos.y + size.y*0.25))

	def moveBox(ref pos: Point2d, ref vel: Vector2d, size: Vector2d)
		var distance = vel.len()
		var maximum = (int)distance
		if distance < 0 do return
		var fraction = 1.0 / (double)(maximum + 1)
		for var i = 0 to maximum  

			var newPos = pos.add(vel.mul(fraction))
			if testBox(newPos, size)
				var hit = false

				if testBox({ pos.x, newPos.y }, size)
					newPos.y = pos.y
					vel.y = 0
					hit = true
				
				if testBox({ newPos.x, pos.y }, size)
					newPos.x = pos.x
					vel.x = 0
					hit = true

				if !hit 
					newPos = pos
					vel = { 0, 0 } 
					
			pos = newPos

	def render(camera: Camera)
		var clip = rect(0, 0, tilewidth, tileheight)
		var dest = rect(0, 0, tilewidth, tileheight)
		for var i = 0 to (tiles.length-1)
			var tileNr = (int)tiles[i]
			if tileNr == AIR do continue
			clip.x = (int)((tileNr-1) % TILES_PER_ROW) * tilewidth
			clip.y = (int)((tileNr-1) / TILES_PER_ROW) * tileheight
			dest.x = (i % width) * (int)tilewidth - (int)camera.x
			dest.y = (int)(i / width) * (int)tileheight - (int)camera.y
			sprite.copy(clip, dest)

