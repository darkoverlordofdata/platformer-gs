using sdx.files;

namespace sdx {

	public enum FileType {
		Internal,
		Resource,
		External,
		Absolute,
		Local
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

		public FileHandle getHandle(string path, FileType type) {
			return new FileHandle(path, type);
		}

		public FileHandle @internal(string path) {
			return new FileHandle(path, FileType.Internal);
		}

		public FileHandle resource(string path) {
			return new FileHandle(path, FileType.Resource);
		}

		public FileHandle external(string path) {
			return new FileHandle(path, FileType.External);
		}

		public FileHandle absolute(string path) {
			return new FileHandle(path, FileType.Absolute);
		}

		public FileHandle local(string path) {
			return new FileHandle(path, FileType.Local);
		}
	}
}
