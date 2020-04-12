//window.carouselInitFirstTime = true;

function initCarousel(showElements)
{
/*  CarouFredSel: a circular, responsive jQuery carousel.
	Configuration created by the "Configuration Robot"
	at caroufredsel.dev7studios.com
	*/
	
	/*if (!window.carouselInitFirstTime) return;
	
	window.carouselInitFirstTime = false;

	console.log('initCarousel()');*/
	
	if ($('.right-detail-nav-thumbs').length == 0)
	{
		return;
	}
	
	$('.right-detail-nav-thumbs').carouFredSel({
		auto: false,
		items: {
			visible: 4,
			start: 0
		}
	}, {
		//debug: true
	});
	$('.right-detail-nav-thumbs img').unbind('click').on('click', function(){
		var id = $(this).attr('id');
		/*var newid = 'p' + $(this).attr('id').substring(2);
		console.log('navigating from ' + id + ' to ' + newid);*/
		$('.right-detail-main').trigger('slideTo',
			[
				$('.right-detail-main img[id=p'
					+ id.substring(2)+']'),
				0
			]
		);
		/*$('.right-detail-nav-thumbs').trigger(
			'slideTo',
			[
				$('.right-detail-nav-thumbs img[id='
					+ id + ']'),
				-1
			]
		);*/
	});
	if (showElements)
	{
		$('#right-detail').css({'visibility': 'visible'});
	}
	$('.right-detail-nav-next')
		.off('click').on('click', function(){
		//$('.right-detail-main').trigger('next', {items: 1});
		$('.right-detail-nav-thumbs').trigger('next', {items: 1});
	});
	$('.right-detail-nav-prev')
		.off('click').on('click', function(){
		//$('.right-detail-main').trigger('prev', {items: 1});
		$('.right-detail-nav-thumbs').trigger('prev', {items: 1});
	});
	$('.right-detail-main').carouFredSel({
		width: "variable",
		height: "null",
		items: {
			visible: 1,
			start: 0
		},
		auto: false,
		responsive: true,
		/*prev: ".right-detail-nav-prev",
		next: ".right-detail-nav-next",*/
		scroll: {
			fx: 'crossfade',
			onBefore: function(data) {
				//window.alert('scroll.onBefore()');
				//console.log('onBefore '+data.items.visible.attr('id'));
				$('.right-detail-nav-thumbs').trigger(
					'slideTo',
					[
						$('.right-detail-nav-thumbs img[id=th'
							+data.items.visible.attr('id').substring(2)+']'),
						1
					]
				);
			}
		}
		/*pagination: {
			container: ".right-detail-nav-thumbs",
			anchorBuilder: function(nr) {
				//window.alert('anchorBuilder: nr='+nr);
				var src = $(this).attr('src');
				//console.log('matching '+src);
				var regex = /([0-9]{3})/;
				var result = regex.exec(src);
				//console.log(result);
				var id = 'th' + result[1];
					//src = src.replace('
				//window.alert('src='+src);
				return '<img src="' + src + '" id="' + id + '" />';
			}
		}*/
	}, {
		//debug: true
	});
	$('.right-detail-main-prev').off('click').on('click', function() {
		$('.right-detail-main').trigger('prev', {items: 1});
		var $item = $('.right-detail-nav-thumbs img[id=th'
			+ $('.right-detail-main img').eq(0).attr('id').substring(1) + ']');
		//console.log('sliding prev to: ');
		//console.log($item);
		$('.right-detail-nav-thumbs').trigger('slideTo', [$item, 'prev']);
	});
	$('.right-detail-main-next').off('click').on('click', function() {
		$('.right-detail-main').trigger('next', {items: 1});
		var $item = $('.right-detail-nav-thumbs img[id=th'
			+ $('.right-detail-main img').eq(0).attr('id').substring(1) + ']');
		//console.log('sliding next to: ');
		//console.log($item);
		$('.right-detail-nav-thumbs').trigger('slideTo', [$item, 'next']);
	});
}

function initMap(containerDivId, zoom, lat, lng)
{
	var map = new google.maps.Map($(containerDivId)[0],
		{
			zoom: zoom,
			center: new google.maps.LatLng(lat, lng),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			infoWindow: new google.maps.InfoWindow({
				content: ''
			})
		}
	);
	return map;
}

$(function(){
	initCarousel();
});
