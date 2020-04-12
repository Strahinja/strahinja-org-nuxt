$.fn.toPx = function(settings){
    settings = jQuery.extend({
        scope: 'body'
    }, settings);
    var that = parseFloat(this[0]),
        scopeTest = jQuery('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo(settings.scope),
        scopeVal = scopeTest.height();
    scopeTest.remove();
    return Math.round(that * scopeVal) + 'px';
};

$(document).ready(function(){

	var playButtonWidth = 170;
	var playButtonIconWidth = 70;
	var fillerDelay = 50;
	var moreDelay = 150;

	window.indexPageAdditionalFiltersHeight = $('.index-page-filter-row').height()
		* ($('#index-page-additional-filters').children('.index-page-filter-row').length);
	/*window.alert('window.indexPageAdditionalFiltersHeight ['
		+ window.indexPageAdditionalFiltersHeight
		+ '] = parseInt($(1.8).toPx() ['
		+ $(1.8).toPx()
		+ ']) ['
		+ parseInt($(1.8).toPx())
		+ '] * ($(\'#index-page-additional-filters\').children(\'.index-page-filter-row\').length ['
		+ ($('#index-page-additional-filters').children('.index-page-filter-row').length)
		+ ']) px'
	);*/
	$('#index-page-filters-control a').off('click').on('click', function(evt){
		var $elem = $(this).parent();
		var $additional = $('#index-page-additional-filters');
		var $filler = $('#index-page-filler-text');
		var more = $elem.hasClass('more');
		if (more)
		{
			$elem.removeClass('more');
			$filler.animate({
				opacity: '0.0'
			}, fillerDelay, function(){
				$filler.removeClass('visible');
				$additional.addClass('visible');
				$additional.css({
					'min-height': 0,
					'height' : 0
				});
				$additional.animate({
					'min-height': window.indexPageAdditionalFiltersHeight + 'px',
					'height': window.indexPageAdditionalFiltersHeight + 'px'
				}, moreDelay, function(){
					$elem
						.find('.index-page-filters-control-text').text('manje filtera').end()
						.find('.arrow').addClass('left').removeClass('right')
						;
				});
			});
		}
		else
		{
			$elem.addClass('more');
			$elem
				.find('.index-page-filters-control-text').text('jos filtera').end()
				.find('.arrow').removeClass('left').addClass('right');
			$additional.animate({
				'min-height': 0,
				'height': 0
			}, moreDelay, function(){
				$('#index-page-filters-control').animate({
					'margin-top': 0//'-' + window.indexPageAdditionalFiltersHeight + 'px'
				}, moreDelay);
				$additional.removeClass('visible');
				$filler.addClass('visible').animate({
					opacity: '1.0'
				}, fillerDelay);
			});
		}
		evt.preventDefault();
	});
	$('.index-picture').off('mouseover').on('mouseover', function(evt) {
		evt.stopPropagation();
		var $elem = $(this).find('.index-picture-play');
		console.log('.index-picture.hoverOn');
		$elem
			.stop().find('.index-picture-play-text').stop().end()
			.animate({
				width: '' + playButtonWidth + 'px',
				'min-width': '' + playButtonWidth + 'px'
			}, 200)
			.find('.index-picture-play-text').animate({
				width: '' + (playButtonWidth - playButtonIconWidth) + 'px',
				'min-width': '' + (playButtonWidth - playButtonIconWidth) + 'px'
			}, 200);
		return false;
	});
	$('.index-picture').off('mouseout').on('mouseout', function(evt) {
		evt.stopPropagation();
		var $elem= $(this).find('.index-picture-play');
		console.log('.index-picture.hoverOff');
		$elem
			.stop().find('.index-picture-play-text').stop().end()
			.find('.index-picture-play-text').animate({
				width: 0,
				'min-width': 0
			}, 200).end()
			.animate({
				width: '' + playButtonIconWidth + 'px',
				'min-width': '' + playButtonIconWidth + 'px'
			}, 200);
		return false;
	});
	
	$('.index-picture').off('click').on('click', function() {
		$('.popup,.popup-background').addClass('active');
	});
	$('.popup-background,.btn.close').off('click').on('click', function() {
		$('.popup,.popup-background').removeClass('active');
	});
	/*$(window).off('resize').on('resize', function(){
		$('#footer-wrapper').
	});*/
});
