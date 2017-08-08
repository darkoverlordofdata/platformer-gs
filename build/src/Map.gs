uses sdx.math
 
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
		var map = sdx.files.getHandle(mapPath, sdx.platform)
		var json = sdx.utils.Json.parse(map.read())

		width = (int)json.member("width").number
		height = (int)json.member("height").number
		tilewidth = (int)json.member("tilewidth").number
		tileheight = (int)json.member("tileheight").number

		tileset = json.member("tilesets").at(0).member("image").string
		sprite = new sdx.graphics.Sprite.TextureSprite(map.file.getParent()+"/"+tileset)
		sprite.centered = false

		var data = json.member("layers").at(0).member("data")
		tiles = new array of uint8[ data.@array.length() ]
		var i = 0
		for d in data.@array do tiles[i++] = (uint8)d.number
		

	def getTile(x: float, y: float): int
		var nx = (int)clamp(x / tilewidth, 0, width-1)
		var ny = (int)clamp(y / tileheight, 0, height-1)
		var pos = ny * width + nx
		return tiles[pos]

	def isSolid(x: float, y: float): bool
		case getTile(x, y)
			when AIR
				return false
			when START
				return false
			when FINISH
				return false
		return true

	def isOnGround(pos: Vector2, size: Vector2): bool
		return (isSolid(pos.x - size.x*0.25f, pos.y + size.y*0.25f + 1.0f) 
			||  isSolid(pos.x + size.x*0.25f, pos.y + size.y*0.25f + 1.0f))

	def isHit(pos: Vector2, size: Vector2): bool
		return (isSolid(pos.x - size.x*0.25f, pos.y - size.y*0.25f)
			||  isSolid(pos.x + size.x*0.25f, pos.y - size.y*0.25f)
			||  isSolid(pos.x - size.x*0.25f, pos.y + size.y*0.25f)
			||  isSolid(pos.x + size.x*0.25f, pos.y + size.y*0.25f))

	/**
	 * updates the position & velocity
	 */
	def moveBox(ref pos: Vector2, ref vel: Vector2, size: Vector2)
		var distance = vel.len()
		if distance < 0 do return
		for var i = 0 to distance  

			var newPos = pos.add(vel.mul(1 / (distance + 1)))
			if isHit(newPos, size)
				var hit = false

				if isHit({ pos.x, newPos.y }, size)
					newPos.y = pos.y
					vel.y = 0
					hit = true
				
				if isHit({ newPos.x, pos.y }, size)
					newPos.x = pos.x
					vel.x = 0
					hit = true

				if !hit 
					newPos = pos
					vel = { 0, 0 } 
					
			pos = newPos

	def render(camera: sdx.graphics.Camera)
		var clip = rect(0, 0, tilewidth, tileheight)
		var dest = rect(0, 0, tilewidth, tileheight)
		for var i = 0 to (tiles.length-1)
			var tileNr = (int)tiles[i]
			if tileNr == AIR do continue
			clip.x = (int)((tileNr-1) % TILES_PER_ROW) * tilewidth
			clip.y = (int)((tileNr-1) / TILES_PER_ROW) * tileheight
			dest.x = (i % width) * (int)tilewidth - (int)camera.position.x
			dest.y = (int)(i / width) * (int)tileheight - (int)camera.position.y
			sprite.copy(clip, dest)

