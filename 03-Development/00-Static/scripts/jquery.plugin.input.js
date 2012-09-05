/**
 * jQ input plugin
 * $(id).input();
 */

(function($){
    $.fn.input = function() {

        return this.each(function () {
            var $this = $(this),
                wrapper = $this.parent(),
                trueInput = $this[0],
                isPressed = false,
                isFocused = false,
                isHover = false;

            $this.on({
//                hover
                mouseenter: function() {
                    if (!trueInput.disabled){
                        isHover = true;
                        wrapper.addClass('isHover');
                    }
                },
                mouseleave: function() {
                    isHover = false;
                    wrapper.removeClass('isHover');
                },
//                focus
                focus: function() {
                    if (!trueInput.disabled){
                        isFocused = true;
                        wrapper.addClass('isFocused');
                    }
                },
                blur: function() {
                    isFocused = false;
                    wrapper.removeClass('isFocused').removeClass('isPressed');
                }
            });
//
        });
    };

    $.fn.setDisable = function(isDisable){
        var isDisabled;

        return this.each(function () {
            var $this = $(this),
                wrapper = $this.parent();

            if(isDisable) {
                $this.prop('disabled', true);
                wrapper.addClass('isDisabled').removeClass('isPressed').removeClass('isHover').removeClass('isFocused');
                isDisabled = true;
            } else {
                $this.prop('disabled', false);
                wrapper.removeClass('isDisabled');
                isDisabled = false;
            }


        });
    };
})(jQuery);