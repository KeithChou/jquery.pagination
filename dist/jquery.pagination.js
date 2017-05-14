/*!
 * jQuery.pagination.js 插件
 * @version v0.0.1
 * @author  unclekeith
*/
;(function (global, factory) {
	'use strict';
	if (define === 'function' && define.amd) {
		return factory($, global, global.document, global.Math);
	} else if (typeof exports === 'object' && exports) {
		module.exports = factory(require('jquery'), global, global.document, global.Math);
	} else {
		factory(jQuery, global, global.document, global.Math);
	}
})(typeof window !== 'undefined' ? window : this, function ($, window, document, Math, undefined) {
	'use strict';
});