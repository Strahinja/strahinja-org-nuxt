$.fn.togglePlaceholder = function() {
    return this.each(function() {
        $(this)
        .data("holder", $(this).prop("placeholder"))
        .on('focusin', function(){
            $(this).prop('placeholder','');
        })
        .on('focusout', function(){
            $(this).prop('placeholder',$(this).data('holder'));
        });
    });
};

$(function(){
	/*$('.sumbit-link').on('click', function(){
		$(this).parent().submit();
	});*/
	$('input[type="text"],input[type="password"],textarea').togglePlaceholder();
});