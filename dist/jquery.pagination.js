/*!
 * jQuery.pagination.js 插件
 * @version v0.1.0
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
		jumpBtnCls: 'pg-jumpBtn',
		render: function () {}
	};


	function Pagination (target, options) {
		var _this = $(target),
			index,
			obj = this,
			prevText = '',
			rest = '<span class="'+ options.commonCls +'">...</span>';

		this.getPageCount = function () {
			return options.pageTotal;
		}

		this.setPageCount = function (num) {
			return options.pageTotal = num;
		}

		this.getCurrent = function () {
			return options.current;
		}

		this.setPage = function (index) {
			var html = '',
				current = index || options.current,
				count = options.count,
				start = 1,
				end = 5,
				prevText = '';

			if (options.current > options.pageTotal || options.prevCount >= options.pageTotal || options.pageStart >= options.pageTotal || options.pageStart + options.count > options.pageTotal) {
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

		this.eventBind = function () {
			_this.on('click', 'a', function () {
				if ($(this).hasClass(''+ options.nextContentCls +'')) {
					index = +$('.'+ options.currContentCls +'').data('page') + 1;
				} else if ($(this).hasClass(''+ options.prevContentCls +'')) {
					index = +$('.'+ options.currContentCls +'').data('page') - 1;
				} else {
					index = +$(this).data('page');
				}
				obj.setPage(index);
			});
			_this.on('input keydown', '.' + options.jumpNum, function (event) {
				var $this = $(this);
				if (event.type === 'input') {
					var reg = /([^\d]+)/g,
						text = $(this).val();
					if (reg.test(text)) {
						$this.val(text.replace(reg, ''));
					}
					+$this.val() > options.pageTotal && $this.val(options.pageTotal);
					if ($this.val() === '0') { $this.val(1) };
				} else {
					if (event.keyCode === 13) {
						var index = +$this.val();
						obj.setPage(index);
					}
				}
			});
			_this.on('click', '.' + options.jumpBtnCls, function () {
				var index = +($('.' + options.jumpNum).val());
				obj.setPage(index);
			});
		}

		this.init = function () {
			this.setPage();
			this.eventBind();
			options.render();
		}

		this.init();
	}

	$.fn.pagination = function (opts, callback) {
		var options = $.extend({}, defaults, opts);
		if (typeof opts === 'function') {
			callback = opts;
			opts = {};
		} else {
			opts = opts || {};
			callback = callback || function () {};
		}
		return this.each(function () {
			var pagination = new Pagination(this, options);
			callback(pagination);
		});
	}
});

