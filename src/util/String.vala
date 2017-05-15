namespace util {

	/**
	 * Not a replacement for string type
     *
     * String holds on to a char buffer for strings
     * returned from Posix calls so that their memory
     * will not be reclaimed.
     * @see utils.File 
	 * 
	 */
	
	public class String : Object {

		public char[] buf;

		public String(string str) {
			buf = new char[str.length];
			for (var i=0 ; i<str.length; i++) 
				buf[i] = str[i];
		}
		
		public string to_string() {
			return (string)buf;
		}

	}

}