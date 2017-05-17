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
		pageTotal: 8,
		pageStart: 6,
		prevCount: 2,
		commonCls: 'pg-common',
		currContentCls: 'pg-on',
		prevContent: '<',
		prevContentCls: 'pg-prev',
		nextContent: '>',
		nextContentCls: 'pg-next',
		totalContentCls: 'pg-totalWrapper',
		totalNumCls: 'pg-totalNum',
		jumpToPageCls: 'pg-jumpWrapper',
		jumpNum: 'pg-jumpNum',
		current: 1,
		jumpBtnContent: '确定',
		jumpBtnCls: 'pg-jumpBtn'
	};


	function Pagination (target, options) {
		var _this = $(target),
			index,
			pagination = this,
			prevText = '',
			rest = '<span class="'+ options.commonCls +'">...</span>';

		this.setPage = function (index) {
			var html = '',
				current = index || options.current,
				count = options.count,
				start = 1,
				end = 5,
				prevText = '';

			if (options.prevCount >= options.pageTotal || options.pageStart >= options.pageTotal || options.pageStart + options.count > options.pageTotal) {
				html += '请设置正确的pagination参数';
				_this.html(html);
				return;
			}

			if (current === 1) {
				html += '<span class="'+ options.prevContentCls+' '+ options.commonCls +'">'+ options.prevContent +'</span>';
			} else {
				html += '<a href="javascript:;" class="'+ options.prevContentCls +' '+ options.commonCls +'">'+ options.prevContent +'</a>';
			}

			if (current < options.pageStart && end - current < 2) {
				end = current + 2;
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
					html += '<span class="'+ options.commonCls +' '+ options.currContentCls +'" data-page="'+ start +'">'+ start +'</span>';
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

			html += '<span class="'+ options.totalContentCls +'">共<span class="'+ options.totalNumCls +'">'+ options.pageTotal +'</span>页，</span>';
			html += '<span class="'+ options.jumpToPageCls +'">到第<input type="text" class="'+ options.jumpNum +'" />页</span>'
			html += '<input type="button" value="'+ options.jumpBtnContent +'" class="'+ options.jumpBtnCls +'" />'
			_this.html(html);
		}

		this.clickEvent = function () {
			_this.on('click', 'a', function () {
				if ($(this).hasClass(''+ options.nextContentCls +'')) {
					index = +$('.'+ options.currContentCls +'').data('page') + 1;
				} else if ($(this).hasClass(''+ options.prevContentCls +'')) {
					index = +$('.'+ options.currContentCls +'').data('page') - 1;
				} else {
					index = +$(this).data('page');
				}
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
