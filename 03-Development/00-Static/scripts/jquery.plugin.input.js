//jQ input plugin

(function($){
    $.fn.input = function() {

        return this.each(function () {
            var $this = $(this),
                wrapper = $this.parent(),
                placeholder = wrapper.children('label'),
                input = $this.context,
                isPressed = false,
                isFocused = false,
                isHover = false;

            if (input.value.length > 0) {
                placeholder.addClass('noVisible');
            } else if (input.value.length === 0) {
                placeholder.removeClass('noVisible');
            }

            $this
//                hover
                .on('mouseenter', function() {
                    isHover = true;
                    wrapper.addClass('isHover');
                    placeholder.addClass('noVisible');
                })
                .on('mouseleave', function() {
                    isHover = false;
                    wrapper.removeClass('isHover');
                    if ((!isFocused) && (input.value.length === 0)) {
                        placeholder.removeClass('noVisible');
                    }
                })
//                focus
                .on('focus', function () {
                    isFocused = true;
                    wrapper.addClass('isFocused');
                    placeholder.addClass('noVisible');
                })
                .on('blur', function () {
                    isFocused = false;
                    wrapper.removeClass('isFocused').removeClass('isPressed');
                    if (input.value.length === 0) {
                        placeholder.removeClass('noVisible');
                    }
                });
        });
    };
})(jQuery);