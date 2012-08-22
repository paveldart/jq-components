/**
 * jQ placeholder plugin
 * $(id).placeholder(params);
 * default:
 * params = {
 *     focus: false, //при фокусе плейсхолдер не скрывается
 * }
 */

(function($) {
    $.fn.placeholder = function(params) {
        var $this = $(this),
            settings = {
                focus: false
            };


        return this.each(function (i, object) {
            var $this = $(this),
                wrapper = $this.parent(),
                input = wrapper.children('input')[0],
                textarea = wrapper.children('textarea')[0],
                children = input || textarea,
                isVisible = false,
                keyCode,
                isFocused;

            if (params) {
                $.extend(settings, params);
            }

            isFocused = settings.focus;
            if (isFocused) {
                $this.attr('data-focused', 'true');
            }

//            check value & state
            if (children !== undefined) {
                if (children.value.length > 0) {
                    $this.addClass('noVisible');
                    isVisible = false;
                } else if (children.value.length === 0) {
                    $this.removeClass('noVisible');
                    isVisible = true;
                }
                if ($this[0].getAttribute('data-focused')) {
                    if (children.value.length > 0) {
                        $this.removeClass('noVisible').addClass('isReduced');
                        isVisible = true;
                    }
                }
            }

            function hiddenPlaceholder(e){
                keyCode = e.keyCode || e.which;
                if (keyCode !== 9) {
                    if (isVisible && !$this[0].getAttribute('data-focused')) {
                        $this.addClass('noVisible');
                        isVisible = false;
                    }
                }
            }

            function visiblePlaceholder(e) {
                keyCode = e.keyCode || e.which;
                if (keyCode !== 9) {
                    if(!isVisible) {
                        if ((children !== undefined) && (children.value.length === 0)){
                            $this.removeClass('noVisible');
                            isVisible = true;
                        }
                    }
                }
            }

            wrapper.on({
                keydown: hiddenPlaceholder,
                keyup: visiblePlaceholder
            });

        });
    };
}(jQuery));