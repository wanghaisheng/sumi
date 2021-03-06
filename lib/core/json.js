
define(
[
	'../var/global',
	'../var/hasOP',
	'./type'
]
, function (
	global, 
	hasOP, 
	type
) 
{'use strict';

if (global.JSON) return global.JSON;

var cx,
    escapable,
    gap,
    indent,
    meta,
    rep;

function quote (s) {
    escapable.lastIndex = 0;
    return escapable.test(s) ? '"' + s.replace(escapable, function (a) {
        var c = meta[a];
        return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + s + '"';
}

function str (key, holder) {
    var i,          
        k,          
        v,          
        length,
        mind = gap,
        partial,
        value = holder[key];
    if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
        value = value.toJSON(key);
    }
    if (typeof rep === 'function') {
        value = rep.call(holder, key, value);
    }
    switch (typeof value) {
    case 'string':
        return quote(value);
    case 'number':
        return isFinite(value) ? String(value) : 'null';
    case 'boolean':
    case 'null':
        return String(value);
    case 'object':
        if (!value) {
            return 'null';
        }
        gap += indent;
        partial = [];
        if (Object.prototype.toString.apply(value) === '[object Array]') {
            length = value.length;
            for (i = 0; i < length; i += 1) {
                partial[i] = str(i, value) || 'null';
            }
            v = partial.length === 0
                ? '[]'
                : gap
                ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                : '[' + partial.join(',') + ']';
            gap = mind;
            return v;
        }
        if (rep && typeof rep === 'object') {
            length = rep.length;
            for (i = 0; i < length; i += 1) {
                if (typeof rep[i] === 'string') {
                    k = rep[i];
                    v = str(k, value);
                    if (v) {
                        partial.push(quote(k) + (gap ? ': ' : ':') + v);
                    }
                }
            }
        } else {
            for (k in value) {
                if (hasOP.call(value, k)) {
                    v = str(k, value);
                    if (v) {
                        partial.push(quote(k) + (gap ? ': ' : ':') + v);
                    }
                }
            }
        }
        v = partial.length === 0
            ? '{}'
            : gap
            ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
            : '{' + partial.join(',') + '}';
        gap = mind;
        return v;
    }
}

escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
meta = {};
meta['\b'] =  '\\b';
meta['\t'] =  '\\t';
meta['\n'] =  '\\n';
meta['\f'] =  '\\f';
meta['\r'] =  '\\r';
meta['"' ] =  '\\"';
meta['\\'] = '\\\\';
cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

return global.JSON = {
	stringify : function (value, replacer, space) {
    var i;
    gap = '';
    indent = '';
    if (typeof space === 'number') {
        for (i = 0; i < space; i += 1) {
            indent += ' ';
        }
    } 
	else if (typeof space === 'string') {
        indent = space;
    }
    rep = replacer;
    if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
        throw new Error('JSON.stringify');
    }
    return str('', {'': value});
},
	parse     : function (text, reviver) {
	    var j;
	    function walk(holder, key) {
	        var k, v, value = holder[key];
	        if (value && typeof value === 'object') {
	            for (k in value) {
	                if (hasOP.call(value, k)) {
	                    v = walk(value, k);
	                    if (v !== undefined) {
	                        value[k] = v;
	                    } else {
	                        delete value[k];
	                    }
	                }
	            }
	        }
	        return reviver.call(holder, key, value);
	    }
	    text = String(text);
	    cx.lastIndex = 0;
	    if (cx.test(text)) {
	        text = text.replace(cx, function (a) {
	            return '\\u' +
	                ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	        });
	    }
	    if (/^[\],:{}\s]*$/
	            .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
	                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
	                .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
	        j = eval('(' + text + ')');
	        return typeof reviver === 'function' ? walk({'': j}, '') : j;
	    }
	    throw new SyntaxError('JSON.parse');
	}
};

});

/**
* @external JSON
* @see {@link http://www.json.org/}
* @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON}
* @see {@link https://msdn.microsoft.com/en-us/library/ie/cc836458(v=vs.94).aspx}
* @see {@link https://github.com/douglascrockford/JSON-js}
*/

/**
* ECMAScript 5.1 Standard <br>
* 将一个 JSON 字符串转换为一个 JavaScript 值。
* @access public
* @func external:JSON.parse
* @param {string} text - JSON 字符串
* @param {function} [reviver] - 用于选择性的篡改某些解析出的属性值
* @returns {*}
* @example
* console.log(JSON.parse('{}'));                // {}
* console.log(JSON.parse('true'));              // true
* console.log(JSON.parse('"foo"'));             // "foo"
* console.log(JSON.parse('[1, 5, "false"]'));   // [1, 5, "false"]
* console.log(JSON.parse('null'));              // null
* console.log(JSON.parse('{"1": 1, "2": 2}'));  // Object {1: 1, 2: 2}
*/
	
/**
* ECMAScript 5.1 Standard <br>
* 将一个 JavaScript 对象字符串化为 JSON 字符串。
* @see {@link Sumi.stringify}
* @see {@link external:Date#toJSON}
* @see {@link external:Number#toJSON}
* @see {@link external:Boolean#toJSON}
* @see {@link external:String#toJSON}
* @access public
* @func external:JSON.stringify
* @param {object} value - 将要转为JSON字符串的javascript对象
* @param {(function|number[]|string[])} [replacer] - 用于过滤筛选的函数或白名单数组
* @param {(string|number)} [space] - 插入用于增强可读性的指定空白字符串或指定数目的空格
* @returns {string}
* @example
* var x = {
*     l: '"\b\t\n\f\r"\\',
*     o: '',
*     p: null,
*     q: undefined,
*     s: .33,
*     t: /\d+/,
*     x: 1,
*     y: new Date(1972, 3, 8),
*     z: [2, 3],
*     u: {},
*     v: [],
*     w: function() {}
* };
* var s = '{"l":"\\"\\b\\t\\n\\f\\r\\"\\\\","o":"","p":null,"s":0.33,"t":{},"x":1,"y":"1972-04-07T16:00:00.000Z","z":[2,3],"u":{},"v":[]}';
* var m = JSON.stringify(x);
* 
* console.log(m);
* //'{"l":"\\"\\b\\t\\n\\f\\r\\"\\\\","o":"","p":null,"s":0.33,"t":{},"x":1,"y":"1972-04-07T16:00:00.000Z","z":[2,3],"u":{},"v":[]}'
* 
* console.log(m === s);      // true
*/
