function animateMenu($obj)
{
	$obj.toggleClass('visible');
	var height = $obj.height();
	$obj
		.css({
			height: '0',
			opacity: '0.0'
		})
		.animate({
			height: height + 'px',
			opacity: '0.5'
		}, 80, function(){
			$(this).animate({
				opacity: '1.0'
			}, 30)
		});
}

$(function(){
	//$('#topmenu > div > div > ul > li > a').append('<br style="clear: both" />');
	$('html').on('click', function(evt){
		//window.alert('body click');
		$('#topmenu > div > div > ul > li > ul').removeClass('visible');
		$('#topmenu > div > div > ul > li').removeClass('selected');
		$('#topmenu > div > div > ul > li').removeClass('arrowselected');
		$('#topmenu > div > div > ul > li').removeClass('logoselected');
		$('#topmenu > div > div > ul > li').removeClass('logoarrowselected');
	});
	//$(':not(#topmenu > div > div > ul > li)')
	$('#topmenu > div > div > ul > li:has(ul)')
		.after('<li class="topmenuarrow"><div class="arrow">&nbsp;</div></li>');
	$('#topmenu > div > div > ul > li:has(ul)')
		.addClass('hasarrow');
	$('#topmenu > div > div > ul > li:not(.topmenuarrow):not(:has(ul))').hover(function(){
		//window.alert('hover on');
		$(this).addClass('hovered');
	},function(){
		//window.alert('hover off');
		$(this).removeClass('hovered');
	});
	$('#topmenu > div > div > ul > :not(.logo):has(ul)').hover(function(){
		//console.log('#topmenu > div > div > ul > li:not(.logo):has(ul) hover() on');
		//window.alert('hover on');
		$(this).next().addClass('arrowhovered');
		$(this).addClass('hovered');
	},function(){
		//console.log('#topmenu > div > div > ul > li:not(.logo):has(ul) hover() off');
		//window.alert('hover off');
		$(this).next().removeClass('arrowhovered');
		$(this).removeClass('hovered');
	});
	$('#topmenu > div > div > ul > .logo:has(ul) > a').hover(function(){
		//console.log('#topmenu > div > div > ul > li.logo:has(ul) hover() on');
		//window.alert('hover on');
		//   $(this).next().addClass('logoarrowhovered');
		$(this).parent().addClass('logohovered');
	},function(){
		//console.log('#topmenu > div > div > ul > li.logo:has(ul) hover() off');
		//window.alert('hover off');
		//   $(this).next().removeClass('logoarrowhovered');
		$(this).parent().removeClass('logohovered');
	});
	$('#topmenu > div > div > ul > .logo > ul').hover(function(event){
		//console.log('#topmenu > div > div > ul > li.logo:has(ul) hover() on');
		//window.alert('hover on');
		//   $(this).next().addClass('logoarrowhovered');
		$(this).parent().removeClass('logohovered');
		event.stopPropagation();
	},function(event){
		//console.log('#topmenu > div > div > ul > li.logo:has(ul) hover() off');
		//window.alert('hover off');
		//   $(this).next().removeClass('logoarrowhovered');
		/*$(this).parent().removeClass('logohovered');
		event.stopPropagation();*/
	});
	$(':not(.logo) + .topmenuarrow .arrow').hover(function(){
		//console.log(':not(.logo) + .topmenuarrow hover() on');
		$(this).parent().addClass('arrowhovered');
		$(this).parent().prev().addClass('hovered');
		//$(this).prev().removeClass('doublehovered');
	}, function(){
		//console.log(':not(.logo) + .topmenuarrow hover() off');
		$(this).parent().removeClass('arrowhovered');
		$(this).parent().prev().removeClass('hovered');
	});
	$('.logo + .topmenuarrow > .arrow').hover(function(){
		//console.log('.logo + .topmenuarrow hover() on');
		$(this).parent().addClass('logoarrowhovered');
		//   $(this).prev().addClass('logohovered');
		//$(this).prev().removeClass('doublehovered');
	}, function(){
		//console.log('.logo + .topmenuarrow hover() off');
		$(this).parent().removeClass('logoarrowhovered');
		//$(this).prev().removeClass('hovered');
		//   $(this).prev().removeClass('logohovered');
	});
	$('#topmenu > div > div > ul > li > ul').unbind('click').on('click', function(){
		$('html').trigger('click');
		return false;
	});
	$('#topmenu > div > div > ul > :not(.logo):has(ul)').on('click',function(evt){
		//console.log(':not(.logo) + .topmenuarrow click()');
		//window.alert(':not(.logo) + .topmenuarrow click()');
		var wasVisible = $(this).children('ul').hasClass('visible');
		$('html').trigger('click');
		/*var $otherbuttons = $('#topmenu > div > div > ul > li').not($(this));
		var $otherarrows = $('#topmenu > div > div > ul > li').not($(this).next());
		$otherbuttons.children('ul').removeClass('visible');
		$otherarrows.removeClass('arrowselected');
		$otherarrows.removeClass('logoarrowselected');
		$otherbuttons.removeClass('selected');
		$otherbuttons.removeClass('logoselected');*/
		if (!wasVisible)
		{
			animateMenu($(this).children('ul'));
			//window.alert($(this).next().html());
			$(this).next().toggleClass('arrowselected');
			$(this).toggleClass('selected');
		}
		//evt.preventDefault();
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		//return false;
	});
	$(':not(.logo) + .topmenuarrow').on('click',function(evt){
		//console.log(':not(.logo) + .topmenuarrow click()');
		//window.alert(':not(.logo) + .topmenuarrow click()');
		var wasVisible = $(this).prev().children('ul').hasClass('visible');
		$('html').trigger('click');
		/*var $otherbuttons = $('#topmenu > div > div > ul > li').not($(this).prev());
		var $otherarrows = $('#topmenu > div > div > ul > li').not($(this));
		$otherbuttons.children('ul').removeClass('visible');
		$otherarrows.removeClass('selected');
		$otherarrows.removeClass('logoarrowselected');
		$otherbuttons.removeClass('selected');
		$otherbuttons.removeClass('logoselected');*/
		if (!wasVisible)
		{
			animateMenu($(this).prev().children('ul'));
			$(this).toggleClass('arrowselected');
			$(this).prev().toggleClass('selected');
		}
		evt.preventDefault();
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		return false;
	});
	$('#topmenu > div > div > ul > .logo:has(ul)').on('click',function(evt){
		//console.log('#topmenu > div > div > ul > .logo:has(ul) click()');
		//window.alert('#topmenu > div > div > ul > .logo:has(ul) click()');
		var wasVisible = $(this).children('ul').hasClass('visible');
		$('html').trigger('click');
		/*var $otherbuttons = $('#topmenu > div > div > ul > li').not($(this));
		var $otherarrows = $('#topmenu > div > div > ul > li').not($(this).next());
		$otherbuttons.children('ul').removeClass('visible');
		$otherarrows.removeClass('arrowselected');
		$otherarrows.removeClass('logoarrowselected');
		$otherbuttons.removeClass('selected');
		$otherbuttons.removeClass('logoselected');*/
		/*if (!wasVisible)
		{
			$(this).children('ul').toggleClass('visible', 1000);
			//window.alert($(this).next().html());
			$(this).next().toggleClass('logoarrowselected');
			$(this).toggleClass('logoselected');
		}*/
		//evt.preventDefault();
		/*evt.stopPropagation();
		evt.stopImmediatePropagation();*/
		//return false;
	});
	$('.logo + .topmenuarrow').on('click',function(evt){
		var wasVisible = $(this).prev().children('ul').hasClass('visible');
		$('html').trigger('click');
		//console.log('.logo + .topmenuarrow click()');
		//window.alert('.logo + .topmenuarrow click()');
		//window.alert($(this).parent().html());
		/*var $otherbuttons = $('#topmenu > div > div > ul > li').not($(this).prev());
		var $otherarrows = $('#topmenu > div > div > ul > li').not($(this));
		$otherbuttons.children('ul').removeClass('visible');
		$otherarrows.removeClass('selected');
		$otherarrows.removeClass('logoarrowselected');
		$otherbuttons.removeClass('selected');
		$otherbuttons.removeClass('logoselected');*/
		//window.alert($(this).prev().children('ul').html());
		if (!wasVisible)
		{
			animateMenu($(this).prev().children('ul'));
			$(this).toggleClass('logoarrowselected');
			//  $(this).prev().toggleClass('logoselected');
		}
		//evt.preventDefault();
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		//return false;
	});
	$('#topmenu > div > div > ul > li > ul > li').hover(function(){
		$(this).addClass('hovered');
	}, function(){
		$(this).removeClass('hovered');
	});
	
	$('.fixedmenu ~ .topmenuarrow').addClass('fixedmenu');
});