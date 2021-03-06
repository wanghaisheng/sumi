
define(function () {'use strict';

return Number.MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER || 1 - Math.pow(2, 53);

});

/**
* ECMAScript 6 Draft <br>
* 可以在 JavaScript 中表示的最小安全整数（-(Math.pow(2, 53) - 1) = -9007199254740991）。
* @var {number} external:Number.MIN_SAFE_INTEGER
*/
