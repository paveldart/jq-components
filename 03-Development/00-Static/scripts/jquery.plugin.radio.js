/**
 * jQ radiobutton plugin
 * $(id).radiobutton();
 */

(function($){
    var $d = $().$d;

    $.fn.radiobutton = function() {
        var $this = $(this),
            length = $this.length,
            cacheLength = length,
            wrappers = {};

        for (;length--;) {
            wrappers[length] = $this[length].parentElement;
        }
        length = cacheLength;

//        remove class 'isSelected'
        function removeClassName(){
            for (;length--;) {
                wrappers[length].className = wrappers[length].className.replace( /(?:^|\s)isSelected(?!\S)/g , '' );

            }
            length = cacheLength;
        }

        return this.each(function(i, object){
            var $this = $(this),
                wrapper = $this.parent(),
                trueRadio = $this[0],
                isPressed = false,
                isFocused = false,
                isHover = false;

//            check default value
            if(trueRadio.checked) {
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
                    removeClassName();
                    wrapper.addClass('isSelected');
                    trueRadio.checked = true;
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
                if(!trueRadio.checked) {
                    removeClassName();
                    wrapper.addClass('isSelected');
                    trueRadio.checked = true;
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