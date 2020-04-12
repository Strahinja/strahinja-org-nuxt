(function ($){
	$.domlist = function(element, options)
	{
		var defaults = {
			alwaysVisible: false,
			onClick: function(listIndex, event, target, param) {},
			onClickParam: undefined,
			onMouseOver: function(listIndex, event, target, param) {},
			onMouseOverParam: undefined,
			onMouseOut: function(listIndex, event, target, param) {},
			onMouseOutParam: undefined,
			slimScrollShowSpeed: 'fast',
			slimScrollHideSpeed: 'fast',
			width: '30em',
			height: '20em'//,
			//itemHeight: '1em'
		};
		
		var plugin = this;
		
		plugin.settings = {};

		var $element = $(element);
		
		var $scroll = null;
		
		plugin.init = function()
		{
			plugin.settings = $.extend({}, defaults, options);
			
			plugin.setWidth(plugin.settings.width);
			plugin.setHeight(plugin.settings.height);
			//plugin.setItemHeight(plugin.settings.itemHeight);
			plugin.initEvents();
		}
		
		plugin.initEvents = function()
		{
			$element.off('click', 'li');
			$element.on('click', 'li', function(evt) {
					var $item = $(evt.target)[0].nodeName.toLowerCase() == 'li'
						? $(evt.target) : $(evt.target).closest('li');
					plugin.settings.onClick.call(plugin, $item.index(), evt, $item,
						plugin.settings.onClickParam);
					$item = null;
				});
			$element.off('mouseover', 'li');
			$element.on('mouseover', 'li', function(evt) {
					var $item = $(evt.target)[0].nodeName.toLowerCase() == 'li'
						? $(evt.target) : $(evt.target).closest('li');
					plugin.settings.onMouseOver.call(plugin, $item.index(), evt, $item,
						plugin.settings.onMouseOverParam);
					$item = null;
				});
			$element.off('mouseout', 'li');
			$element.on('mouseout', 'li', function(evt) {
					var $item = $(evt.target)[0].nodeName.toLowerCase() == 'li'
						? $(evt.target) : $(evt.target).closest('li');
					plugin.settings.onMouseOut.call(plugin, $item.index(), evt, $item,
						plugin.settings.onMouseOutParam);
					$item = null;
				});
		}
		
		plugin.getItem = function(index)
		{
			return $element.find('li').eq(index);
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
		
		plugin.addItem = function(html)
		{
			$element.children('ul').append(html);
		}

		plugin.addItemAt = function(html, position)
		{
			$(html).insertAfter($element.find('ul > li').eq(position));
		}

		// TODO
		/*plugin.getItemHeight = function()
		{
			return plugin.settings.itemHeight;
		}
		plugin.setItemHeight = function(newItemHeight)
		{
			plugin.settings.itemHeight = newItemHeight;
			$element.find('li').each(function(){
				$(this).css('height', newItemHeight);
			});
			return plugin;
		}*/
		
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
			// TODO
			return;
			
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
		plugin.init();
	}
	
	$.fn.domlist = function(options)
	{
		return this.each(function() {
			if ($(this).data('domlist') == undefined)
			{
				var plugin = new $.domlist(this, options);
				$(this).data('domlist', plugin);
				plugin = null;
			}
		});
	}
})( jQuery );
