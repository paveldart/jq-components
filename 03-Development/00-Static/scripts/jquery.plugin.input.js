//jQ input plugin

(function($){
    $.fn.input = function() {

        return this.each(function () {
            var $this = $(this),
                wrapper = $this.parent(),
                isPressed = false,
                isFocused = false,
                isHover = false;

            $this
//                hover
                .on('mouseenter', function() {
                    isHover = true;
                    wrapper.addClass('isHover');
                })
                .on('mouseleave', function() {
                    isHover = false;
                    wrapper.removeClass('isHover');
                })
//                focus
                .on('focus', function() {
                    isFocused = true;
                    wrapper.addClass('isFocused');
                })
                .on('blur', function() {
                    isFocused = false;
                    wrapper.removeClass('isFocused').removeClass('isPressed');
                });
        });
    };

    function isDisable(obj) {
        $(obj).prop('disabled', true);

    }
})(jQuery);