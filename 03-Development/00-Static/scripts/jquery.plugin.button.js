//jQ button plugin

(function($){
    var $d = $().$d;

    $.fn.button = function() {
        var isPressed = false,
            isFocused = false,
            isHover = false,
            isDisabledCache = false,
            isKeyDown = false;

        return this.each(function (isPressed, isFocused, isHover, isKeyDown) {
            var $this = $(this);

            function blur(){
                $this.removeClass('isFocused').removeClass('isPressed');
                isPressed = isKeyDown = isFocused = false;
            }

//            todo не использован disable
            function disabled(isDisabled){
                isDisabledCache = isDisabled;
                if (isDisabled){
                    blur();
                    $this.addClass('isDisabled');
                } else{
                    $this.removeClass('isDisabled');
                }
            }
            function keyDown(e, code){
                if (!isDisabledCache && ((code == 13) || (code == 32))){
                    e.preventDefault();
                    e.stopPropagation();
                    isKeyDown = true;
                    $this.addClass('isPressed');
                }
            }

            function operaKeyPress(e){
                keyDown(e, e.keyCode);
            }
            function fxKeyPress(e){
                keyDown(e, e.which);
            }
            function commonKeyDown(e){
                if ((e.keyCode == 9) && ($d.isIE && ($d.browserVersion < 9))){
                    blur();
                }
                keyDown(e, e.keyCode);
            }
            function keyUp(e){
                if ((e.keyCode == 13) || (e.keyCode == 32)){
                    e.preventDefault();
                    e.stopPropagation();
                    isKeyDown = false;
                    if (!isDisabledCache && !isPressed){
                        $this.removeClass('isPressed');
                    } else if (!isDisabledCache && !isHover){
                        $this.removeClass('isPressed');
                    }
                }
            }


            $this
//                touch
                .bind('touchstart', function(e) {
                    e.preventDefault();
                    isPressed = true;
                    if (!isFocused) {
                        $this.focus();
                    }
                    $this.addClass('isPressed');
                })
                .bind('touchend', function(){
                    $this.removeClass('isPressed');
                    isPressed = false;
                })
//                hover
                .bind('mouseenter', function() {
                    isHover = true;
                    $this.addClass('isHover');
                })
                .bind('mouseleave', function() {
                    isHover = false;
                    $this.removeClass('isHover');
                })
//                pressed
                .bind('mousedown', function(e) {
                    e.preventDefault();
                    isPressed = true;
                    $this.addClass('isPressed');
                    $this.mouseleave(function() {
                        $this.removeClass('isPressed');
                    });
                })
                .bind('mouseup', function() {
                    $this.removeClass('isPressed');
                    isPressed = false;
                })
//                focus
                .bind('focus', function () {
                    isFocused = true;
                    $this.addClass('isFocused');
                })
                .bind('blur', blur);
//                keypress/keyup
            if ($d.isOpera){
                $this.bind('keypress', operaKeyPress);
            }
            else if ($d.isFx){
                $this.bind('keypress', fxKeyPress);
            } else{
                $this.bind('keydown', commonKeyDown);
            }
            $this.bind('keyup', keyUp);

        });
    };
})(jQuery);