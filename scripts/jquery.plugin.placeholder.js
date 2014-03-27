/**
 * jQ placeholder plugin
 * $(id).placeholder(params);
 * @param {Boolean} isOnFocus flag focus or on Input
 * @param {Function} onShowPlaceholder
 * @param {Function} onHidePlaceholder
 */
            
(function($) {
    $.fn.placeholder = function(isOnFocus, onHidePlaceholder, onShowPlaceholder) {
        var $this = $(this);

        return this.each(function(){
            var $this = $(this),
                wrapper = $this.parent(),
                input = wrapper.children('input')[0],
                textarea = wrapper.children('textarea')[0],
                placeholder = wrapper.children('label'),
                inputOrTextarea = input || textarea,
                casheValue = inputOrTextarea.value,
                isVisible = false,
                keyCode;

            if (isOnFocus) {
                placeholder[0].focused = true;
                $this.on({
                    focus: function(){
                        if (onHidePlaceholder === undefined) {
                            placeholder.addClass('noVisible');
                        } else {
                            onHidePlaceholder.call(placeholder);
                        }
                    },
                    blur: function(){
                        if (onShowPlaceholder === undefined) {
                            placeholder.removeClass('noVisible');
                        } else {
                            if (inputOrTextarea.value.length === 0){
                                onShowPlaceholder.call(placeholder);
                            }
                        }
                    }
                });
            }
            else {
//                $this.on({
////                    событие textchange
//                    textchange: hiddenOrShowPlaceholder
//                });
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
                if (placeholder[0].focused) {
                    if (inputOrTextarea.value.length > 0) {
                        onHidePlaceholder.call(placeholder);
                        placeholder.removeClass('noVisible');
                        isVisible = true;
                    }
                }
            }

            setInterval(function(){

                if (($this.val() !== casheValue) && ($this.val() !== '')) {
                    if (isVisible && !placeholder[0].focused) {
                        placeholder.addClass('noVisible');
                        isVisible = false;
                    }
                }
                else if ($this.val() === ''){
                    placeholder.removeClass('noVisible');
                    isVisible = true;
                }
            }, 0);

//            function hiddenOrShowPlaceholder(e){
//                keyCode = e.keyCode || e.which;
//                if ((keyCode !== 9) &&(keyCode !== 13)) {
//                    if (isVisible && !placeholder[0].focused) {
//                        placeholder.addClass('noVisible');
//                        isVisible = false;
//                    }
//                    else if(!isVisible) {
//                        if ((inputOrTextarea !== undefined) && (inputOrTextarea.value.length === 0)){
//                            placeholder.removeClass('noVisible');
//                            isVisible = true;
//                        }
//                    }
//                }
//            }
        });
    };
}(jQuery));
