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
                isHover = false,
                isKeyDown = false;

//            check default value
            if(trueCheckbox.disabled) {
                wrapper.addClass('isDisabled');
            }

            setInterval(function(){
                if (trueCheckbox.checked){
                    wrapper.addClass('isSelected');
                } else if (!trueCheckbox.checked) {
                    wrapper.removeClass('isSelected');
                }
            }, 0);

            wrapper.on({
//                touch
                touchstart: function(e) {
                    if (!trueCheckbox.disabled){
                        e.preventDefault();
                        isPressed = true;
                        wrapper.addClass('isPressed');
                    }
                },
                touchend: function(){
                    if (!trueCheckbox.disabled) {
                        wrapper.removeClass('isPressed');
                        isPressed = false;
                        if(!trueCheckbox.checked) {
                            trueCheckbox.checked = true;
                        } else if(trueCheckbox.checked) {
                            trueCheckbox.checked = false;
                        }
                    }
                },
//                pressed
                mousedown: function(e){
                    if (!trueCheckbox.disabled){
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
                    if (!trueCheckbox.disabled){
                        isHover = true;
                        wrapper.addClass('isHover');
                    }
                },
                mouseleave: function(){
                    isHover = false;
                    wrapper.removeClass('isHover');
                }
            });
//            focus (в 'on' не работает)
            $this.focus(function(){
                if (!trueCheckbox.disabled){
                    isFocused = true;
                    wrapper.addClass('isFocused');
                }
            });
            $this.blur(function(){
                wrapper.removeClass('isFocused');
                isFocused = false;
            });
//            click
            wrapper.toggle(function(){
                if (!trueCheckbox.disabled){
                    if (!trueCheckbox.checked){
                        trueCheckbox.checked = true;
                    } else if(trueCheckbox.checked) {
                        trueCheckbox.checked = false;
                    }
                    $this.focus();
                }
            },function() {
                if (!trueCheckbox.disabled){
                    if (trueCheckbox.checked){
                        trueCheckbox.checked = false;
                    } else if(!trueCheckbox.checked) {
                        trueCheckbox.checked = true;
                    }
                    $this.focus();
                }
            });

            function keyDown(e, code){
                if (code === 32){
                    e.preventDefault();
                    e.stopPropagation();
                    if (!trueCheckbox.checked) {
                        trueCheckbox.checked = true;
                        isKeyDown = true;
                    } else if (trueCheckbox.checked) {
                        trueCheckbox.checked = false;
                        isKeyDown = false;
                    }

                }
            }

//            todo test on opera and IE
            function operaKeyPress(e){
                keyDown(e, e.keyCode);
            }
            function fxKeyPress(e){
                keyDown(e, e.which);
            }
            function commonKeyDown(e){
                if ((e.keyCode == 9) && ($d.isIE && ($d.browserVersion < 9))){
                    if (!$this.disabled) {
                        wrapper.removeClass('isFocused').removeClass('isPressed');
                        isFocused = false;
                    }
                }
                keyDown(e, e.keyCode);
            }
            function keyUp(e){
                if ((e.keyCode == 13) || (e.keyCode == 32)){
                    e.preventDefault();
                    e.stopPropagation();
                    isKeyDown = false;
                    if (!isPressed){
                        wrapper.removeClass('isPressed');
                    } else if (!isHover){
                        wrapper.removeClass('isPressed');
                    }
                }
            }

            if ($d.isOpera){
                $this.on('keypress', operaKeyPress);
            }
            else if ($d.isFx){
                $this.on('keypress', fxKeyPress);
            } else{
                $this.on('keydown', commonKeyDown);
            }
            $this.on('keyup', keyUp);
        });
    };
})(jQuery);