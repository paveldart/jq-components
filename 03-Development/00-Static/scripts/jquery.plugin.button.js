/**
 * jQ button plugin
 *
 */
(function($){
    var $d = $().$d;

    $.fn.button = function() {

        return this.each(function () {
            var $this = $(this),
                wrapper = $this.parent(),
                object = $this[0],
                form,
                code,
                isPressed = false,
                isFocused = false,
                isHover = false,
                isDisabled = false,
                isDisabledCache = false,
                isKeyDown = false;

            if ($this[0].disabled) {
                wrapper.addClass('isDisabled');
            } else {
                wrapper.removeClass('isDisabled');
            }

            isDisabled = $this[0].disabled;

            if ((object.tagName == 'A') && (object.href.length > 0)){
                if (object.target != '') {
                    wrapper.on('click', function(){
                        window.open(object.href, object.target);
                    });
                }
                else if (object.target === '') {
                    wrapper.on('click', function(){
                        window.location.href = object.href;
                    });
                }
            } else if((object.tagName == 'INPUT') && (object.type == 'submit')){
                form = $this.closest('form')[0];
                if (form !== undefined) {
                    wrapper.on('click', function(){
                        form.submit();
                    });
                }
            }

            function blur(){
                wrapper.removeClass('isFocused').removeClass('isPressed');
                isPressed = isKeyDown = isFocused = false;
            }

            function keyDown(e, code){
                if (!isDisabledCache && ((code == 13) || (code == 32))){
                    e.preventDefault();
                    e.stopPropagation();
                    isKeyDown = true;
                    wrapper.addClass('isPressed');
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
                        wrapper.removeClass('isPressed');
                    } else if (!isDisabledCache && !isHover){
                        wrapper.removeClass('isPressed');
                    }
                }
            }


            wrapper.on({
//                touch
                touchstart: function(e) {
                    // todo убрать проверку
                    if (!$this[0].disabled) {
                        e.preventDefault();
                        isPressed = true;
                        if (!isFocused) {
                            wrapper.focus();
                        }
                        wrapper.addClass('isPressed');
                    }
                },
                touchend: function(){
                    if (!$this[0].disabled) {
                        wrapper.removeClass('isPressed');
                        isPressed = false;
                    }
                },
//                hover
                mouseenter: function() {
                    if (!$this[0].disabled) {
                        isHover = true;
                        wrapper.addClass('isHover');
                    }
                },
                mouseleave: function() {
                    if (!$this[0].disabled) {
                        isHover = false;
                        wrapper.removeClass('isHover');
                    }
                },
//                pressed
                mousedown: function(e) {
                    if (!$this[0].disabled) {
                        e.preventDefault();
                        isPressed = true;
                        wrapper.addClass('isPressed');
                        wrapper.mouseleave(function() {
                            wrapper.removeClass('isPressed');
                        });
                    }
                },
                mouseup: function() {
                    if (!$this[0].disabled) {
                        wrapper.removeClass('isPressed');
                        isPressed = false;
                    }
                },
//                focus
                focus: function () {
                    if (!$this[0].disabled) {
                        isFocused = true;
                        wrapper.addClass('isFocused');
                    }
                },
                blur: blur
            });
            $this.on({
                focus: function () {
                    if (!$this[0].disabled) {
                        isFocused = true;
                        wrapper.addClass('isFocused');
                    }
                },
                blur: blur
            });
//                keypress/keyup
            if ($d.isOpera){
                wrapper.on('keypress', operaKeyPress);
            }
            else if ($d.isFx){
                wrapper.on('keypress', fxKeyPress);
            } else{
                wrapper.on('keydown', commonKeyDown);
            }
            wrapper.on('keyup', keyUp);

        });
    };

    $.fn.setDisable = function(params){
        var isDisabled;


        return this.each(function () {
            var $this = $(this),
                wrapper = $this.parent();

            if(params) {
                $this.prop('disabled', true);
                wrapper.addClass('isDisabled');
                isDisabled = true;

            } else {
                $this.prop('disabled', false);
                wrapper.removeClass('isDisabled');
                isDisabled = false;
            }
        });
    };
})(jQuery);