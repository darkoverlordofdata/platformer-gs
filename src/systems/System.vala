public delegate void SystemInitialize();
public delegate void SystemExecute(ref Entity* player, int tick);
public delegate void SystemRender(ref Entity* player, int tick);

public class System : Object {
	public SDL.Video.Rect _dummy0_; // fix for unknown type name 'SDL_Rect'
	public SDL.Video.Color _dummy1_; // fix for unknown type name 'SDL_Color'
	
	public SystemInitialize initialize = () => {};
	public SystemExecute execute = (ref player, tick) => {};
	public SystemRender render = (ref player, tick) => {};
}	
