using sdx.files;

namespace sdx {

	public enum FileType {
		Resource = 1,		/* Path to memory GResource */
		Asset,				/* Android asset folder */
		Absolute,			/* Absolute filesystem path.  */
		Relative			/* Path relative to the pwd */
		//  Parent = 0x10		/* Placeholder for the parent path  */
	}
	[Compact, CCode ( /** reference counting */
		ref_function = "sdx_data_input_stream_retain", 
		unref_function = "sdx_data_input_stream_release"
	)]
	public class DataInputStream {
		public int _retainCount = 1;
		public unowned DataInputStream retain() {
			GLib.AtomicInt.add (ref _retainCount, 1);
			return this;
		}
		public void release() { 
			if (GLib.AtomicInt.dec_and_test (ref _retainCount)) this.free ();
		}
		public extern void free();
		
		public string[] data; 
		public int ctr;
		public DataInputStream(string data) {
			this.data = data.split("\n");
			ctr = 0;
		}
		public string? read_line() {
			return ctr<data.length ? data[ctr++] : null;
		}
	}
}
