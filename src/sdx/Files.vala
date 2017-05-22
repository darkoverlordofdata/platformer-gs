using sdx.files;

namespace sdx {

	public enum FileType {
		Internal,
		Resource,
		External,
		Absolute,
		Local
	}
	
	public class Files : Object {

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
