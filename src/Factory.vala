
using sdx.graphics;
/**
 * Entity Factory
 */


public class Factory : Object {
	static int uniqueId = 0;

	public Factory() {
		Surface.CachedSurface.initialize(10);
	}


	public Entity createPlayer() {
		var sprite = new Sprite.CompositeSprite("assets/player.png", composePlayer);
		return Entity() {
			id 		 = uniqueId++,
			name 	 = "Player",
			active 	 = true,
			aabb 	 = { 170, 500, sprite.height, sprite.width },
			position = { 170, 500 },
			size 	 = { sprite.height, sprite.width },
			scale 	 = { 1, 1 },
			sprite 	 = sprite, 
			tint 	 = { 0, 0, 0, 0 },
			expires  = { 0, 0, 0 },
			health 	 = { 0, 0 },
			velocity = { 0, 0 }
		};
	}

	public Entity createBerry() {
		var sprite = new Sprite.TextureSprite("assets/berry.png");
		return Entity() {
			id 		 = uniqueId++,
			name 	 = "Bonus",
			active 	 = true,
			aabb 	 = { 400, 400, sprite.height, sprite.width },
			position = { 400, 400 },
			size 	 = { sprite.height, sprite.width },
			scale 	 = { 1, 1 },
			sprite 	 = sprite,
			tint 	 = { 0, 0, 0, 0 },
			expires  = { 0, 0, 0 },
			health 	 = { 0, 0 },
			velocity = { 0, 0 }
		};
	}

	/**
	 * make the player sprite by blitting the pieces together
	 */
	public Blit[] composePlayer(int x, int y) {
		return {
			blit({ 192,  64, 64, 32 }, { x-60, y,	 96, 48 }, SDL.Video.RendererFlip.NONE),
			blit({  96,   0, 96, 96 }, { x-48, y-48, 96, 96 }, SDL.Video.RendererFlip.NONE),
			blit({ 192,  64, 64, 32 }, { x-36, y,    96, 48 }, SDL.Video.RendererFlip.NONE),
			blit({ 192,  32, 64, 32 }, { x-60, y,    96, 48 }, SDL.Video.RendererFlip.NONE),
			blit({   0,   0, 96, 96 }, { x-48, y-48, 96, 96 }, SDL.Video.RendererFlip.NONE),
			blit({ 192,  32, 64, 32 }, { x-36, y,    96, 48 }, SDL.Video.RendererFlip.NONE),
			blit({  64,  96, 32, 32 }, { x-18, y-21, 36, 36 }, SDL.Video.RendererFlip.NONE),
			blit({  64,  96, 32, 32 }, { x- 6, y-21, 36, 36 }, SDL.Video.RendererFlip.HORIZONTAL)
		};
	}

	public inline Blit blit(SDL.Video.Rect source, SDL.Video.Rect dest, SDL.Video.RendererFlip flip) {
		return { source, dest, flip };
	} /* helper - struct constructors are not accessable outside of their namespace */
}



