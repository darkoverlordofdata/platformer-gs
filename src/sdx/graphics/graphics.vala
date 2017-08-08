using SDL.Video;
namespace sdx.graphics { 
    public SDL.Video.Rect _dummy0_; // fix for unknown type name 'SDL_Rect'
    public SDL.Video.Color _dummy1_; // fix for unknown type name 'SDL_Color'
    public struct Rect : SDL.Video.Rect {}    
    public struct Color : SDL.Video.Color {}    

	public struct Blit {
		SDL.Video.Rect source;
		SDL.Video.Rect dest;
		SDL.Video.RendererFlip flip;
	}
	
	public delegate Blit[] Compositor(int x, int y);	


}