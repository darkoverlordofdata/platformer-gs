/**
 * Entity Factory
 */

delegate Compositor(x:int, y:int): array of Blit	

[Compact, CCode ( /** reference counting */
	ref_function = "entities_retain", 
	unref_function = "entities_release"
)]
class Entities
	retainCount__: int = 1
	def retain() : unowned Entities
		GLib.AtomicInt.add (ref retainCount__, 1)
		return this
	def release() 
		if GLib.AtomicInt.dec_and_test (ref retainCount__) do this.free ()
	def extern free()
	uniqueId: static int = 0

	construct() 
		sdx.graphics.Surface.CachedSurface.initialize(10)


	def createPlayer(): Entity
		var sprite = new sdx.graphics.Sprite.CompositeSprite("assets/player.png", composePlayer)
		return Entity() {
			id 		 = uniqueId++,
			name 	 = "Player",
			active 	 = true,
			category = Category.PLAYER,
			actor 	 = Actor.PLAYER,
			position = { 170, 500 },
			sprite 	 = sprite, 
			bounds 	 = { 0, 0, sprite.height, sprite.width },
			size 	 = { sprite.height, sprite.width },
			scale 	 = { 1, 1 },
			tint 	 = { 0, 0, 0, 0 },
			expires  = { 0, 0, 0 },
			health 	 = { 0, 0 },
			velocity = { 0, 0 }
		}

	def createBerry(): Entity
		var sprite = new sdx.graphics.Sprite.TextureSprite("assets/berry.png")
		return Entity() {
			id 		 = uniqueId++,
			name 	 = "Bonus",
			active 	 = true,
			category = Category.BONUS,
			actor 	 = Actor.BONUS,
			position = { 400, 400 },
			sprite 	 = sprite,
			bounds 	 = { 0, 0, sprite.height, sprite.width },
			size 	 = { sprite.height, sprite.width },
			scale 	 = { 1, 1 },
			tint 	 = { 0, 0, 0, 0 },
			expires  = { 0, 0, 0 },
			health 	 = { 0, 0 },
			velocity = { 0, 0 }
		}
		

	def composePlayer(x:int, y:int): array of Blit
		return {
			blit({ 192,  64, 64, 32 }, { x-60, y,	 96, 48 }, SDL.Video.RendererFlip.NONE),
			blit({  96,   0, 96, 96 }, { x-48, y-48, 96, 96 }, SDL.Video.RendererFlip.NONE),
			blit({ 192,  64, 64, 32 }, { x-36, y,    96, 48 }, SDL.Video.RendererFlip.NONE),
			blit({ 192,  32, 64, 32 }, { x-60, y,    96, 48 }, SDL.Video.RendererFlip.NONE),
			blit({   0,   0, 96, 96 }, { x-48, y-48, 96, 96 }, SDL.Video.RendererFlip.NONE),
			blit({ 192,  32, 64, 32 }, { x-36, y,    96, 48 }, SDL.Video.RendererFlip.NONE),
			blit({  64,  96, 32, 32 }, { x-18, y-21, 36, 36 }, SDL.Video.RendererFlip.NONE),
			blit({  64,  96, 32, 32 }, { x- 6, y-21, 36, 36 }, SDL.Video.RendererFlip.HORIZONTAL)
		}


