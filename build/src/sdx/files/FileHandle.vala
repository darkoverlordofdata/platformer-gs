namespace sdx.files {
	[Compact, CCode ( /** reference counting */
		ref_function = "sdx_files_file_handle_retain", 
		unref_function = "sdx_files_file_handle_release"
	)]
	public class FileHandle {
		public int _retainCount = 1;
		public unowned FileHandle retain() {
			GLib.AtomicInt.add (ref _retainCount, 1);
			return this;
		}
		public void release() { 
			if (GLib.AtomicInt.dec_and_test (ref _retainCount)) this.free ();
		}
		public extern void free();
		
		public util.File file;
		public string path;
		public FileType type;


		public FileHandle(string path, FileType type) {
			this.path = path;
			this.type = type;
			this.file = new util.File(path);
		}
	}
}


