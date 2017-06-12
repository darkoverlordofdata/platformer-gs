namespace systems {

	public delegate void SystemInitialize();
	public delegate void SystemExecute(ref Entity* player, int tick);

	[SimpleType, Immutable]
	public struct ISystem { 
		public unowned SystemInitialize initialize;
		public unowned SystemExecute execute;
    }
	
	public class System : Object {
		public ISystem _ISystem { get { return { initialize, execute }; } }
		public SystemInitialize initialize = () => {};
		public SystemExecute execute = (ref player, tick) => {};
    }	

}


