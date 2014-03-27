/**
 * jQ textarea plugin
 * $(id).textarea(params);
 * @param {Boolean} isResize flag resize
 */
(function($){


    $.fn.textarea = function(isResize) {

        return this.each(function(){
            var $this = $(this),
                trueTextarea = $this[0],
                wrapper = $this.parent(),
                isPressed = false,
                isFocused = false,
                isHover = false,
                area,
                span;

            if(isResize) {
                wrapper.append('<pre><span></span></pre>');

                area = wrapper.children('textarea')[0];
                span = wrapper.find('span')[0];

                if (area.addEventListener) {
                    area.addEventListener('input', function(){
                        span.textContent = area.value;
                    }, false);
                    span.textContent = area.value;
                } else if (area.attachEvent) {
                    // IE8 compatibility
                    area.attachEvent('onpropertychange', function(){
                        span.innerText = area.value;
                    });
                    span.innerText = area.value;
                }
                wrapper[0].className += ' jsTextareaResize';
            }

            wrapper.on({
                mouseenter: function(){
                    if (!trueTextarea.disabled){
                        isHover = true;
                        wrapper.addClass('isHover');
                    }
                },
                mouseleave: function(){
                    isHover = false;
                    wrapper.removeClass('isHover');
                }
            });

            wrapper.children('textarea').on({
                focus: function(){
                    if (!trueTextarea.disabled){
                        isFocused = true;
                        wrapper.addClass('isFocused');
                    }
                },
                blur: function(){
                    isFocused = false;
                    wrapper.removeClass('isFocused').removeClass('isPressed');
                }
            });
        });
    };
})(jQuery);