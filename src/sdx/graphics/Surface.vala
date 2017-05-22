namespace sdx.graphics {

	/**
	 * a reference counted wrapper for surface
	 * prevents the surface memory from being reclaimed 
	 * 
	 */
	public class Surface : Object {
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

