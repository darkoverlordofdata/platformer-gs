namespace sdx {
	[Compact, CCode ( /** reference counting */
		ref_function = "sdx_font_retain", 
		unref_function = "sdx_font_release"
	)]
	public class Font {
		public int _retainCount = 1;
		public unowned Font retain() {
			GLib.AtomicInt.add (ref _retainCount, 1);
			return this;
		}
		public void release() { 
			if (GLib.AtomicInt.dec_and_test (ref _retainCount)) this.free ();
		}
		public extern void free();
		
		public static int uniqueId = 0;
		public int id = ++uniqueId;
		public string path;
		public int size;
		public SDLTTF.Font innerFont;


		public Font(string path, int size) {

			innerFont = new SDLTTF.Font(path, size);
			this.path = path;
			this.size = size;
		}

		/**
		 *  Render text for Sprite.fromRenderedText
		 *
		 * @param text to generate surface from
		 * @param color foreground color of text
		 * @return new Surface
		 */
		public SDL.Video.Surface render(string text, SDL.Video.Color color) {
			return innerFont.render(text, color);
		}
	}
}

