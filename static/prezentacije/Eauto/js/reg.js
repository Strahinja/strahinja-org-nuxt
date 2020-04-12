function RegistrationApp()
{
	this.subtypesRevealDelay = 300;
	this.subtypeCheckboxHeight = 25;
}

RegistrationApp.prototype.init = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	$('.spaced-out .dd,.spaced-out input[type="text"],'
		+ '.spaced-out input[type="checkbox"] + label.inline').each(function() {
			$(this)
				.wrap('<span class="wrapper">')
				.parent()
				.append('&nbsp;');
	});
	
	self = null;
}

RegistrationApp.prototype.initEvents = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	$(document).off('change', 'input:radio[id^=company-unit-type]');
	$(document).on('change', 'input:radio[id^=company-unit-type]', $.proxy(function(evt) {
		//var $target = $(evt.target).prop('type') == 'radio' ? $(evt.target) : $(evt.target).closest('radio');
		//var $subtypes = $target.closest('p').next();
		//var $activesubtypes = $('.company-unit-subtypes.active');
		
		//$(evt.target).closest('p').next()
		
		var wasActive = $(evt.target).closest('p').next().hasClass('active');
		
		$.when(
			$('.company-unit-subtypes.active').not($(evt.target).closest('p').next()).animate({
				height: 0,
				opacity: '0.0'
			}, this.subtypesRevealDelay, function() {
				$(this).removeClass('active');
				$(this).css({
					height: '',
					opacity: ''
				});
			})
		).done($.proxy(function() {
			/*if (wasActive)
			{
				$(evt.target).closest('p').next().animate({
					height: 0,
					opacity: '0.0'
				}, this.subtypesRevealDelay, $.proxy(function() {
					$(evt.target).closest('p').next().removeClass('active');
					$(evt.target).closest('p').next().css({
						height: '',
						opacity: ''
					});
				}, this));
			}
			else
			{*/
				var subtypesHeight = $(evt.target).closest('p').next().children('p').length * this.subtypeCheckboxHeight;
				$(evt.target).closest('p').next('.company-unit-subtypes').css({
					height: 0,
					opacity: '0.0'
				}).addClass('active');
				$(evt.target).closest('p').next('.company-unit-subtypes').animate({
					height: subtypesHeight + 'px',
					opacity: '1.0'
				}, this.subtypesRevealDelay, $.proxy(function() {
					$(evt.target).closest('p').next('.company-unit-subtypes').css({
						height: '',
						opacity: ''
					});
				}, this));
			//}
		}, this));
		
	}, self));
	
	self = null;
}

$(document).ready(function(){
	var registration = new RegistrationApp();
	registration.init(registration);
	registration.initEvents(registration);
});
