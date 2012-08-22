/**
 * jQ button plugin
 *
 */
(function($){
    var $d = $().$d;

    $.fn._checkbox = function() {

        return this.each(function () {
            var $this = $(this),
                wrapper = $this.parent(),
                isPressed = false,
                isFocused = false,
                isHover = false;


            wrapper.on({
//                touch
//                touchstart: function(e) {
//                    // todo убрать проверку
//                    if ((!object.disabled) && (!object.getAttribute('data-disable'))){
//                        e.preventDefault();
//                        isPressed = true;
//                        if (!isFocused) {
//                            wrapper.focus();
//                        }
//                        wrapper.addClass('isPressed');
//                    }
//                },
//                touchend: function(){
//                    wrapper.removeClass('isPressed');
//                    isPressed = false;
//                },
//                hover
                mouseenter: function() {
                    isHover = true;
                    wrapper.addClass('isHover');
                },
                mouseleave: function() {
                    isHover = false;
                    wrapper.removeClass('isHover');
                },
//                focus
                focus: function() {
                    isFocused = true;
                    wrapper.addClass('isFocused');
                },
                blur: function(){
                    wrapper.removeClass('isFocused').removeClass('isPressed');
                    isFocused = false;
                }
            });
//            toggle
            wrapper.toggle(function() {
                wrapper.addClass('isActive');
            }, function(){
                wrapper.removeClass('isActive');
            });
        });
    };
})(jQuery);