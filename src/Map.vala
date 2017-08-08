using sdx.math;
using sdx.graphics;
using sdx.utils;

public class Map : Object {

	public int width;
	public int height;
	public int tileheight;
	public int tilewidth;
	public string tileset;
	public uint8[] tiles; 
	public Sprite sprite;
	public const int AIR = 0;
	public const int START = 79;
	public const int FINISH = 111;
	public const int TILES_PER_ROW = 16;
	
	/**
	 * Load json map file created with Tiled
	 */
	public Map(string mapPath) {
		var map = sdx.files.getHandle(mapPath, sdx.platform);
		var json = Json.parse(map.read());

		width = (int)json.member("width").number;
		height = (int)json.member("height").number;
		tilewidth = (int)json.member("tilewidth").number;
		tileheight = (int)json.member("tileheight").number;

		tileset = json.member("tilesets").at(0).member("image").string;
		sprite = new Sprite.TextureSprite(map.file.getParent()+"/"+tileset);
		sprite.centered = false;

		var data = json.member("layers").at(0).member("data");
		tiles = new uint8[ data.@array.length() ];
		var i = 0;
		foreach (var d in data.array) tiles[i++] = (uint8)d.number;
	}

	public int getTile(float x, float y) {
		var nx = (int)clamp(x / tilewidth, 0, width-1);
		var ny = (int)clamp(y / tileheight, 0, height-1);
		var pos = ny * width + nx;
		return tiles[pos];
	}

	public bool isSolid(float x, float y) {
		switch (getTile(x, y)) {
			case AIR: return false;
			case START: return false;
			case FINISH: return false;
		}
		return true;
	}

	public bool isOnGround(Vector2 pos, Vector2 size) {
		return (isSolid(pos.x - size.x*0.25f, pos.y + size.y*0.25f + 1.0f) 
			||  isSolid(pos.x + size.x*0.25f, pos.y + size.y*0.25f + 1.0f));
	}

	public bool isHit(Vector2 pos, Vector2 size) {
		return (isSolid(pos.x - size.x*0.25f, pos.y - size.y*0.25f)
			||  isSolid(pos.x + size.x*0.25f, pos.y - size.y*0.25f)
			||  isSolid(pos.x - size.x*0.25f, pos.y + size.y*0.25f)
			||  isSolid(pos.x + size.x*0.25f, pos.y + size.y*0.25f));
	}

	/**
	 * updates the position & velocity
	 */
	public void moveBox(ref Vector2 pos, ref Vector2 vel, Vector2 size) {
		var distance = vel.len();
		if (distance < 0) return;
		for (var i = 0; i<distance; i++) { 

			var newPos = pos.add(vel.mul(1 / (distance + 1)));
			if (isHit(newPos, size)) {
				var hit = false;

				if (isHit({ pos.x, newPos.y }, size)) {
					newPos.y = pos.y;
					vel.y = 0;
					hit = true;
				}
				if (isHit({ newPos.x, pos.y }, size)) {
					newPos.x = pos.x;
					vel.x = 0;
					hit = true;
				}
				if (!hit) {  
					newPos = pos;
					vel = { 0, 0 }; 
				}
			}
			pos = newPos;
		}
	}

	public void render(Camera camera) {
		var clip = rect(0, 0, tilewidth, tileheight);
		var dest = rect(0, 0, tilewidth, tileheight);
		for (var i = 0; i<tiles.length; i++) {
			var tileNr = (int)tiles[i];
			if (tileNr == AIR) continue;
			clip.x = (int)((tileNr-1) % TILES_PER_ROW) * tilewidth;
			clip.y = (int)((tileNr-1) / TILES_PER_ROW) * tileheight;
			dest.x = (i % width) * (int)tilewidth - (int)camera.position.x;
			dest.y = (int)(i / width) * (int)tileheight - (int)camera.position.y;
			sprite.copy(clip, dest);
		}
	}
}

