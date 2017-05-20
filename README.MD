## jquery.pagination
基于jQuery开发的分页插件。可实现淘**淘宝**、**京东**等著名电商网站的分页效果。
## 安装
- 直接引入`jquery.pagination.js || jquery.pagination.css`。
- 通过 `npm` 安装 `npm install jquery.pagination --save-dev`。
## 功能概述
可实现PC端的分页效果，可自定义参数，提供回调接口和公共API接口，提供异步接口。
## 快速上手
### HTML
	
	<div class="pagination"></div>
### CSS
根据分页插件提供的CSS钩子，所有命名都以.pg-***开头，样式和行为分离。样式可用默认样式，也可以通过引入CSS覆盖默认样式

	.pagination {
		.pg-common {};
		.pg-on {};
		.pg-jumpNum {};
		...
	}
### JavaScript
一行代码即可完成调用，超级简单。

	$('.pagination').pagination();
## 文档
### 参数
jqery.pagination支持无参数的调用，每个参数都会有默认值，如果想实现自定义的功能，可以使用自定义参数。参数默认值如下：
	
	var defaults = {
		count: 2,								// 出现省略号时的当前分页的前后分页个数
		pageTotal: 8,							// 分页总数
		pageStart: 6,							// 出现省略号时的起始分页码
		prevCount: 2,							// 出现省略号时的最前显示分页个数
		commonCls: 'pg-common',					// 分页共同样式钩子
		currContentCls: 'pg-on',				// 当前分页样式钩子
		prevContent: '<',						// 上一页文案
		prevContentCls: 'pg-prev',				// 上一页样式钩子
		nextContent: '>',						// 下一页文案
		nextContentCls: 'pg-next',				// 下一页样式钩子
		totalContentCls: 'pg-totalWrapper',		// 文字样式钩子
		totalNumCls: 'pg-totalNum',				// 总页数样式钩子
		jumpToPageCls: 'pg-jumpWrapper',		// 文字样式钩子
		jumpNum: 'pg-jumpNum',					// 输入框样式钩子
		current: 1,								// 当前页
		jumpBtnContent: '确定',					// 按钮文案
		jumpBtnCls: 'pg-jumpBtn',				// 按钮样式钩子
		callback: function(obj) {},				// 回调函数，接收一个对象作为参数
		render: function() {}					// 异步接口，是否跨域请求取决于用户需要
	};

### callback方法
#### obj.getPageCount
获取当前的总分页数，即pageTotal，无参数。
#### obj.setPageCount
设置当前的总分页数，接收一个参数，即要设置的总分页数（pageTotal）
#### obj.getCurrent
获取当前分页，无参数
### render方法（异步接口方法）

	$('.pagination').pagination({
		render: function () {
			$.ajax({
				url: '../test.php',
				type: 'GET',
				//如果要传递分页数到服务器，按以下方式获取分页数
				data: $('input.pg-jumpNum').val() || $('span.pg-on').text(),
				success: function (val) {
					console.log(val);
				}
			})
		}
	});
