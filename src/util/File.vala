namespace util {

	public const string pathSeparator  = "/";
	public const char pathSeparatorChar  = '/';
	/**
	 * Simple File handler
	 * 
	 */
	
	public class File : Object {

		public uint8[] buf = new uint8[4096];
		public Posix.Stat? stat;
		public string path;
		public string[] files;
		public char[] ioBuff;
		public List<String> fileList; 

		public File(string path) {
			this.path = (string)Posix.realpath(path, buf);
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
			for (var i=path.length-1; i>0; i--)
				if (path[i] == pathSeparatorChar) 
					return path.substring(0, i-1);
			return "";
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

		public int length() {
			return exists() ? (int)stat.st_size : 0;
		}
		
		public string read() {
			if (!isFile()) return "";

			var l = length();
			ioBuff = new char[l+1];
			ioBuff[l] = 0;
			Posix.FILE f = Posix.FILE.open(path, "r");
			return f.gets(ioBuff);
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