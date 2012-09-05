/**
 * jQ radiobutton plugin
 * $(id).radiobutton();
 */

(function($){

    $.fn.radiobutton = function() {

        return this.each(function(){
            var $this = $(this),
                wrapper = $this.parent(),
                trueRadio = $this[0],
                isPressed = false,
                isFocused = false,
                isHover = false;

//            check default value
            if (trueRadio.disabled) {
                wrapper.addClass('isDisabled');
            }

            setInterval(function(){
                if (!trueRadio.disabled){
                    if (trueRadio.checked){
                        wrapper.siblings('.jsVisualRadio').removeClass('isSelected').removeClass('isFocused');
                        wrapper.addClass('isSelected');
                    }

                }
            }, 0);

            wrapper.on({
//                touch
                touchstart: function(e){
                    if (!trueRadio.disabled){
                        e.preventDefault();
                        isPressed = true;
                        wrapper.addClass('isPressed');
                    }
                },
                touchend: function(){
                    if (!trueRadio.disabled){
                        wrapper.removeClass('isPressed');
                        isPressed = false;
                        $this.focus();
                        trueRadio.checked = true;
                    }
                },
//                pressed
                mousedown: function(e){
                    if (!trueRadio.disabled){
                        e.preventDefault();
                        isPressed = true;
                        wrapper.addClass('isPressed');
                        wrapper.mouseleave(function() {
                            wrapper.removeClass('isPressed');
                        });
                    }
                },
                mouseup: function(){
                    wrapper.removeClass('isPressed');
                    isPressed = false;
                },
//                hover
                mouseenter: function(){
                    if (!trueRadio.disabled){
                        isHover = true;
                        wrapper.addClass('isHover');
                    }
                },
                mouseleave: function(){
                    isHover = false;
                    wrapper.removeClass('isHover');
                }
            });
//            click
            wrapper.click(function(){
                if((!trueRadio.checked) && (!trueRadio.disabled)){
                    $this.focus();
                    trueRadio.checked = true;
                }
            });
//            focus (в 'on' не работает)
            $this.focus(function(){
                if (!trueRadio.disabled){
                    isFocused = true;
                    wrapper.siblings('.jsVisualRadio').removeClass('isSelected');
                    wrapper.addClass('isSelected').addClass('isFocused');
                }
            });
            $this.blur(function(){
                wrapper.removeClass('isFocused');
                isFocused = false;
            });
        });
    };
})(jQuery);