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
                buttonDom = $this[0],
                form,
                action,
                code,
                eventAction,
                isPressed = false,
                isFocused = false,
                isHover = false,
                isDisabled = false,
                isKeyDown = false;

            if ($this[0].disabled) {
                wrapper.addClass('isDisabled');
            } else {
                wrapper.removeClass('isDisabled');
            }

            isDisabled = buttonDom.disabled;

            if ((buttonDom.tagName == 'A') && (buttonDom.href.length > 0)){
                if (buttonDom.target != '') {
                    action = function(){
                        window.open(buttonDom.href, buttonDom.target);
                    };
                }
                else if (buttonDom.target === '') {
                    action = function(){
                        window.location.href = buttonDom.href;
                    };
                }
            } else if((buttonDom.tagName == 'INPUT') && (buttonDom.type == 'submit')){
                form = $this.closest('form')[0];
                if (form !== undefined) {
                    action = function(){
                        form.submit();
                    }
                }
            } else {
                // todo action для кастомных событий jquery
//                action = $.Event('custom');
            }

            if (action !== undefined){
                wrapper.on({
                    click: action,
                    touchstart: action,
                    keypress: action
                });
            }

            function keyDown(e, code){
                if ((code == 13) || (code == 32)){
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
                    if (!buttonDom.disabled) {
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

            wrapper.on({
//                touch
                touchstart: function(e) {
                    // todo убрать проверку с этого уровня
                    if ((!buttonDom.disabled) && (!buttonDom.getAttribute('data-disable'))){
                        e.preventDefault();
                        isPressed = true;
                        wrapper.addClass('isPressed');
                    }
                },
                touchend: function(){
                    wrapper.removeClass('isPressed');
                    isPressed = false;
                },
//                hover
                mouseenter: function() {
                    if ((!buttonDom.disabled) && (!buttonDom.getAttribute('data-disable'))) {
                        isHover = true;
                        wrapper.addClass('isHover');
                    }
                },
                mouseleave: function() {
                    isHover = false;
                    wrapper.removeClass('isHover');
                },
//                pressed
                mousedown: function(e) {
                    if ((!buttonDom.disabled) && (!buttonDom.getAttribute('data-disable'))){
                        e.preventDefault();
                        isPressed = true;
                        wrapper.addClass('isPressed');
                        wrapper.mouseleave(function() {
                            wrapper.removeClass('isPressed');
                        });
                    }
                },
                mouseup: function() {
                    wrapper.removeClass('isPressed');
                    isPressed = false;
                },
//                focus
                focus: function() {
                    if ((!buttonDom.disabled) && (!buttonDom.getAttribute('data-disable')) && (!$d.isTouch)) {
                        isFocused = true;
                        wrapper.addClass('isFocused');
                    }
                },
                blur: function(){
                    wrapper.removeClass('isFocused').removeClass('isPressed');
                    isFocused = false;
                }
            });
            $this.on({
                focus: function() {
                    if ((!buttonDom.disabled) && (!$d.isTouch)) {
                        isFocused = true;
                        wrapper.addClass('isFocused');
                    }
                },
                blur: function(){
                    wrapper.removeClass('isFocused').removeClass('isPressed');
                    isFocused = false;
                }
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

    $.fn.setDisableButton = function(isDisable){
        var isDisabled;

        return this.each(function () {
            var $this = $(this),
                buttonDom = $(this)[0],
                wrapper = $this.parent();

            if(isDisable) {
                if (buttonDom.tagName == 'A') {
                    $this.attr('data-disable', 'true');
                } else {
                    $this.prop('disabled', true);
                }
                wrapper.addClass('isDisabled').removeClass('isPressed').removeClass('isHover').removeClass('isFocused');
                isDisabled = true;
            } else {
                if (buttonDom.tagName == 'A') {
                    buttonDom.removeAttribute('data-disable');
                } else {
                    $this.prop('disabled', false);
                }
                wrapper.removeClass('isDisabled');
                isDisabled = false;
            }
        });
    };
})(jQuery);