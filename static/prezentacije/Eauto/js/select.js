var maxMenuHeight = 200;

window.scrollPos = 0;
window.scrollIndicators = ['/', '-', '\\', '|'];

function onMsDDOpen($dd)
{
	//console.log('onOpen!');
	var $mw = $dd.find('.dd-menu-wrap');
	var $ddt = $dd.find('.ddTitle');
	var $ssd = $mw.parent();
	var $ddc = $ssd.parent();
	var $ul = $mw.find('ul');
	var $ssd = $mw.parent();//$ddc.find('.slimScrollDiv');
	var ulHeight = $ul.outerHeight(true);
	var ssHeight = $ssd.height();
	var ddcHeight = $ddc.height();
	
	if (ulHeight > maxMenuHeight)
	{
		/*console.log('ulHeight[' + ulHeight + '] > maxMenuHeight['
			+ maxMenuHeight + '], setting heights to maxMenuHeight['
			+ maxMenuHeight + ']');*/
		$ddc.css({
			height: maxMenuHeight + 'px',
			'min-height': maxMenuHeight + 'px'
		});
		$ssd.css({
			height: maxMenuHeight + 'px',
			'min-height': maxMenuHeight + 'px'
		});
		$mw.css({
			height: maxMenuHeight + 'px',
			'min-height': maxMenuHeight + 'px'
		});
	}
	else
	{
		/*console.log('ulHeight[' + ulHeight + '] <= maxMenuHeight['
			+ maxMenuHeight + '], setting heights to ulHeight['
			+ ulHeight + ']');*/
		$ddc.css({
			height: ulHeight + 'px',
			'min-height': ulHeight + 'px'
		});
		$ssd.css({
			height: ulHeight + 'px',
			'min-height': ulHeight + 'px'
		});
		$mw.css({
			height: ulHeight + 'px',
			'min-height': ulHeight + 'px'
		});
	}
	ssHeight = $ssd.height();

	var ddcTop = parseInt($ddc.css('top'));
	if (ddcTop < 0)
	{
		$ddc.css({
			top: '-' + ssHeight + 'px'
		});
	}
	else
	{
		$ddc.css({
			top: $ddt.height() + 'px'
		});
	}
	/*$('.dd').on('click', function() {
		var firstClick = $(this).data('firstClick');
		console.log('this.id = '
			+ this.id
			+ ', firstClick = '
			+ firstClick
		);
		if (typeof firstClick === 'undefined' || firstClick == true)
		{
			console.log('trap!');
			$(this).data('firstClick', false);
			$(this).parent().find('select').msDropDown('open');
			$(this).parent().find('select').msDropDown('close');
			$(this).parent().find('select').msDropDown('open');
		}
		else
		{
			console.log('normal click');
		}
	});*/
	
	//console.log('dd.on(): ddcHeight = ' + ddcHeight);
	/*$ddc.css({
		'max-height': ulHeight + 'px'
	});*/
}

function initEAutoCustomDropdown($elem)
{
	/*console.log('/=====================================\\');
	console.log('setting dropdown for ');
	console.log($elem);*/

	$elem.msDropDown({
		'animStyle': 'none',
		on: {
			open: function() {
				/*console.log('open event, this = ');
				console.log($elem);*/
				
				/*console.log('in open: dd = ');
				console.log($dd);*/
				$dd.addClass('open');
				onMsDDOpen($dd);
				var $mw = $dd.find('.dd-menu-wrap');
				if ($mw.length > 0)
				{
					$mw.slimScroll({
						alwaysVisible: true, // TODO: IE thinks it should show it even when not needed
						allowPageScroll: false
					});
					$mw.on('mousewheel', function() {
						console.log('$mw.on(\'mousewheel\')');
					});
				}
			}
		}
	});

	var $dd = $elem.parent().next();
	/*console.log('$dd = ');
	console.log($dd);
	console.log('$dd.find(\'.ddChild ul\') = ');
	console.log($dd.find('.ddChild ul'));*/
	var $freshUl = $dd.find('.ddChild ul').not('.dd-menu-wrap ul');
	/*console.log('$freshUl = ');
	console.log($freshUl);
	console.log('\\=====================================/');*/
	$freshUl.wrap('<div class="dd-menu-wrap" />');
	var $menuWrap = $freshUl.parent();
	$menuWrap.slimScroll({
		alwaysVisible: true,
		allowPageScroll: false,
		detectOverElement: 'li'
		//allowPageScroll: true
	});
	$freshUl.on('mousewheel', function(evt) {
		var _wd;
		if (typeof evt !== 'undefined'
			&& typeof evt.originalEvent !== 'undefined')
		{
			_wd = evt.originalEvent.wheelDelta;
		}
		//event.stopPropagation();
		/*console.log('$freshUl.on(\'mousewheel\'): '
			+ 'wheeldelta = '
			+ _wd
		);
		console.log('this.parent.class = '
			+ $menuWrap.prop('class')
		);*/
		if (_wd > 0)
		{
			$menuWrap.trigger('mousewheel', [ _wd ]);
		}
		else
		{
			$menuWrap.trigger('mousewheel', [ _wd ]);
		}
		//return false;
	});
	$menuWrap.on('mousewheel', function(evt, wd) {
		var _wd;

		if (typeof evt !== 'undefined'
			&& typeof evt.originalEvent !== 'undefined')
		{
			_wd = evt.originalEvent.wheelDelta;
		}
		if (typeof wd !== 'undefined')
		{
			_wd = wd;
		}
		/*console.log('$menuWrap.on(\'mousewheel\'): '
			+ 'wheeldelta = '
			+ _wd
		);*/
		//event.stopPropagation();
		if (_wd > 0)
		{
			$(this).trigger('scrollContent', [-1] );
		}
		else
		{
			$(this).trigger('scrollContent', [1] );
		}
		//return false;
	});
	//assignEvents();
}

/*function assignEvents()
{
	$('html,body').on('mousewheel DOMMouseScroll', '.slimScrollDiv', function(evt) {
		console.log('WHEEL! evt = ');
		console.log(evt);
		evt.preventDefault();
		var $elem = $(evt.currentTarget);
		console.log($elem);
		var delta = evt.originalEvent.wheelDelta || -evt.originalEvent.detail;
		var scB = $elem.scrollTop();
		var inc = (delta < 0 ? 1 : -1);// * 30;
		//$elem.css({'margin-top': inc + parseInt($elem.css('margin-top')) + 'px'});
		$elem.css({scrollTop: inc + parseInt($elem.css('scrollTop')) + 'px'});
		//$elem.scrollTop(3);//parseInt($(this).scrollTop()) + parseInt(inc));
		//console.log(this);
		var scA = $elem.scrollTop();
		scrollPos = scrollPos + 1;
		if (window.scrollPos == window.scrollIndicators.length)
		{
			window.scrollPos = 0;
		}
		$('.scroll-status').html('scrolling ' + window.scrollIndicators[window.scrollPos]
			+ '; delta = ' + delta
			+ ', evt.wheelDelta = ' + evt.originalEvent.wheelDelta
			+ ', evt.detail = ' + evt.originalEvent.detail
			+ ', scrollTop before = ' + scB
			+ ', inc = ' + inc
			+ ', scrollTop after = ' + scA
			+ ', scrollTop() + inc = ' + (parseInt($elem.scrollTop()) + parseInt(inc))
			);
		return false;
	});
}*/

$(function(){
	$('.styled-select').each(function() {
		initEAutoCustomDropdown($(this));
	});
	
	//$('body').prepend('<div class="scroll-status" style="height: 40px; min-height: 40px; border: 2px dashed red" />');
	
	//scrollPos = 0;
	//scrollindicator = ['/', '-', '\\', '|'];
	
	//if (false) {

	//assignEvents();
	
	//var $dd = $('.styled-select').data('dd');
	
	//} // false
	/*$('.ddTitle').on('click', function() {
		var $mw = $(this).parent().find('.dd-menu-wrap');
		var $ddc = $mw.parent().parent();
		var $ul = $ddc.find('ul');
		//var ulDisplay = $ul.css('display');
		//$ul.css({display:'hidden'});
		//var ulHeight = $ul.height();
		//$ul.css({display: ulDisplay});
		
		//$(this).parent().toggleClass('open');
		//console.log('ddc height = ' + ulHeight);
		$ddc.css({
			height: 'auto',
			'max-height': '10em'
			//'max-height': ulHeight + 'px'
		});
		$mw.css({
			height: $ddc.height() + 'px',
			'min-height': $ddc.height() + 'px'
		});
		
	});*/
});