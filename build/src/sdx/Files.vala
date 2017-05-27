using sdx.files;

namespace sdx {

	public enum FileType {
		Parent,		/* Placeholder for the parent path  */
		Resource,	/* Path to memory GResource */
		Asset,		/* Android asset folder */
		Absolute,	/* Absolute filesystem path.  */
		Relative	/* Path relative to the pwd */
	}
	[Compact, CCode ( /** reference counting */
		ref_function = "sdx_files_retain", 
		unref_function = "sdx_files_release"
	)]
	public class Files {
		public int _retainCount = 1;
		public unowned Files retain() {
			GLib.AtomicInt.add (ref _retainCount, 1);
			return this;
		}
		public void release() { 
			if (GLib.AtomicInt.dec_and_test (ref _retainCount)) this.free ();
		}
		public extern void free();
		

		public bool isResource;
		public string resourcePath;

		public Files(string resourcePath) { 
			this.resourcePath = resourcePath;
		}

	}
}
