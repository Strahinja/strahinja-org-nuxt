//window.carouselInitFirstTime = true;

function imagePopup(showElements)
{
	$('.info-nav-thumbs').carouFredSel({
		auto: false,
		items: {
			visible: 4,
			start: 0
		}
	});
	$('.info-nav-thumbs img').off('click').on('click', function(){
		var id = $(this).attr('id');
		$('.info-main').trigger('slideTo',
			[
				$('.info-main img[id=p'
					+ id.substring(2)+']'),
				0
			]
		);
	});
	if (showElements)
	{
		//$('#info').css({'visibility': 'visible'});
	}
	$('.info-nav-next')
		.off('click').on('click', function(){
		//$('.info-main').trigger('next', {items: 1});
		$('.info-nav-thumbs').trigger('next', {items: 1});
	});
	$('.info-nav-prev')
		.off('click').on('click', function(){
		//$('.info-main').trigger('prev', {items: 1});
		$('.info-nav-thumbs').trigger('prev', {items: 1});
	});
	$('.info-main').carouFredSel({
		//width: "variable",
		height: "null",
		items: {
			//width: 'variable',
			visible: 1,
			start: 0
		},
		auto: false,
		responsive: true,
		scroll: {
			//duration: 3000,
			fx: 'crossfade',
			//easing: 'linear',
			onBefore: function(data) {
				$('.info-nav-thumbs').trigger(
					'slideTo',
					[
						$('.info-nav-thumbs img[id=th'
							+data.items.visible.attr('id').substring(2)+']'),
						1
					]
				);
			}
		}
	});
	$('.info-main-prev').off('click').on('click', function() {
		$('.info-main').trigger('prev', {items: 1});
		var $item = $('.info-nav-thumbs img[id=th'
			+ $('.info-main img').eq(0).attr('id').substring(1) + ']');
		$('.info-nav-thumbs').trigger(
			'slideTo',
			[$item],
			1
		);
	});
	$('.info-main-next').off('click').on('click', function() {
		$('.info-main').trigger('next', {items: 1});
		var $item = $('.info-nav-thumbs img[id=th'
			+ $('.info-main img').eq(0).attr('id').substring(1) + ']');
		$('.info-nav-thumbs').trigger(
			'slideTo',
			[$item],
			1
		);
	});
}

/*$(function(){
	initCarousel();
});*/