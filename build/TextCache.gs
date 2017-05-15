[indent=4]
uses SDL
uses SDL.Video
uses SDLTTF

	

def renderText(renderer: Renderer, font: Font, text: string, x: int, y: int, outline: FontStyle, color: Color)
	font.font_style = outline
	var surface = font.render_blended(text, color)
	sdlFailIf(surface == null, "Could not render text surface")
	surface.set_alphamod(color.a)

	var source = rect(0, 0, surface.w, surface.h)
	var dest = rect(x - outline, y - outline, surface.w, surface.h)
	var texture = Texture.create_from_surface(renderer, surface)
	sdlFailIf(texture == null, "Could not create texture from rendered text")
	surface = null
	renderer.copyex(texture, source, dest, 0, null, RendererFlip.NONE)
	texture = null
	
def renderTextCached(game: Game, text: string, x: int, y: int, color: Color)
	pass

def formatTime(ticks: int): string
	var mins = (ticks / 50) / 60
	var secs = (ticks / 50) % 60
	return "%02d:%02d".printf((int)mins, (int)secs)
