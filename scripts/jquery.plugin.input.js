/**
 * jQ input plugin
 * $(id).input();
 */

(function($){
    var $d = $.$d,
        u,
        methods = {
            init: function() {

                return this.each(function () {
                    var $this = $(this),
                        wrapper = $this.parent(),
                        label = wrapper.parent().children('.text-label'),
                        trueInput = $this[0],
                        isPressed = false,
                        isFocused = false,
                        isHover = false,
                        isDisabled = false,
                        valueCache = trueInput.value,
                        interval;

                    $this.on({
        //                hover
                        mouseenter: function() {
                            if (!isDisabled){
                                isHover = true;
                                wrapper.addClass('isHover');
                            }
                        },
                        mouseleave: function() {
                            isHover = false;
                            wrapper.removeClass('isHover');
                        },
        //                focus
                        focus: function() {
                            if (!isDisabled){
                                isFocused = true;
                                wrapper.addClass('isFocused');
                            }
                        },
                        blur: function() {
                            isFocused = false;
                            wrapper.removeClass('isFocused').removeClass('isPressed');
                        }
                    });

                    if (label !== u) {
                        label.on({
                            click: function() {
                                $this.trigger('focus');
                            }
                        });
                    }

                    trueInput.setDisable = function(isDisable){
                        if (isDisable !== isDisabled){
                            if (isDisable){
                                trueInput.setAttribute('disabled', 'disabled');
                                wrapper.addClass('isDisabled')
                                    .removeClass('isPressed')
                                    .removeClass('isHover')
                                    .removeClass('isFocused');
                                isDisabled = true;
                            } else{
                                trueInput.removeAttribute('disabled');
                                wrapper.removeClass('isDisabled');
                                isDisabled = false;
                            }
                        }
                    };
//                    check default values

                    trueInput.setDisable((trueInput.disabled === true) || (trueInput.getAttribute('disabled') === 'disabled'));

                    interval = window.setInterval(function(){
                        if (valueCache !== trueInput.value){
                            valueCache = trueInput.value;
                            $this.trigger('__valueChange');
                        }
                    }, 10);

//                    for test
                    $this.bind('__valueChange', function () {
                        console.log('__valueChange');
                    } );
                })
            },

            disable: function(isDisable){
                return this.each(function() {
                    $(this)[0].setDisable(isDisable);
                });
            }
        };

    $.fn.input = function(method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            return methods.init.apply(this, arguments);
        }
    };
})(jQuery);