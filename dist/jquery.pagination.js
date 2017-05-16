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
		count: 2,
		pageTotal: 9,
		pageStart: 6,
		prevCount: 2,
		commonCls: 'pg-common',
		currPageCls: 'pg-on',
		prevContent: '<',
		prevContentCls: 'pg-prev',
		nextContent: '>',
		nextContentCls: 'pg-next',
		current: 1,
	};


	function Pagination (target, options) {
		var _this = $(target),
			index,
			pagination = this,
			prevText = '',
			end = 5,
			rest = '<span class="'+ options.commonCls +'">...</span>';

		this.setPage = function (index) {
			var html = '',
				current = index || options.current,
				count = options.count,
				start = 1,
				prevText = '';

			if (current === 1) {
				html += '<span class="'+ options.prevContentCls+' '+ options.commonCls +'">'+ options.prevContent +'</span>';
			} else {
				html += '<a href="javascript:;" class="'+ options.prevContentCls +' '+ options.commonCls +'">'+ options.prevContent +'</a>';
			}

			if (current < options.pageStart && end - current < 2) {
				end++;
 			} else if (current >= options.pageStart && current <= options.pageTotal) {
 				end = current + options.count <= options.pageTotal ? current + options.count : options.pageTotal;
 				start = end === options.pageTotal && options.pageTotal - current < options.count ? options.pageTotal - options.count * 2 : current - options.count;
 				for (var i = 0; i < options.prevCount; i++) {
 					prevText += '<a href="javascript:;" class="'+ options.commonCls +'">'+ (i + 1) +'</a>';
 				}
 				html += prevText + rest;
 			}

			for (; start <= end; start++) {
				if (start === current) {
					html += '<span class="'+ options.commonCls +'">'+ start +'</span>';
				} else {
					html += '<a href="javascript:;" class="'+ options.commonCls +'" data-page="'+ start +'">'+ start +'</a>';
				}
			}

			if (options.pageTotal > end) {
				html += rest;
			}
			if (current === options.pageTotal) {
				html += '<span class="'+ options.nextContentCls +' '+ options.commonCls +'">'+ options.nextContent +'</span>';
			} else {
				html += '<a href="javascript:;" class="'+ options.nextContentCls +' '+ options.commonCls +'">'+ options.nextContent +'</a>';
			}
			_this.html(html);
		}

		this.clickEvent = function () {
			_this.on('click', 'a', function () {
				index = +$(this).data('page');
				pagination.setPage(index);
			});
		}

		this.init = function () {
			this.setPage();
			this.clickEvent();
		}

		this.init();
	}

	$.fn.pagination = function (opts) {
		var options = $.extend({}, defaults, opts);

		return this.each(function () {
			new Pagination(this, options);
		})
	}
});