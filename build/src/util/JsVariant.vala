namespace util {

    //  public enum JsType {
    //      JS_INVALID,
    //      JS_BOOLEAN,
    //      JS_NUMBER,
    //      JS_STRING,
    //      JS_OBJECT,
    //      JS_ARRAY
    //  }

    //  /**
    //   * Wrap a Json object
    //   * 
    //   * Arrays are represented as List<JsVariant>
    //   * Objects are represented as HashTable<string, JsVariant>
    //   */
    //  public class JsVariant : Object {

    //      public bool boolean;
    //      public double number;
    //      public string string;
    //      public HashTable<string, JsVariant> object;
    //      public List<JsVariant> array;

    //      public JsType type;

    //      public static JsVariant String(string value) {
    //          var it = new JsVariant(JsType.JS_STRING);
    //          it.string = value;
    //          return it;
    //      }

    //      public static JsVariant Number(double value) {
    //          var it = new JsVariant(JsType.JS_NUMBER);
    //          it.number = value;
    //          return it;
    //      }
    //      public static JsVariant Boolean(bool value) {
    //          var it = new JsVariant(JsType.JS_BOOLEAN);
    //          it.boolean = value;
    //          return it;
    //      }

    //      public JsVariant(JsType type, bool isNull = false) {
    //          this.type = type;
    //          switch (type) {
    //          case JsType.JS_BOOLEAN:
    //              boolean = false;
    //              break;
    //          case JsType.JS_NUMBER:
    //              number = 0.0;
    //              break;
    //          case JsType.JS_STRING:
    //              string = "";
    //              break;
    //          case JsType.JS_OBJECT:
    //              object = isNull ? null : new HashTable<string, JsVariant>(str_hash, str_equal);
    //              break;
    //          case JsType.JS_ARRAY:
    //              array = new List<JsVariant>();
    //              break;
                
    //          default:
    //              break;
    //          }
    //      }

    //      public JsVariant at(int index) {
    //          return array.nth_data(0);
    //      }

    //      public JsVariant member(string key) {
    //          return object.get(key);
    //      }
    //  }
}

