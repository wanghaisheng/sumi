
define(
[
	'../core/type',
	'../core/compare',
	'../var/slice'
]
, function (
	type,
	compare,
	slice
) 
{'use strict';

var a = {
		'object'  : 1,
		'function': 1
	},
	sort = Array.prototype.sort;
	
return function (w) {
	w = slice.call(Object(w));
	if(w.length < 2) return w;
	var u = slice.call(arguments, 1),
		l = u.length;
	return sort.call(w, l ? (function() {	
		return function(o, p) {	
			var m,
				i = 0,
				r;
			if(o && p && typeof o in a && typeof p in a) while (i < l && !r) {
				m = u[i++];
				r = compare(o[m], p[m]);	
			}				
			return r;
		};
	})() : compare);
};

});

/**
* 对数组中的元素进行重排序。
* @see {@link Sumi.sort}
* @see {@link Sumi.Array.shuffle}
* @see {@link Sumi.Array.uniq}
* @access public
* @func Sumi.Array.reorder
* @param {...string} [prop] - 对于对象类型元素，用于比较的属性值列表。优先级按先后次序。符合 a.b.c 格式的属性链路径，参见 {@link Sumi.prop}
* @returns {array}
* @example
* console.log(Sumi.Array.reorder());        // {}
* console.log(Sumi.Array.reorder('bca'));   // [ 'a', 'b', 'c' ]
* 	
* console.log(Sumi.Array.reorder([ 8, 3, -1, 'a', 0, '5.5' ]));     
* // [ -1, 0, 3, 8, '5.5', 'a' ]
* 
* console.log(Sumi.Array.reorder([ { x: 2 }, { x: 0 }, { x: -1 }, { x: 1 } ], 'x'));  
* // [ { x: -1 }, { x: 0 }, { x: 1 }, { x: 2 } ]
* 
* console.log(Sumi.Array.reorder([ [ 1, 2, 3 ], [ 'a', 'b' ], [ NaN ] ], 'length'));  
* // [ [ NaN ], [ 'a', 'b' ], [ 1, 2, 3 ] ]
* 
* console.log(Sumi.Array.reorder([
*     {x: 2, y: 2, z: 2},
*     {x: 3, y: 2, z: 3},
*     {x: 3, y: 1, z: 2}
* ], 'y', 'z'));  
* // [ 
* //  { x: 3, y: 1, z: 2 },
* //  { x: 2, y: 2, z: 2 },
* //  { x: 3, y: 2, z: 3 } 
* // ]
*/
