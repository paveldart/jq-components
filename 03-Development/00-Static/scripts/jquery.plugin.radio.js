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
            if(trueRadio.checked) {
                wrapper.addClass('isSelected');
            }
            if(trueRadio.disabled) {
                wrapper.addClass('isDisabled');
            }

            wrapper.on({
//                touch
                touchstart: function(e) {
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
                        wrapper.siblings().removeClass('isSelected');
                        wrapper.addClass('isSelected');
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
                    wrapper.siblings().removeClass('isSelected').removeClass('isFocused');
                    wrapper.addClass('isSelected').addClass('isFocused');
                    trueRadio.checked = true;
                }
            });
//            focus (в 'on' не работает)
            $this.focus(function(){
                if (!trueRadio.disabled){
                    isFocused = true;
                    wrapper.siblings().removeClass('isSelected');
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