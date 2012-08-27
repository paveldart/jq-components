/**
 * jQ button plugin
 *
 */
(function($){
    var $d = $().$d;

    $.fn.radiobutton = function() {

        return this.each(function () {
            var $this = $(this),
                wrapper = $this.parent(),
                isPressed = false,
                isFocused = false,
                isHover = false;


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
//            toggle
            wrapper.toggle(function() {
                wrapper.addClass('isSelected');
            }, function(){
                wrapper.removeClass('isSelected');
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