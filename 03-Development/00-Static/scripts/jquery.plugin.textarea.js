/**
 * jQ textarea plugin
 * $(id).textarea(params);
 * resize params:
 * params = {
 *     resize: true
 * }
 */
(function($){


    $.fn.textarea = function(params) {
        var isResize,
//            настройки по умолчанию
            settings = {
                resize: false
            };

        return this.each(function () {
            var $this = $(this),
                wrapper = $this.parent(),
                isPressed = false,
                isFocused = false,
                isHover = false,
                area,
                span;

            if (params) {
                $.extend(settings, params);
            }

            isResize = settings.resize;

            if(isResize) {
                wrapper.append('<pre><span></span><br /></pre>');

                area = wrapper.children('textarea')[0];
                span = wrapper.find('span')[0];

                if (area.addEventListener) {
                    area.addEventListener('input', function() {
                        span.textContent = area.value;
                    }, false);
                    span.textContent = area.value;
                } else if (area.attachEvent) {
                    // IE8 compatibility
                    area.attachEvent('onpropertychange', function() {
                        span.innerText = area.value;
                    });
                    span.innerText = area.value;
                }
                wrapper[0].className += ' jsTextareaResize';
            }

            wrapper.on({
                mouseenter: function() {
                    isHover = true;
                    wrapper.addClass('isHover');
                },
                mouseleave: function() {
                    isHover = false;
                    wrapper.removeClass('isHover');
                }
            });

            wrapper.children('textarea').on({
                focus: function () {
                    isFocused = true;
                    wrapper.addClass('isFocused');
                },
                blur: function () {
                    isFocused = false;
                    wrapper.removeClass('isFocused').removeClass('isPressed');
                }
            });
        });
    };
})(jQuery);