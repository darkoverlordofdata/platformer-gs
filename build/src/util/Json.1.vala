namespace util {

    public errordomain JsonException {
        SyntaxError,
        UnexpectedCharacter,
        InvalidString,
        InvalidArray,
        InvalidObject,
        DuplicateKey
    }

    public delegate void JsDelegate();

    public class Json : Object {


        public int at;
        public char ch;
        public string escape0 = "\"\\/bfnrt";
        public string escape1 = "\"\\/\b\f\n\r\t";
        public string text;
        public static string gap;
        public static string indent;

        public static JsVariant parse(string source) {
            return new Json().parseJson(source);
        }

        public static string stringify(JsVariant value, JsDelegate replacer = null, string space = "") {
            // The stringify method takes a value and an optional replacer, and an optional
            // space parameter, and returns a JSON text. The replacer can be a function
            // that can replace values, or an array of strings that will select the keys.
            // A default replacer method can be provided. Use of the space parameter can
            // produce text that is more easily readable.

            var i = 0;
            gap = "";
            indent = space;

            var holder = new JsVariant(JsType.JS_OBJECT);
            holder.object_value.@set("", value);
            return new Json().str("", holder);
        }

        public string quote(string str) {
            return "\"" + str + "\"";

        }
        public JsVariant getItem(JsVariant holder, string key) {
            switch (holder.type) {
                case JsType.JS_ARRAY:
                    //  print("%s, %d\n", key, int.parse(key));
                    //  var item = holder.array_value.nth_data(int.parse(key));
                    //  print("%d, %f\n", item.type, item.number_value);
                    return holder.array_value.nth_data(int.parse(key));
                case JsType.JS_OBJECT:
                    return holder.object_value.get(key);
                default:
                    return null;
            }
        }
        public string str(string key, JsVariant holder) {
            // Produce a string from holder[key].

            var length = 0;
            var mind = gap;
            JsVariant value = getItem(holder, key);

            switch (value.type) {
                case JsType.JS_STRING:
                    return quote(value.string_value);
                case JsType.JS_NUMBER:
                    return value.number_value.to_string(); 
                case JsType.JS_BOOLEAN:
                    return value.boolean_value.to_string();
                case JsType.JS_OBJECT:
                    if (value.object_value == null) return "null";
                    gap += indent;
                    length = (int)value.object_value.size();
                    var partial = new string[length];

                    // iterate through all of the keys in the object.
                    var keys = value.object_value.get_keys_as_array();
                    for (var i = 0; i < keys.length; i++) {
                        var k = keys[i];
                        partial[i] = quote(k) + (gap.length>0 ? ": " : ":") + str(k, value);
                    }
                    // Join all of the member texts together, separated with commas,
                    // and wrap them in braces.

                    
                    var v = "";
                    if (partial.length == 0) {
                        v =  "{}";
                    } else if (gap.length > 0) {
                        v = "{\n" + gap + string.joinv(",\n" + gap, partial) + "\n" + mind + "}";
                    } else {
                        v = "{" + string.joinv(",", partial) + "}";
                    }
                    gap = mind;
                    return v;
                    

                case JsType.JS_ARRAY:
                    if (value.array_value == null) return "null";
                    gap += indent;
                    
                    // The value is an array. Stringify every element                    
                    length = (int)value.array_value.length();
                    var partial = new string[length];
                    for (var i = 0; i < length; i++) {
                        partial[i] = str(i.to_string(), value);
                    }
                    // Join all of the elements together, separated with commas, and wrap them in
                    // brackets.

                    var v = "";
                    if (partial.length == 0) {
                        v =  "[]";
                    } else if (gap.length > 0) {
                        v = "[\n" + gap + string.joinv(",\n" + gap, partial) + "\n" + mind + "]";
                    } else {
                        v = "[" + string.joinv(",", partial) + "]";
                    }
                    gap = mind;
                    return v;
                
            }
            return "";

        }

        public JsVariant parseJson(string source) {

            text = source;
            at = 0;
            ch = ' ';
            var result = getValue();
            skipWhite();
            if (ch != 0) {
                throw new JsonException.SyntaxError("");
            }
            return result;
        }

        public char next(char? c=null) {
            // If a c parameter is provided, verify that it matches the current character.
            if (c != null && c != ch) {
                throw new JsonException.UnexpectedCharacter("Expected '" + c.to_string() + "' instead of '" + ch.to_string() + "'");
            }
            // Get the next character. When there are no more characters,
            // return the empty string.
            ch = text[at];
            at += 1;
            return ch;
        }

        public JsVariant getValue() {

            // Parse a JSON value. It could be an object, an array, a string, a number,
            // or a word.

            skipWhite();
            switch (ch) {
            case '{':
                return getObject();
            case '[':
                return getArray();
            case '\"':
                return getString();
            case '-':
                return getNumber();
            default:
                return (ch >= '0' && ch <= '9')
                    ? getNumber()
                    : getWord();
            }
        }

        public JsVariant getNumber() {
            // Parse a number value.
            var string_value = "";

            if (ch == '-') {
                string_value = "-";
                next('-');
            }

            while (ch >= '0' && ch <= '9') {
                string_value += ch.to_string();
                next();
            }
            if (ch == '.') {
                string_value += ".";
                while (next() != 0 && ch >= '0' && ch <= '9') {
                    string_value += ch.to_string();
                }
            }
            if (ch == 'e' || ch == 'E') {
                string_value += ch.to_string();
                next();
                if (ch == '-' || ch == '+') {
                    string_value += ch.to_string();
                    next();
                }
                while (ch >= '0' && ch <= '9') {
                    string_value += ch.to_string();
                    next();
                }
            }
            var result = new JsVariant(JsType.JS_NUMBER);
            result.number_value = double.parse(string_value);
            return result;
        }

        public JsVariant getString() {
            // Parse a string value.
            var hex = 0;
            var i = 0;
            var string_value = "";
            var uffff = 0;
            var DIG = "0123456789abcdef";
            // When parsing for string values, we must look for " and \ characters.

            var quote = ch;
            if (ch == '\"' || ch == '\'') {
                while (next() != 0) {
                    if (ch == quote) {
                        next();
                        var result = new JsVariant(JsType.JS_STRING);
                        result.string_value = string_value;
                        return result;
                    }
                    if (ch == '\\') {
                        next();
                        if (ch == 'u') {
                            uffff = 0;
                            for (i = 0; i < 4; i += 1) {
                                hex = DIG.index_of(next().to_string());
                                if (hex < 0) break;
                                uffff = uffff * 16 + hex;
                            }
                            string_value += ((char)uffff).to_string();
                        } else if ((i = escape0.index_of(ch.to_string())) >= 0) {
                            string_value += escape1[i].to_string();
                        } else {
                            break;
                        }
                    } else {
                        string_value += ch.to_string();
                    }
                }
            }
            throw new JsonException.InvalidString("");
        }


        public void skipWhite() {

            // Skip whitespace.

            while (ch != 0 && ch <= ' ') {
                next();
            }
        }

        public JsVariant getWord() {

            switch (ch) {
            case 't':
                next('t');
                next('r');
                next('u');
                next('e');
                var result = new JsVariant(JsType.JS_BOOLEAN);
                result.boolean_value = true;
                return result;
            case 'f':
                next('f');
                next('a');
                next('l');
                next('s');
                next('e');
                var result = new JsVariant(JsType.JS_BOOLEAN);
                result.boolean_value = false;
                return result;
            case 'n':
                next('n');
                next('u');
                next('l');
                next('l');
                var result = new JsVariant(JsType.JS_OBJECT, true);
                return result;
            }
            throw new JsonException.UnexpectedCharacter("Unexpected '" + ch.to_string() + "'");

        }

        public JsVariant getArray() {
            // Parse an array value.
            var result = new JsVariant(JsType.JS_ARRAY);

            if (ch == '[') {
                next('[');
                skipWhite();
                if (ch == ']') {
                    next(']');
                    return result;
                }
                while (ch != 0) {
                    result.array_value.append(getValue());
                    skipWhite();
                    if (ch == ']') {
                        next(']');
                        return result;
                    }
                    next(',');
                    skipWhite();
                }
            }
            throw new JsonException.InvalidArray("");
        }

        public JsVariant getObject() {
            // Parse an object value.
            var key = "";
            var result = new JsVariant(JsType.JS_OBJECT);

            if (ch == '{') {
                next('{');
                skipWhite();
                if (ch == '}') {
                    next('}');
                    return result;
                }
                while (ch != 0) {
                    key = getString().string_value;
                    skipWhite();
                    next(':');
                    if (result.object_value.contains(key)) {
                        throw new JsonException.DuplicateKey("");
                    }
                    result.object_value.@set(key, getValue());
                    skipWhite();
                    if (ch == '}') {
                        next('}');
                        return result;
                    }
                    next(',');
                    skipWhite();
                }
            }
            throw new JsonException.InvalidObject("");

        }

    }
}

