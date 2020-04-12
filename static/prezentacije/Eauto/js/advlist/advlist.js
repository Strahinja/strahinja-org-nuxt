(function ($){
	$.advlist = function(element, options)
	{
		var defaults = {
			alwaysVisible: false,
			dataCreate: function(param) { return null; },
			dataCreateParam: undefined,
			dataFormat: defaultDataFormat,
			dataFormatParam: undefined,
			onAfterDataCreate: function(param) {},
			onAfterDataCreateParam: undefined,
			onAfterDataFormat: function(param) {},
			onAfterDataFormatParam: undefined,
			onClick: function(obj, listIndex, event, target, param) {},
			onClickParam: undefined,
			onMouseOver: function(obj, listIndex, event, target, param) {},
			onMouseParam: undefined,
			onMouseOut: function(obj, listIndex, event, target, param) {},
			onMouseOutParam: undefined,
			slimScrollShowSpeed: 'fast',
			slimScrollHideSpeed: 'fast',
			width: '30em',
			height: '20em',
			itemHeight: '1em'
		};
		
		var plugin = this;
		
		plugin.settings = {};

		var $element = $(element);
		
		var $scroll = null;
		
		plugin.init = function()
		{
			plugin.settings = $.extend({}, defaults, options);
			
			plugin.setData(plugin.settings.dataCreate.call(this, plugin.settings.dataCreateParam));
			plugin.setWidth(plugin.settings.width);
			plugin.setHeight(plugin.settings.height);
			plugin.setItemHeight(plugin.settings.itemHeight);
			
			render();
		}
		
		plugin.getData = function()
		{
			return plugin.listData;
		}
		plugin.setData = function(newData)
		{
			//console.log('advlist.setData: newData = ');
			//console.log(newData);
			plugin.listData = newData;
			return plugin;
		}
		
		plugin.getItem = function(index)
		{
			return plugin.listData[index];
		}
		plugin.setItem = function(index, item)
		{
			delete plugin.listData[index];
			plugin.listData[index] = item;
		}
		
		plugin.getListItem = function(index)
		{
			return $element.find('li').eq(index);
		}
		
		plugin.setDataCreate = function(newHandler)
		{
			plugin.settings.dataCreate = newHandler;
			return plugin;
		}
		plugin.setDataFormat = function(newHandler)
		{
			plugin.settings.dataFormat = newHandler;
			return plugin;
		}
		plugin.setOnAfterDataCreate = function(newHandler)
		{
			plugin.settings.onAfterDataCreate = newHandler;
			return plugin;
		}
		plugin.setOnAfterDataFormat = function(newHandler)
		{
			plugin.settings.onAfterDataFormat = newHandler;
			return plugin;
		}
		plugin.setOnClick = function(newHandler)
		{
			plugin.settings.onClick = newHandler;
			return plugin;
		}
		plugin.setOnMouseOver = function(newHandler)
		{
			plugin.settings.onMouseOver = newHandler;
			return plugin;
		}
		plugin.setOnMouseOut = function(newHandler)
		{
			plugin.settings.onMouseOut = newHandler;
			return plugin;
		}
		
		plugin.getWidth = function()
		{
			return plugin.settings.width;
		}
		plugin.setWidth = function(newWidth)
		{
			plugin.settings.width = newWidth;
			$element.css({
				width: newWidth
			});
			initSS();
			return plugin;
		}

		plugin.getHeight = function()
		{
			return plugin.settings.height;
		}
		plugin.setHeight = function(newHeight, forceOverPanel)
		{
			var scrollTop = $element.scrollTop();
			var forceOverPanel = typeof forceOverPanel !== 'undefined' ? forceOverPanel : false;
			//console.log('ADVLIST[' + $element.prop('id') + ']::setHeight(' + newHeight + ', forceOverPanel = ' + forceOverPanel);
			plugin.settings.height = newHeight;
			$element.css({
				height: newHeight
			});
			initSS({
				height: newHeight,
				forceOverPanel: forceOverPanel
				//scrollTo: scrollTop
			});
			return plugin;
		}

		// TODO
		plugin.getItemHeight = function()
		{
			return plugin.settings.itemHeight;
		}
		plugin.setItemHeight = function(newItemHeight)
		{
			plugin.settings.itemHeight = newItemHeight;
			render();
			return plugin;
		}
		
		plugin.refresh = function()
		{
			//console.log('refresh()');
			//console.log(plugin.listData);
			
			plugin.setData(plugin.settings.dataCreate.call(this, plugin.settings.dataCreateParam));
			plugin.settings.onAfterDataCreate.call(plugin.settings.onAfterDataCreateParam);
			
			//console.log(plugin.listData);
			render();
			return plugin;
		}
		plugin.redraw = function()
		{
			render();
			return plugin;
		}
		
		plugin.getScrollTop = function()
		{
			return $element.scrollTop();
		}
		plugin.scrollTo = function(yPos)
		{
			$element.slimScroll({ scrollTo: yPos });
		}
		plugin.hideScrollBar = function()
		{
			$element.slimScroll({ hideBar: true });
		}
		plugin.forceOverPanel = function()
		{
			$element.slimScroll({ forceOverPanel: true });
		}

		plugin.getVisibleItems = function()
		{
			var ret = [];
			
			var currentIndex = 0;
			var itemHeight = plugin.getListItem(0).outerHeight();
			var scrollTop = $element.scrollTop();
			var listHeight = $element.height();
			
			var tolerance = 15;
			
			while (currentIndex < plugin.listData.length)
			{
				/*console.log('getVisibleItems: '
					+ 'scrollTop = ' + scrollTop
					+ ', currentIndex = ' + currentIndex
					+ ', itemHeight = ' + itemHeight
					+ ', listHeight = ' + listHeight
					+ ', scrollTop + listHeight = ' + (parseInt(scrollTop) + parseInt(listHeight))
					+ ', currentIndex * itemHeight = ' + currentIndex * itemHeight
				);*/
				if (scrollTop <= currentIndex * itemHeight
					&& parseInt(scrollTop) + parseInt(listHeight) + tolerance >= (currentIndex+1) * itemHeight)
				{
					ret.push(currentIndex);
				}
				else if (parseInt(scrollTop) + parseInt(listHeight) + tolerance < (currentIndex+1) * itemHeight)
				{
					break;
				}
				currentIndex++;
			}
			
			return ret;
		}
		
		var initSS = function(options)
		{
			var options = typeof options !== 'undefined' ? options : {};
			//console.log('ADVLIST[' + $element.prop('id') + '].initSS(options = ' + options.toString() + ')');
			/*if ($scroll != null)
			{
				$element.unwrap();
				$element.siblings('[class^=slim]:not([class*=Div])').remove();
			}*/
			$element.slimScroll($.extend(options, {
				alwaysVisible: plugin.settings.alwaysVisible,
				width: plugin.settings.width,
				height: plugin.settings.height,
				showSpeed: plugin.settings.slimScrollShowSpeed,
				hideSpeed: plugin.settings.slimScrollHideSpeed
			}));
			$scroll = $element.parent();
		}
		
		var triggerOnClick = function(itemIndex)
		{
			if (typeof itemIndex === 'undefined') return;
			
			var $li = $element.find('li').eq(itemIndex);
			$element.find('li').removeClass('active');
			$li.addClass('active');
			plugin.settings.onClick.call(plugin, plugin.listData[itemIndex], itemIndex, $li[0],
				plugin.settings.onClickParam);
			$li = null;
		}
		
		var render = function()
		{
			//console.log('advlist.render()');
			//console.log(plugin.settings.dataFormat);
			//console.log('plugin.listData.length = ' + plugin.listData.length);
			//console.log(plugin.listData);
			if (plugin.listData != null)
			{
				$element.empty();
				var html = '';
				var i;
				
				//var heightUnit = plugin.settings.itemHeight.match(/[a-z]+/);
				//var ulHeight = (plugin.listData.length * parseInt(plugin.settings.itemHeight)) + heightUnit;
				
				html += '<ul>\n';// style="height: ' + ulHeight + '; min-height: ' + ulHeight + '">\n';
				$.each(plugin.listData, function(idx, obj){
					//console.log('advlist.render: forEach on object ');
					//console.log(obj);
					//console.log('dataFormat()');
					html += '<li>'/* style="height: ' + plugin.settings.itemHeight
						+ '; min-height: ' + plugin.settings.itemHeight
						+ '">'*/
						+ plugin.settings.dataFormat.call(plugin, obj, idx, plugin.settings.dataFormatParam) + '</li>\n';
				});
				html += '</ul>\n';
				
				//console.log('setting html (for element '+$element.prop('id')+') to ');
				//console.log({html: html});
				$element.html(html);
				
				plugin.settings.onAfterDataFormat.call(plugin.settings.onAfterDataFormatParam);
				
				$element.off('click', 'li').on('click', 'li', function(evt) {
				
					// If there is a child element of li that has delegated "click" handler
					// this handler will still execute first, regardless of
					// stopPropagation()/stopImmediatePropagation(). The only way to ensure
					// the execution of this click handler is prevented is to return from
					// the handler itself, if the target is a child element with separate
					// handler.
				
					//console.log('advlist.onclick(); handler =');
					//console.log(plugin.settings.onClick.toString());
					var $li = $(evt.target);
					if ($li.prop('tagName').toLowerCase() != 'li')
					{
						$li = $li.closest('li');
					}
					var listIndex = $li.index();
					/*console.log('onClick: clicked index = ' + listIndex);
					console.log('onClick: clicked item = ');
					console.log(plugin.listData[listIndex]);*/
					//console.log('onClick: $li.html() = ' + $li.html());
					$element.find('li').removeClass('active');
					$li.addClass('active');
					$li = null;
					return plugin.settings.onClick.call(plugin, plugin.listData[listIndex], listIndex, evt, evt.target,
						plugin.settings.onClickParam);
				})//.off('mouseover')
				.on('mouseover', 'li', function(evt) {
					var $li = $(evt.target);
					if ($li.prop('tagName').toLowerCase() != 'li')
					{
						$li = $li.closest('li');
					}
					var listIndex = $li.index();
					$element.find('li').removeClass('hovered');
					$li.addClass('hovered');
					//return
					$li = null;
					plugin.settings.onMouseOver.call(plugin, plugin.listData[listIndex], listIndex, evt, evt.target,
						plugin.settings.onMouseOverParam);
					return true;
				})//.off('mouseout')
				.on('mouseout', 'li', function(evt) {
					var $li = $(evt.target);
					if ($li.prop('tagName').toLowerCase() != 'li')
					{
						$li = $li.closest('li');
					}
					var listIndex = $li.index();
					$element.find('li').removeClass('hovered');
					//return
					$li = null;
					plugin.settings.onMouseOut.call(plugin, plugin.listData[listIndex], listIndex, evt, evt.target,
						plugin.settings.onMouseOutParam);
					return true;
				});/*.css({
					'height': plugin.settings.itemHeight,
					'min-height': plugin.settings.itemHeight
				});*/
				initSS();
			}
		}
		
		plugin.init();
	}
	
	var defaultDataFormat = function(str, param)
	{
		return str;
	}
	
	$.fn.advlist = function(options)
	{
		return this.each(function() {
			if ($(this).data('advlist') == undefined)
			{
				var plugin = new $.advlist(this, options);
				$(this).data('advlist', plugin);
				plugin = null;
			}
		});
	}
})( jQuery );
