
define(function () {'use strict';

return function (n, i, d, c, u) {
	u = u == undefined ? '0' : u;
	n = +n;
	var x = 0,
		b = n < 0;
	n = n.toFixed(d >>> 0).slice(+b).split('.');
	d = n[0];
	i = (i >>> 0) - d.length;
	if  (i >   0) for (; i--;) d = u + d;
	i = n[1];
	n = d.length;
	if  (c && n > 3) {
		for(c = ''; n--;) {
			c = (!n || ++x % 3 ? '' : ',') + d[n] + c;
		}
		d = c;
	}
	if  (i) d = d + '.' + i;
	if  (b) d = '-' + d;
	return  d;
};

});

/**
* 将数值处理输出为用于排版的固定长度（不包含正负号）的字符串。
* @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed}
* @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential}
* @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision}
* @access public
* @func Sumi.Number.toFixedWidth
* @param {number} num - 数值
* @param {number} intLen - 整数部分的最大长度
* @param {number} decLen - 小数部分的固定长度。不包含小数点
* @param {boolean} [insSep=false]
* @param {boolean} insSep.true - 插入千位分隔符
* @param {boolean} insSep.true - 不要千位分隔符
* @param {string} [fillChar=0] - 整数部分长度不到 intLen 时使用的补白字符
* @returns {string}
* @example
* console.log(Sumi.Number.toFixedWidth(-2e2, 3, 3));             // -200.000
* console.log(Sumi.Number.toFixedWidth(2e-2, 3, 3));             //  000.020
* 
* console.log(Sumi.Number.toFixedWidth(123., 3, 3));             //  123.000
* console.log(Sumi.Number.toFixedWidth(.123, 3, 3));             //  000.123
* 
* console.log(Sumi.Number.toFixedWidth(0.8, 3, 2, true, ' '));   //   0.80
* console.log(Sumi.Number.toFixedWidth(8e2, 0, 2, true));        // 800.00
* console.log(Sumi.Number.toFixedWidth(8e3, 0, 2, true));        // 8,000.00
* console.log(Sumi.Number.toFixedWidth(8e5, 0, 2, true));        // 800,000.00
* console.log(Sumi.Number.toFixedWidth(8e7, 0, 2, true));        // 80,000,000.00
*/
