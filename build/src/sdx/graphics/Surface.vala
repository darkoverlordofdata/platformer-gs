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
#if (DESKTOP)			
			// from GResource
			var file = sdx.files.resource(path);
#elif (ANDROID)				
			// from the *.apk asset folder
			var file = sdx.files.asset(path);
#else					
			// just use the path as is
			var file = sdx.files.relative(path);
#endif
			surface = SDLImage.load_png(file.getRWops());
			width = surface.w;
			height = surface.h;
		}
	}
}

