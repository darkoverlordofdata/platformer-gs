namespace sdx.graphics {

	/**
	 * a reference counted wrapper for surface
	 * prevents the surface memory from being reclaimed 
	 * 
	 */
[Compact, CCode ( /** reference counting */
	ref_function = "sdx_graphics_surface_retain", 
	unref_function = "sdx_graphics_surface_release"
)]
public class Surface {
	public int _retainCount = 1;
	public unowned Surface retain() {
		GLib.AtomicInt.add (ref _retainCount, 1);
		return this;
	}
	public void release() { 
		if (GLib.AtomicInt.dec_and_test (ref _retainCount)) this.free ();
	}
	public extern void free();
		
		public static int uniqueId = 0;
		public SDL.Video.Surface surface;
		public int width;
		public int height;
		public int id = ++uniqueId;
		public string path;

		public Surface(string path) {

			this.path = path;
			surface = SDLImage.load_png(new SDL.RWops.from_file(path, "r"));
			width = surface.w;
			height = surface.h;
		}
	}
}

