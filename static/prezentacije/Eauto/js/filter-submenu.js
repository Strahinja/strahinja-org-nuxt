$(function(){
	$('html').on('click', function(evt){
		//window.alert(':not(.asdf) click');
		$('#filter-submenu > ul > li > ul').removeClass('visible');
		$('#filter-submenu > ul > li').removeClass('selected');
		$('#filter-submenu > ul > li').removeClass('arrowselected');
		$('#filter-submenu > ul > li').removeClass('logoselected');
		$('#filter-submenu > ul > li').removeClass('logoarrowselected');
	});
	//$(':not(#filter-submenu > ul > li)')
	$('#filter-submenu > ul > li:has(ul)')
		.after('<li class="filtersubmenuarrow">&nbsp;</li>');
	$('#filter-submenu > ul > li:has(ul)')
		.addClass('hasarrow');
	$('#filter-submenu > ul > li:not(.filtersubmenuarrow):not(:has(ul))').hover(function(){
		//window.alert('hover on');
		$(this).addClass('hovered');
	},function(){
		//window.alert('hover off');
		$(this).removeClass('hovered');
	});
	$('#filter-submenu > ul > :not(.logo):has(ul)').hover(function(){
		//console.log('#filter-submenu > ul > li:not(.logo):has(ul) hover() on');
		//window.alert('hover on');
		$(this).next().addClass('arrowhovered');
		$(this).addClass('hovered');
	},function(){
		//console.log('#filter-submenu > ul > li:not(.logo):has(ul) hover() off');
		//window.alert('hover off');
		$(this).next().removeClass('arrowhovered');
		$(this).removeClass('hovered');
	});
	$('#filter-submenu > ul > .logo:has(ul)').hover(function(){
		//console.log('#filter-submenu > ul > li.logo:has(ul) hover() on');
		//window.alert('hover on');
		$(this).next().addClass('logoarrowhovered');
		$(this).addClass('logohovered');
	},function(){
		//console.log('#filter-submenu > ul > li.logo:has(ul) hover() off');
		//window.alert('hover off');
		$(this).next().removeClass('logoarrowhovered');
		$(this).removeClass('logohovered');
	});
	$(':not(.logo) + .filtersubmenuarrow').hover(function(){
		//console.log(':not(.logo) + .filtersubmenuarrow hover() on');
		$(this).addClass('arrowhovered');
		$(this).prev().addClass('hovered');
		//$(this).prev().removeClass('doublehovered');
	}, function(){
		//console.log(':not(.logo) + .filtersubmenuarrow hover() off');
		$(this).removeClass('arrowhovered');
		$(this).prev().removeClass('hovered');
	});
	$('.logo + .filtersubmenuarrow').hover(function(){
		//console.log('.logo + .filtersubmenuarrow hover() on');
		$(this).addClass('logoarrowhovered');
		$(this).prev().addClass('logohovered');
		//$(this).prev().removeClass('doublehovered');
	}, function(){
		//console.log('.logo + .filtersubmenuarrow hover() off');
		$(this).removeClass('logoarrowhovered');
		//$(this).prev().removeClass('hovered');
		$(this).prev().removeClass('logohovered');
	});
	$('#filter-submenu > ul > li > ul').unbind('click').on('click', function(){
		$('html').trigger('click');
		return false;
	});
	$('#filter-submenu > ul > :not(.logo):has(ul)').on('click',function(evt){
		//console.log(':not(.logo) + .filtersubmenuarrow click()');
		//window.alert(':not(.logo) + .filtersubmenuarrow click()');
		var wasVisible = $(this).children('ul').hasClass('visible');
		$('html').trigger('click');
		/*var $otherbuttons = $('#filter-submenu > ul > li').not($(this));
		var $otherarrows = $('#filter-submenu > ul > li').not($(this).next());
		$otherbuttons.children('ul').removeClass('visible');
		$otherarrows.removeClass('arrowselected');
		$otherarrows.removeClass('logoarrowselected');
		$otherbuttons.removeClass('selected');
		$otherbuttons.removeClass('logoselected');*/
		if (!wasVisible)
		{
			$(this).children('ul').toggleClass('visible', 1000);
			//window.alert($(this).next().html());
			$(this).next().toggleClass('arrowselected');
			$(this).toggleClass('selected');
		}
		//evt.preventDefault();
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		//return false;
	});
	$(':not(.logo) + .filtersubmenuarrow').on('click',function(evt){
		//console.log(':not(.logo) + .filtersubmenuarrow click()');
		//window.alert(':not(.logo) + .filtersubmenuarrow click()');
		var wasVisible = $(this).prev().children('ul').hasClass('visible');
		$('html').trigger('click');
		/*var $otherbuttons = $('#filter-submenu > ul > li').not($(this).prev());
		var $otherarrows = $('#filter-submenu > ul > li').not($(this));
		$otherbuttons.children('ul').removeClass('visible');
		$otherarrows.removeClass('selected');
		$otherarrows.removeClass('logoarrowselected');
		$otherbuttons.removeClass('selected');
		$otherbuttons.removeClass('logoselected');*/
		if (!wasVisible)
		{
			$(this).prev().children('ul').toggleClass('visible', 1000);
			$(this).toggleClass('selected');
			$(this).prev().toggleClass('selected');
		}
		evt.preventDefault();
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		return false;
	});
	$('#filter-submenu > ul > .logo:has(ul)').on('click',function(evt){
		//console.log('#filter-submenu > ul > .logo:has(ul) click()');
		//window.alert('#filter-submenu > ul > .logo:has(ul) click()');
		var wasVisible = $(this).children('ul').hasClass('visible');
		$('html').trigger('click');
		/*var $otherbuttons = $('#filter-submenu > ul > li').not($(this));
		var $otherarrows = $('#filter-submenu > ul > li').not($(this).next());
		$otherbuttons.children('ul').removeClass('visible');
		$otherarrows.removeClass('arrowselected');
		$otherarrows.removeClass('logoarrowselected');
		$otherbuttons.removeClass('selected');
		$otherbuttons.removeClass('logoselected');*/
		if (!wasVisible)
		{
			$(this).children('ul').toggleClass('visible', 1000);
			//window.alert($(this).next().html());
			$(this).next().toggleClass('logoarrowselected');
			$(this).toggleClass('logoselected');
		}
		//evt.preventDefault();
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		//return false;
	});
	$('.logo + .filtersubmenuarrow').on('click',function(evt){
		//console.log('.logo + .filtersubmenuarrow click()');
		//window.alert('.logo + .filtersubmenuarrow click()');
		var wasVisible = $(this).prev().children('ul').hasClass('visible');
		$('html').trigger('click');
		/*var $otherbuttons = $('#filter-submenu > ul > li').not($(this).prev());
		var $otherarrows = $('#filter-submenu > ul > li').not($(this));
		//window.alert($(this).parent().html());
		$otherbuttons.children('ul').removeClass('visible');
		$otherarrows.removeClass('selected');
		$otherarrows.removeClass('logoarrowselected');
		$otherbuttons.removeClass('selected');
		$otherbuttons.removeClass('logoselected');*/
		//window.alert($(this).prev().children('ul').html());
		if (!wasVisible)
		{
			$(this).prev().children('ul').toggleClass('visible', 1000);
			$(this).toggleClass('logoarrowselected');
			$(this).prev().toggleClass('logoselected');
		}
		//evt.preventDefault();
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		//return false;
	});
	$('#filter-submenu > ul > li > ul > li').hover(function(){
		$(this).addClass('hovered');
	}, function(){
		$(this).removeClass('hovered');
	});
	
	$('.fixedmenu ~ .filtersubmenuarrow').addClass('fixedmenu');
});