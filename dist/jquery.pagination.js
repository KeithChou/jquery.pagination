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

	var defaults = {
		pageTotal: 9,
		commonCls: 'pg-common',
		currPageCls: 'pg-on',
		prevContent: '<',
		prevContentCls: 'pg-prev',
		nextContent: '>',
		nextContentCls: 'pg-next',
		current: 1,
	};

	var start = 1,
		end = 5;

	$.fn.pagination = function (opts) {
		var options = $.extend({}, defaults, opts),
			html = '',
			_this = $(this),
			rankTwo = '<a href="javascript:;" class="'+ options.commonCls +'">1</a><a href="javascript:;" class="'+ options.commonCls +'">2</a>',
			rest = '<span class="'+ options.commonCls +'">...</span>';

		return this.each(function () {
			if (options.current === 1) {
				html += '<span class="'+ options.prevContentCls+' '+ options.commonCls +'">'+ options.prevContent +'</span>';
			} else {
				html += '<a href="javascript:;" class="'+ options.prevContentCls +' '+ options.commonCls +'">'+ options.prevContent +'</a>';
				if (options.current >= 2 * (1 + 2)) {
					html += rankTwo + rest;
				}
			}
			if (end !== options.pageTotal) {
				if (options.current >= 2 * (1 + 2)) { start = options.current - 2 };
				if (end - options.current < 2) { end++ };
			}

			for (; start <= end; start++) {
				if (start === options.current) {
					html += '<span class="'+ options.currPageCls +' '+ options.commonCls +'">'+ options.current +'</span>';
				} else {
					html += '<a href="javascript:;" data-page="'+ start +'" class="'+ options.commonCls +'">'+ start +'</a>';
				}
			}
			if (options.pageTotal > end) {
				html += rest;
			}
			if (options.current === options.pageTotal) {
				html += '<span class="'+ options.nextContentCls +' '+ options.commonCls +'">'+ options.nextContent +'</span>';
			} else {
				html += '<a href="javascript:;" class="'+ options.nextContentCls +' '+ options.commonCls +'">'+ options.nextContent +'</a>';
			}
			_this.html(html);
		});
	}
});