namespace util {

	public const string pathSeparator  = "/";
	public const char pathSeparatorChar  = '/';
	/**
	 * Simple File handler
	 * 
	 */
	
	public class File : Object {

		public Posix.Stat? stat;
		public string path;
		public string[] files;
		public List<String> fileList; 

		public File(string path) {
			this.path = (string)Posix.realpath(path);
		} 

		public string getPath() {
			return path;
		}

		/**
		 * the name is everything after the final separator
		 */
		public string getName() {
			for (var i=path.length-1; i>0; i--)
				if (path[i] == pathSeparatorChar)
					return path.substring(i+1);
			return path;
		}

		/**
		 * the parent is everything prior to the final separator
		 */
		public string getParent() {
			var i = path.last_index_of(pathSeparator);
			return i < 0 ? "" : path.substring(0, i);
		}

		/**
		 * check if the represented struture exists on the virtual disk
		 */
		public bool exists() {
			return Posix.stat(path, out stat) == 0;
		}

		/**
		 * is it a file?
		 */
		public bool isFile() {
			return exists() ? Posix.S_ISREG(stat.st_mode) : false;
		}

		/**
		 * is it a folder?
		 */
		public bool isDirectory() {
			return exists() ? Posix.S_ISDIR(stat.st_mode) : false;
		}

		/**
		 * get the length of the file
		 */
		public int length() {
			return exists() ? (int)stat.st_size : 0;
		}
		
		/**
		 * read the contents into a string buffer
		 */
		public string read() {
			if (!exists()) return "";
			Posix.FILE hFile = Posix.FILE.open(path, "r");
			var size = (int)stat.st_size;
			var ioBuff = new char[size];
			var lines = "";
			while (lines.length < size)
				lines += (string)hFile.gets(ioBuff);
			return lines;
		}
		
			/**
		 * return the list of files in the folder
		 */
		public string[] list() {
			if (!isDirectory()) {
				files = new string[0];
				return files;
			}
			Posix.Dir? dp;
			unowned Posix.DirEnt? ep;

			fileList = new List<String>();
			if ((dp = Posix.opendir(path)) != null) {
				while ((ep = Posix.readdir(dp)) != null) {
					var s = new String((string)ep.d_name);
					fileList.append(s);
				}
			}

			files = new string[fileList.length()];
			var i = 0;
			foreach (var s in fileList)
				files[i++] = s.to_string();
			return files;
		}
	}
}