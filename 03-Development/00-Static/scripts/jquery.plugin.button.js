/**
 * jQ button plugin
 * $(id).button();
 * @param {String} method name (default - init)
 */

(function($){
    var $d = $().$d,
        u,
        methods = {
            init: function() {

                return this.each(function() {
                    var $this = $(this),
                        realButton = $this[0],
                        visualButton = $this.parent('.jsVisualButton'),
                        wrapper,
                        form,
                        action,
                        eventAction,
                        isPressed = false,
                        isFocused = false,
                        isHover = false,
                        isDisabled = false,
                        isKeyDown = false;

//                    wrapper search
                    if (visualButton.parents('.jsButtonWrapper')[0] !== u) {
                        wrapper = visualButton.parents('.jsButtonWrapper')[0];
                        wrapper = $(wrapper);
                    } else {
                        wrapper = visualButton;
                    }

//                    check default values
                    if (realButton.disabled || realButton.isDisabled) {
                        wrapper.addClass('isDisabled');
                        blur();
                        isDisabled = false;
                    } else {
                        wrapper.removeClass('isDisabled');
                        isDisabled = true;
                    }

//                    action
                    if ((realButton.tagName === 'A') && (realButton.href.length > 0)){
                        if (realButton.target !== '') {
                            action = function(){
                                window.open(realButton.href, realButton.target);
                            };
                        }
                        else if (realButton.target === '') {
                            action = function(){
                                window.location.href = realButton.href;
                            };
                        }
                    } else if((realButton.tagName === 'INPUT') && (realButton.type === 'submit')){
                        form = $this.closest('form')[0];
                        if (form !== u) {
                            action = function(){
                                form.submit();
                            }
                        }
                    } else {
                        action = function(){
                            eventAction = $.Event('click');
                            $this.trigger(eventAction);
                        }
                    }

//                    events
                    function focus(){
                        wrapper.addClass('isFocused');
                        isFocused = true;
                    }
                    function blur(){
                        wrapper.blur();
                        wrapper.removeClass('isFocused')
                               .removeClass('isPressed');
                        isPressed = isKeyDown = isFocused = false;
                    }
                    function commonBlur(){
                        if ($d.isOldIE && isHover){
                            $this.focus();
                            return false;
                        }
                        blur();
                    }
                    function removePress(){
                        if (!isKeyDown){
                            wrapper.removeClass('isPressed');
                        }
                    }

//                    touch function
                    function touchStart(e){
                        e.preventDefault();
                        if (!realButton.isDisabled){
                            isPressed = true;
                            if (!isFocused){
                                $this.focus();
                            }
                            wrapper.addClass( 'isPressed');
                        }
                    }
                    function touchEnd(e){
                        if (!realButton.isDisabled && isPressed){
                            isPressed = false;
                            removePress();
                            action(e);
                        }
                    }

//                    mouse function
                    function mouseDown(e){
                        e.preventDefault();
                        if (!realButton.isDisabled && (e.button !== 2)){
                            isPressed = true;
                            if (!isFocused){
                                $this.focus();
                            }
                            wrapper.addClass('isPressed');
                        }
                    }
                    function mouseUp(e){
                        if (!realButton.isDisabled && (e.button !== 2)){
                            isPressed = false;
                            if (!isKeyDown){
                                removePress();
                                action(e);
                            }
                        }
                    }
                    function documentMouseUp(){
                        removePress();
                        isPressed = false;
                    }

                    function mouseEnter(){
                        if (!realButton.isDisabled) {
                            wrapper.addClass('isHover');
                            isHover = true;
                        }
                    }
                    function mouseLeave(){
                        wrapper.removeClass('isHover');
                        isHover = false;
                    }

//                    key-function
                    function keyDown(e, code){
                        if ((code === 13) || (code === 32)){
                            e.preventDefault();
                            e.stopPropagation();
                            isKeyDown = true;
                            wrapper.addClass('isPressed');
                            action();
                        }
                    }
                    function operaKeyPress(e){
                        keyDown(e, e.keyCode);
                    }
                    function fxKeyPress(e){
                        keyDown(e, e.which);
                    }
                    function commonKeyDown(e){
                        if ((e.keyCode === 9) && $d.isOldIE){
                            if (!realButton.isDisabled) {
                                wrapper.removeClass('isFocused').removeClass('isPressed');
                                isFocused = false;
                            }
                        }
                        keyDown(e, e.keyCode);
                    }
                    function keyUp(e){
                        if ((e.keyCode === 13) || (e.keyCode === 32)){
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

//                    keypress/keyup
                    if ($d.isOpera){
                        wrapper.on('keypress', operaKeyPress);
                    }
                    else if ($d.isFx){
                        wrapper.on('keypress', fxKeyPress);
                    } else{
                        wrapper.on('keydown', commonKeyDown);
                    }
                    wrapper.on('keyup', keyUp);

                    if ($d.isTouch){
//                        for touch
                        wrapper.on('touchstart', touchStart);
                        $(document).on('touchend', touchEnd);

                    } else{
//                       for mouse
                        wrapper.on('mousedown', mouseDown);
                        wrapper.on('mouseup', mouseUp);
                        $(document).on('mouseup', documentMouseUp);

//                        hover
                        wrapper.on('mouseenter', mouseEnter);
                        wrapper.on('mouseleave', mouseLeave);
                    }

                    $this.on('focus', focus);
                    $this.on('blur', commonBlur);
                });
            },

            disable: function(isDisable){
                return this.each(function() {
                    var $this = $(this),
                        realButton = $this[0],
                        visualButton = $this.parent('.jsVisualButton'),
                        wrapper,
                        isDisabled = false;

//                    wrapper search
                    if (visualButton.parents('.jsButtonWrapper')[0] !== u) {
                        wrapper = visualButton.parents('.jsButtonWrapper')[0];
                        wrapper = $(wrapper);
                    } else {
                        wrapper = visualButton;
                    }

                    function disabled(isDisable){
                        if (isDisable){
                            realButton.setAttribute('disabled', 'disabled');
                            wrapper.addClass('isDisabled')
                                   .removeClass('isPressed')
                                   .removeClass('isHover')
                                   .removeClass('isFocused');
                            isDisabled = true;
                        } else{
                            realButton.removeAttribute('disabled');
                            wrapper.removeClass('isDisabled');
                            isDisabled = false;
                        }
                        realButton.isDisabled = isDisabled;
                    }

                    disabled(isDisable);
                });
            }
        };

    $.fn.button = function(method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            return methods.init.apply(this, arguments);
        }
    };
})(jQuery);