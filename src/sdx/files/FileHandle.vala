namespace sdx.files {
	
	public class FileHandle : Object {
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


