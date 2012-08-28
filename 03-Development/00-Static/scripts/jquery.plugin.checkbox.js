/**
 * jQ checkbox plugin
 * $(id).ischeckbox();
 */

(function($){
    var $d = $().$d;

    $.fn.ischeckbox = function() {

        return this.each(function () {
            var $this = $(this),
                wrapper = $this.parent(),
                trueCheckbox = $this[0],
                isPressed = false,
                isFocused = false,
                isHover = false;

//            check default value
            if(trueCheckbox.checked) {
                wrapper.addClass('isSelected');
            }

            wrapper.on({
//                touch
                touchstart: function(e) {
                    e.preventDefault();
                    isPressed = true;
                    wrapper.addClass('isPressed');
                },
                touchend: function(){
                    wrapper.removeClass('isPressed');
                    isPressed = false;
                    if(!trueCheckbox.checked) {
                        wrapper.addClass('isSelected');
                        trueCheckbox.checked = true;
                    } else {
                        wrapper.removeClass('isSelected');
                        trueCheckbox.checked = false;
                    }
                },
//                pressed
                mousedown: function(e) {
                    e.preventDefault();
                    isPressed = true;
                    wrapper.addClass('isPressed');
                    wrapper.mouseleave(function() {
                        wrapper.removeClass('isPressed');
                    });
                },
                mouseup: function() {
                    wrapper.removeClass('isPressed');
                    isPressed = false;
                },
//                hover
                mouseenter: function() {
                    isHover = true;
                    wrapper.addClass('isHover');
                },
                mouseleave: function() {
                    isHover = false;
                    wrapper.removeClass('isHover');
                }
            });
//            click
            wrapper.click(function() {
                if(!trueCheckbox.checked) {
                    wrapper.addClass('isSelected');
                    trueCheckbox.checked = true;
                } else {
                    wrapper.removeClass('isSelected');
                    trueCheckbox.checked = false;
                }
            });
//            focus (в 'on' не работает)
            $this.focus(function() {
                isFocused = true;
                wrapper.addClass('isFocused');
            });
            $this.blur(function() {
                wrapper.removeClass('isFocused');
                isFocused = false;
            });
        });
    };
})(jQuery);