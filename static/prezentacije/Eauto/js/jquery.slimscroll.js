/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.1.0
 *
 */
(function($) {

  jQuery.fn.extend({
    slimScroll: function(options) {

      var defaults = {

		// child element selectors to use when detecting when the cursor is inside the scroll area
		// (sometimes child elements can cover it and interfere with the detection)
		detectOverElement: undefined,
		detectOutElement: undefined,

        // width in pixels of the visible scroll area
        width : 'auto',

        // height in pixels of the visible scroll area
        height : '250px',

        // width in pixels of the scrollbar and rail
        size : '7px',

        // scrollbar color, accepts any hex/color value
        color: '#000',

        // scrollbar position - left/right
        position : 'right',

        // distance in pixels between the side edge and the scrollbar
        distance : '1px',

        // default scroll position on load - top / bottom / $('selector')
        start : 'top',

        // sets scrollbar opacity
        opacity : .4,

        // enables always-on mode for the scrollbar
        alwaysVisible : false,

        // check if we should hide the scrollbar when user is hovering over
        disableFadeOut: false,

        // sets visibility of the rail
        railVisible : false,

        // sets rail color
        railColor : '#333',

        // sets rail opacity
        railOpacity : .2,

        // whether  we should use jQuery UI Draggable to enable bar dragging
        railDraggable : true,

        // defautlt CSS class of the slimscroll rail
        railClass : 'slimScrollRail',

        // defautlt CSS class of the slimscroll bar
        barClass : 'slimScrollBar',

        // defautlt CSS class of the slimscroll wrapper
        wrapperClass : 'slimScrollDiv',

        // check if mousewheel should scroll the window if we reach top/bottom
        allowPageScroll : false,

        // scroll amount applied to each mouse wheel step
        wheelStep : 20,

        // scroll amount applied when user is using gestures
        touchScrollStep : 200,

		showSpeed: 'fast',
		hideSpeed: 'fast',

		overrideBarTop: 0
      };

      var o = $.extend(defaults, options);

      // do it for every element that matches selector
      this.each(function(){

      var isOverPanel, isOverBar, isDragg, queueHide, touchDif,
        barHeight, percentScroll, lastScroll,
        divS = '<div></div>',
        minBarHeight = 30,
        releaseScroll = false;

        // used in event handlers and for better minification
        var me = $(this);

        // ensure we are not binding it again
		//console.log('slimScroll: me[=\'#'+(me.prop('id'))+'.'+(me.prop('class'))+'\'].parent()[=\'#'+($(me.parent()).prop('id'))+'.'+($(me.parent()).prop('class'))+'\'].hasClass(o.wrapperClass = '+o.wrapperClass+') = ' + me.parent().hasClass(o.wrapperClass));
        if (me.parent().hasClass(o.wrapperClass))
        {
            // start from last bar position
            var offset = me.scrollTop();

            // find bar and rail
            bar = me.parent().find('.' + o.barClass);
            rail = me.parent().find('.' + o.railClass);

            getBarHeight();

			var hideBarOption = false;

            // check if we should scroll existing instance
            if ($.isPlainObject(options))
            {
			  /*console.log('slimScroll: options = ');
			  console.log(options);*/
			  if ('hideBar' in options && options['hideBar'])
			  {
				  hideBarOption = true;
			  }

			  /*console.log('slimScroll: forceOverPanel in options: ' + ('forceOverPanel' in options)
				+ ', forceOverPanel = ' + options['forceOverPanel']);*/
			  if ('forceOverPanel' in options && options['forceOverPanel'])
			  {
				  forceOverPanel();
			  }

			  if ('scrollTo' in options)
              {
                // jump to a static point
                offset = parseInt(o.scrollTo);
              }
              else if ('scrollBy' in options)
              {
                // jump by value pixels
                offset += parseInt(o.scrollBy);
              }
              else if ('destroy' in options)
              {
                // remove slimscroll elements
                bar.remove();
                rail.remove();
                me.unwrap();
                return;
              }

              // scroll content by the given offset
              scrollContent(offset, false, true);
            }

            return;
        }

        // optionally set height to the parent's height
        o.height = (o.height == 'auto') ? me.parent().innerHeight() : o.height;

		//o.top = o.overrideBarTop;
		o.top = 0;
			//console.log('slimScroll: height before = ' + o.height);
			//o.height = parseInt(o.height) - parseInt(o.overrideBarTop) + 'px';
			//console.log('slimScroll: height after = ' + o.height);

        // wrap content
        var wrapper = $(divS)
          .addClass(o.wrapperClass)
          .css({
            position: 'relative',
            overflow: 'hidden',
            width: o.width,
            height: o.height
          });

        // update style for the div
        me.css({
          overflow: 'hidden',
          width: o.width,
          height: o.height
        });

        // create scrollbar rail
        var rail = $(divS)
          .addClass(o.railClass)
          .css({
            width: o.size,
            height: '100%',
            position: 'absolute',
            top: o.top,
            display: (o.alwaysVisible && o.railVisible) ? 'block' : 'none',
            'border-radius': o.size,
            background: o.railColor,
            opacity: o.railOpacity,
            zIndex: 90
          });

        // create scrollbar
        var bar = $(divS)
          .addClass(o.barClass)
          .css({
            background: o.color,
            width: o.size,
            position: 'absolute',
            top: o.top,
            opacity: o.opacity,
            display: o.alwaysVisible ? 'block' : 'none',
            'border-radius' : o.size,
            BorderRadius: o.size,
            MozBorderRadius: o.size,
            WebkitBorderRadius: o.size,
            zIndex: 99
          });

        // set position
        var posCss = (o.position == 'right') ? { right: o.distance } : { left: o.distance };
        rail.css(posCss);
        bar.css(posCss);

        // wrap it
        me.wrap(wrapper);

        // append to parent div
        me.parent().append(bar);
        me.parent().append(rail);

        // make it draggable
        if (o.railDraggable)
        {
          bar.draggable({
            axis: 'y',
            containment: 'parent',
            start: function() { isDragg = true; },
            stop: function() { isDragg = false; hideBar(); },
            drag: function(e)
            {
              // scroll content
              scrollContent(0, $(this).position().top, false);
            }
          });
		  bar.css({
			'margin-top': o.overrideBarTop
		  });
        }

		if (hideBarOption)
		{
			hideBar();
		}

        // on rail over
        rail.hover(function(){
          showBar();
        }, function(){
          hideBar();
        });

        // on bar over
        bar.hover(function(){
          isOverBar = true;
        }, function(){
          isOverBar = false;
        });

        // show on parent mouseover
		var overElem;
		//console.log('detectOverElement = ' + defaults.detectOverElement);
		if (typeof defaults.detectOverElement !== 'undefined')
		{
			overElem = me.find(defaults.detectOverElement);
		}
		else
		{
			overElem = me;
		}
		var outElem;
		if (typeof defaults.detectOutElement !== 'undefined')
		{
			outElem = me.find(defaults.detectOutElement);
		}
		else
		{
			outElem = me;
		}
		overElem.off('mouseenter');
        overElem.on('mouseenter', function(){
		  //console.log('slimScroll hover ON');
          isOverPanel = true;
		  me.data('isOverPanel', isOverPanel);
		  //console.log('overElem['+me.prop('id')+'].on(mouseenter): setting isOverPanel to true and showing bar');
		  //console.log('me.data() returns ' + me.data('isOverPanel'));
		  //console.log('isOverPanel = ' + isOverPanel);
          showBar();
          //hideBar();
        });
		overElem.off('mousemove');
		overElem.on('mousemove', function(){
		  //console.log('slimScroll hover ON');
          isOverPanel = true;
		  me.data('isOverPanel', isOverPanel);
		  //console.log('overElem['+me.prop('id')+'].on(mousemove): setting isOverPanel to true and showing bar');
		  //console.log('me.data() returns ' + me.data('isOverPanel'));
		  //console.log('isOverPanel = ' + isOverPanel);
          showBar();
          //hideBar();
        });
		outElem.off('mouseleave');
		outElem.on('mouseleave', function(){
		  //console.log('slimScroll hover OFF');
          isOverPanel = false;
		  me.data('isOverPanel', isOverPanel);
		  //console.log('outElem['+me.prop('id')+'].on(mouseleave): setting isOverPanel to false and hiding bar');
		  //console.log('me.data() returns ' + me.data('isOverPanel'));
		  //console.log('isOverPanel = ' + isOverPanel);
          hideBar();
        });
        /*me.hover(function(){
		  console.log('slimScroll hover ON');
          isOverPanel = true;
		  console.log('isOverPanel = ' + isOverPanel);
          showBar();
          hideBar();
        }, function(){
		  console.log('slimScroll hover OFF');
          isOverPanel = false;
		  console.log('isOverPanel = ' + isOverPanel);
          hideBar();
        });*/

        // support for mobile
        me.bind('touchstart', function(e,b){
          if (e.originalEvent.touches.length)
          {
            // record where touch started
            touchDif = e.originalEvent.touches[0].pageY;
          }
        });

        me.bind('touchmove', function(e){
          // prevent scrolling the page
          e.originalEvent.preventDefault();
          if (e.originalEvent.touches.length)
          {
            // see how far user swiped
            var diff = (touchDif - e.originalEvent.touches[0].pageY) / o.touchScrollStep;
            // scroll content
            scrollContent(diff, true);
          }
        });

        // check start position
        if (o.start === 'bottom')
        {
          // scroll content to bottom
          bar.css({ top: me.outerHeight() - bar.outerHeight() });
          scrollContent(0, true);
        }
        else if (o.start !== 'top')
        {
          // assume jQuery selector
          scrollContent($(o.start).position().top, null, true);

          // make sure bar stays hidden
          if (!o.alwaysVisible) { bar.hide(); }
        }

        // attach scroll events
        attachWheel();

        // set up initial height
        getBarHeight();

        function _onWheel(e)
        {
		  //console.log('onWheel: isOverPanel = ' + isOverPanel);
		  var e = e || window.event;

		  // use mouse wheel only when mouse is over
          if (!isMouseOverPanel())
		  {
			  e.returnValue = true;
			  return e.returnValue;
		  }

          var delta = 0;
          if (e.wheelDelta) { delta = -e.wheelDelta/120; }
          if (e.detail) { delta = e.detail / 3; }

          var target = e.target || e.srcTarget;
          if ($(target).closest('.' + o.wrapperClass).is(me.parent())) {
            // scroll content
            scrollContent(delta, true);
          }

          // stop window scroll
          if (e.preventDefault && !releaseScroll) {
			  e.preventDefault();
			  e.stopPropagation();
			  e.stopImmediatePropagation();
		  }
          if (!releaseScroll) { e.returnValue = false; }
		  return e.returnValue;
        }

		me.bind('scrollContent', function(e, y) {
				//console.log('scrollContent event fired! e = ' + e + ', y = ' + y);
                scrollContent(y, true, false);
            });	
			
		function scrollContent(y, isWheel, isJump)
        {
			bar = me.parent().find('.' + o.barClass);
			/*console.log('scrollContent(y='
				+ y
				+ ', isWheel='
				+ isWheel
				+ ', isJump='
				+ isJump
				+ ') called'
			);*/
          var delta = y;
		  var overrideBarTop = parseInt(o.overrideBarTop);
          //var maxTop = me.outerHeight() - bar.outerHeight();
		  var maxTop = me.height() //- parseInt(me.css('padding-top'))
			- (bar.outerHeight()+overrideBarTop);
		  /*console.log('////MAXTOP = ' + me.height());
		  console.log('MAXTOP = ' + parseInt(me.css('padding-top')));
		  console.log('MAXTOP = ' + bar.outerHeight());
		  console.log('MAXTOP = ' + overrideBarTop);
		  console.log('MAXTOP = ' + maxTop);*/

          if (isWheel)
          {
            // move bar with mouse wheel
            delta = parseInt(bar.css('top')) + y * parseInt(o.wheelStep) / 100 * (bar.outerHeight());

            // move bar, make sure it doesn't go out
            delta = Math.min(Math.max(delta, 0), maxTop);// - overrideBarTop);

            // if scrolling down, make sure a fractional change to the
            // scroll position isn't rounded away when the scrollbar's CSS is set
            // this flooring of delta would happened automatically when
            // bar.css is set below, but we floor here for clarity
            delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);

            // scroll the scrollbar
			/*console.log('me = ');
			console.log(me);
			console.log('me.parent = ');
			console.log(me.parent());
			console.log('me.parent.find(bar) = ');
			console.log(me.parent().find('.' + o.barClass));
			
			console.log('scrollContent: bar.top = ' + bar.css('top') + ', seting to ' + delta);*/
            bar.css({ top: delta + 'px' });
			//console.log('after setting, bar.top now ' + bar.css('top'));
          }

          // calculate actual scroll amount
          percentScroll = (parseInt(bar.css('top'))) / (me.height() - parseInt(me.css('padding-top')) - (bar.outerHeight()+overrideBarTop));
          delta = percentScroll * (me[0].scrollHeight - me.outerHeight());

          if (isJump)
          {
            delta = y;
            var offsetTop = delta / me[0].scrollHeight * me.outerHeight();
            offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
            bar.css({ top: offsetTop + 'px' });
          }

          // scroll content
          me.scrollTop(delta);

          // fire scrolling event
          me.trigger('slimscrolling', ~~delta);

          // ensure bar is visible
          showBar();

          // trigger hide when scroll is stopped
          hideBar();
        }

        function attachWheel()
        {
          if (window.addEventListener)
          {
			this.removeEventListener('DOMMouseScroll', _onWheel, false);
			this.removeEventListener('mousewheel', _onWheel, false);
            this.addEventListener('DOMMouseScroll', _onWheel, false );
            this.addEventListener('mousewheel', _onWheel, false );
          }
          else
          {
            document.detachEvent("onmousewheel", _onWheel)
            document.attachEvent("onmousewheel", _onWheel)
          }
        }

        function getBarHeight()
        {
          // calculate scrollbar height and make sure it is not too small
		  var overrideBarTop = parseInt(o.overrideBarTop);
          barHeight = Math.max((me.outerHeight() / me[0].scrollHeight) * me.outerHeight(), minBarHeight) - overrideBarTop
		  ;
          bar.css({ height: barHeight + 'px' });

          // hide scrollbar if content is not long enough
          var display = barHeight == me.outerHeight()-overrideBarTop ? 'none' : 'block';
          bar.css({ display: display });
        }

		function isMouseOverPanel()
		{
			if (typeof isOverPanel === 'undefined')
			{
				isOverPanel = me.data('isOverPanel');
				//console.log(me.prop('id') + '.data(isOverPanel) = ' + isOverPanel);
			}
			//console.log(me.prop('id') + '.isMouseOverPanel() returning ' + isOverPanel);
			return isOverPanel;
		}

		function forceOverPanel()
		{
			//console.log(me.prop('id') + '.forceOverPanel(): setting isOverPanel to true');
			isOverPanel = true;
			me.data('isOverPanel', isOverPanel);
		}

        function showBar()
        {
		  var overrideBarTop = parseInt(o.overrideBarTop);
		  //console.log('showBar: bar.top = ' + bar.css('top'));
		  /*if (me.prop('id').substring(0,4) == 'righ')
		  {
			  console.log(me.prop('id') + '.showBar() (CLEARS THE HIDE TIMEOUT!)');
		  }*/
          // recalculate bar height
          getBarHeight();
          clearTimeout(queueHide);

          // when bar reached top or bottom
		  /*console.log('percentscroll = ' + percentScroll
				+ ', ~~percentScroll = ' + (~~percentScroll));*/
          if (percentScroll == ~~percentScroll || percentScroll > 1)
          {
            //release wheel
            releaseScroll = o.allowPageScroll;

            // publish approporiate event
			/*console.log('releaseScroll = ' + releaseScroll
				+ ', lastScroll = ' + lastScroll);*/
            if (lastScroll != percentScroll)
            {
                var msg = (~~percentScroll == 0) ? 'top' : 'bottom';
                me.trigger('slimscroll', msg);
            }
          }
          lastScroll = percentScroll;

          // show only when required
          if(barHeight + overrideBarTop >= me.outerHeight()) {
            //allow window scroll
            releaseScroll = true;
            return;
          }
          bar.stop(true,true).fadeIn(o.showSpeed);
          if (o.railVisible) { rail.stop(true,true).fadeIn(o.showSpeed); }
        }

        function hideBar()
        {
     	  var _isOverPanel = isMouseOverPanel();
          // only hide when options allow it
		  /*//if (me.prop('id').substring(0,4) == 'righ')*/
		  /*if (me.prop('id').substring(0,4) == 'filt')
		  {
			  console.log(me.prop('id') + '.hideBar()');
				console.log('variable state: o.alwaysVisible = '+o.alwaysVisible+'; !(o.disableFadeOut = ' + o.disableFadeOut
					+ ' && isOverPanel = ' + isOverPanel
					+ ') && !isOverPanel && !(isOverBar = ' + isOverBar
					+ ') && !(isDragg = ' + isDragg + ') ===== '
					+ (!(o.disableFadeOut && _isOverPanel) && !_isOverPanel && !isOverBar && !isDragg)
				);
		  }*/
          if (!o.alwaysVisible)
          {
			/*//if (me.prop('id').substring(0,4) == 'righ')
			{
				console.log('!alwaysVisible passed...');
			}*/
            queueHide = setTimeout(function(){
              if (!(o.disableFadeOut && _isOverPanel) && !_isOverPanel && !isOverBar && !isDragg)
              {
				//if (me.prop('id').substring(0,4) == 'righ')
				/*if (me.prop('id').substring(0,4) == 'filt')
				{
					console.log('!!!!!!!!! HIDING for element '+me.prop('id')+' !!!!!!!!!');
				}*/
                bar.fadeOut(o.hideSpeed);
                rail.fadeOut(o.hideSpeed);
              }
            }, //1000);
			10);
          }
        }

      });

      // maintain chainability
      return this;
    }
  });

  jQuery.fn.extend({
    slimscroll: jQuery.fn.slimScroll
  });

})(jQuery);
