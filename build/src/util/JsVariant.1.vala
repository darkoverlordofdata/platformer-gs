namespace util {

    public enum JsType {
        JS_INVALID,
        JS_BOOLEAN,
        JS_NUMBER,
        JS_STRING,
        JS_OBJECT,
        JS_ARRAY
    }

    public class JsVariant : Object {

        public JsType type;
        public bool boolean_value;
        public double number_value;
        public string string_value;

        public bool bool;
        

        public HashTable<string, JsVariant> object_value;
        public List<JsVariant> array_value;

        public JsVariant(JsType type, bool isNull = false) {
            this.type = type;
            switch (type) {
            case JsType.JS_BOOLEAN:
                boolean_value = false;
                break;
            case JsType.JS_NUMBER:
                number_value = 0.0;
                break;
            case JsType.JS_STRING:
                string_value = "";
                break;
            case JsType.JS_OBJECT:
                object_value = isNull ? null : new HashTable<string, JsVariant>(str_hash, str_equal);
                break;
            case JsType.JS_ARRAY:
                array_value = new List<JsVariant>();
                break;
                
            default:
                break;
            }
        }

    }
}

