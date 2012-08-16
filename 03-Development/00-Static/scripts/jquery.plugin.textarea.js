//jQ textarea plugin

(function($){
    $.fn.textarea = function() {

        return this.each(function () {
            var $this = $(this),
                isPressed = false,
                isFocused = false,
                isHover = false,
                area = $this.context.querySelector('textarea'),
                span = $this.context.querySelector('span');

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
            $this.context.className += ' active';

            $this
                .on('mouseenter', function() {
                    isHover = true;
                    $this.addClass('isHover');
                })
                .on('mouseleave', function() {
                    isHover = false;
                    $this.removeClass('isHover');
                });

            $this.children('textarea')
                .on('focus', function () {
                    isFocused = true;
                    $this.addClass('isFocused');
                })
                .on('blur', function () {
                    isFocused = false;
                    $this.removeClass('isFocused').removeClass('isPressed');
                });
        });
    };
})(jQuery);