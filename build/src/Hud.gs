
[Compact, CCode ( /** reference counting */
	ref_function = "hud_retain", 
	unref_function = "hud_release"
)]
class Hud
	retainCount__: int = 1
	def retain() : unowned Hud
		GLib.AtomicInt.add (ref retainCount__, 1)
		return this
	def release() 
		if GLib.AtomicInt.dec_and_test (ref retainCount__) do this.free ()
	def extern free()
	text1: string = ""
	text2: string = "" 
	text3: string = ""

	hudText1: sdx.graphics.Sprite.TextSprite
	hudText2: sdx.graphics.Sprite.TextSprite
	hudText3: sdx.graphics.Sprite.TextSprite

	construct()
		hudText1 = new sdx.graphics.Sprite.TextSprite(" ", sdx.font, sdx.Color.Cyan)
		hudText2 = new sdx.graphics.Sprite.TextSprite(" ", sdx.font, sdx.Color.Cyan)
		hudText3 = new sdx.graphics.Sprite.TextSprite(" ", sdx.font, sdx.Color.Cyan)
	

	def render(ref player: Entity*, tick: int)
		if player.expires.begin >= 0
			var t1 = formatTime(tick - player.expires.begin)
			if text1 != t1   
				text1 = t1
				hudText1.setText(text1, sdx.font, sdx.Color.Cyan)
			hudText1.render(50, 100)

		else if player.expires.finish >= 0
			var t2 = formatTime(player.expires.finish)
			if text2 != t2
				text2 = t2
				hudText2.setText(text2, sdx.font, sdx.Color.Cyan)
			hudText2.render(50, 100)

		if player.expires.best >= 0
			var t3 = "Best time: " + formatTime(player.expires.best)
			if text3 != t3
				text3 = t3
				hudText3.setText(text3, sdx.font, sdx.Color.Cyan)
			hudText3.render(50, 150)

