/**
 * jQ button plugin
 * $(id).button();
 * @param {String} method name (default - init)
 */

(function($){
    var $d = $().$d,
        methods = {
            init: function() {

                return this.each(function() {
                    var $this = $(this), // realInput
                        wrapper = $this.parent(), //visualInput
                        buttonDom = $this[0],
                        form,
                        action,
                        eventAction,
                        isPressed = false,
                        isFocused = false,
                        isHover = false,
                        isDisabled = false,
                        isKeyDown = false;

//                    check default values
                    if (buttonDom.disabled || (buttonDom.getAttribute('disabled') === 'disabled')) {
                        wrapper.addClass('isDisabled');
                        blur();
                        isDisabled = false;
                    } else {
                        wrapper.removeClass('isDisabled');
                        isDisabled = true;
                    }

//                    action
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
                    function removePress(){
                        if (!isKeyDown){
                            wrapper.removeClass('isPressed');
                        }
                    }

//                    key-function
                    function keyDown(e, code){
                        if ((code == 13) || (code == 32)){
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
                        if ((e.keyCode == 9) && ($d.isIE && ($d.browserVersion < 9))){
                            if (buttonDom.getAttribute('disabled') !== 'disabled') {
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

//                    for touch
                        wrapper.on('touchstart', function(e){
                            e.preventDefault();
                            if (buttonDom.getAttribute('disabled') !== 'disabled'){
                                isPressed = true;
                                if (!isFocused){
                                    $this.focus();
                                }
                                wrapper.addClass( 'isPressed');
                            }
                        });
                        $(window.document).on('touchend', function(e){
                            if ((buttonDom.getAttribute('disabled') !== 'disabled') && isPressed){
                                isPressed = false;
                                removePress();
                                action(e);
                            }
                        });

                    } else{

//                     for mouse
                        wrapper.on({
                            mousedown: function(e){
                                e.preventDefault();
                                if ((buttonDom.getAttribute('disabled') !== 'disabled') && (e.button != 2)){
                                    isPressed = true;
                                    if (!isFocused){
                                        $this.focus();
                                    }
                                    wrapper.addClass('isPressed');
                                }
                            },
                            mouseup: function(e){
                                if ((buttonDom.getAttribute('disabled') !== 'disabled') && (e.button != 2)){
                                    isPressed = false;
                                    if (!isKeyDown){
                                        removePress();
                                        action(e);
                                    }
                                }
                            }
                        });

                        $(window.document).on('mouseup', function(){
                            isPressed = false;
                        });
//                     hover
                        wrapper.on({
                            mouseenter: function() {
                                if (buttonDom.getAttribute('disabled') !== 'disabled') {
                                    wrapper.addClass('isHover');
                                    isHover = true;
                                }
                            },
                            mouseleave: function() {
                                wrapper.removeClass('isHover');
                                isHover = false;
                            }
                        });
                    }

                    $this.on('focus', focus);
                    $this.on('blur', function (){
                        if ($d.isIE && ($d.browserVersion < 9) && isHover){
                            $this.focus();
                            return false;
                        }
                        blur();
                    });
                });
            },

            disable: function(isDisable){
                return this.each(function() {
                    var $this = $(this),
                        buttonDom = $(this)[0],
                        wrapper = $this.parent();

                    function disabled(isDisable){
                        if (isDisable){
                            buttonDom.setAttribute('disabled', 'disabled');
                            wrapper.addClass('isDisabled')
                                   .removeClass('isPressed')
                                   .removeClass('isHover')
                                   .removeClass('isFocused');
                        } else{
                            buttonDom.removeAttribute('disabled');
                            wrapper.removeClass('isDisabled');
                        }
                    }

                    disabled(isDisable);
                });
            }
        };

    $.fn.button = function(method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            // error
        }
    };
})(jQuery);