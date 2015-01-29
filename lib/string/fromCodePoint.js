
define(function () {
	
return String.fromCodePoint = String.fromCodePoint || function() {
	var a = [],
		hs,
		ls,
		i = -1,
		l = arguments.length,
		f = String.fromCharCode,
		r = '',
		c;
	while(++i < l) {
		c = Number(arguments[i]);
		if(!isFinite(c) || c < 0 || c > 0x10FFFF || Math.floor(c) != c) {
			throw RangeError('Invalid code point: ' + c);
		}
		if(c <= 0xFFFF) {
			a.push(c);
		}
		else { 
			c -= 0x10000;
			hs = (c >> 10  ) + 0xD800;
			ls = (c % 0x400) + 0xDC00;
			a.push(hs, ls);
		}
		if(i + 1 == l || a.length > 0x4000) {
			r += f.apply(null, a);
			a.length = 0;
		}
	}
	return r;
};

});

/**
* ECMAScript 6 Draft <br>
* 根据指定的代码点序列创建并返回字符串。
* @see {@link external:String#codePointAt}
* @see {@link external:String#nbmpCharCodeAt}
* @see {@link external:String#nbmpCharAt}
* @access public
* @func external:String.fromCodePoint
* @param {...number} [nums] - 一个或多个代码点
* @returns {string}
* @example
* console.log(String.fromCodePoint());                        // "*"
* console.log(String.fromCodePoint(42));                      // "*"
* console.log(String.fromCodePoint(65, 90));                  // "AZ"
* console.log(String.fromCodePoint(0x404));                   // "\u0404"
* console.log(String.fromCodePoint(0x2F804));                 // "\uD87E\uDC04"
* console.log(String.fromCodePoint(194564));                  // "\uD87E\uDC04"
* console.log(String.fromCodePoint(0x1D306, 0x61, 0x1D307));  // "\uD834\uDF06a\uD834\uDF07"
* console.log(String.fromCodePoint('_'));                     // RangeError
* console.log(String.fromCodePoint(-1));                      // RangeError
* console.log(String.fromCodePoint(3e-2));                    // RangeError
*/