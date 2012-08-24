/**
 * jQ placeholder plugin
 * $(id).placeholder(params);
 * @param {Boolean} isOnFocus flag focus or on Input
 * @param {Function} onShowPlaceholder
 * @param {Function} onHidePlaceholder
 */
            


(function($) {
    $.fn.placeholder = function(isOnFocus, onShowPlaceholder, onHidePlaceholder) {
        var $this = $(this);


        return this.each(function (i, object) {
            var $this = $(this),
                wrapper = $this.parent(),
                input = wrapper.children('input')[0],
                textarea = wrapper.children('textarea')[0],
                placeholder = wrapper.children('label'),
                inputOrTextarea = input || textarea,
                isVisible = false,
                keyCode;

            if (isOnFocus) {
                placeholder.attr('data-focused', 'true');
            }

            if (onShowPlaceholder) {
                onShowPlaceholder();
            }

            if (onHidePlaceholder) {
                onHidePlaceholder();
            }

//            check value & state
            if (inputOrTextarea !== undefined) {
                if (inputOrTextarea.value.length > 0) {
                    placeholder.addClass('noVisible');
                    isVisible = false;
                } else if (inputOrTextarea.value.length === 0) {
                    placeholder.removeClass('noVisible');
                    isVisible = true;
                }
                if (placeholder[0].getAttribute('data-focused')) {
                    if (inputOrTextarea.value.length > 0) {
                        placeholder.removeClass('noVisible').addClass('isReduced');
                        isVisible = true;
                    }
                }
            }

            function hiddenPlaceholder(e){
                keyCode = e.keyCode || e.which;
                if (keyCode !== 9) {
                    if (isVisible && !placeholder[0].getAttribute('data-focused')) {
                        placeholder.addClass('noVisible');
                        isVisible = false;
                    }
                }
            }

            function visiblePlaceholder(e) {
                keyCode = e.keyCode || e.which;
                if (keyCode !== 9) {
                    if(!isVisible) {
                        if ((inputOrTextarea !== undefined) && (inputOrTextarea.value.length === 0)){
                            placeholder.removeClass('noVisible');
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