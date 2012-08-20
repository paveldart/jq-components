(function($) {
    $.fn.placeholder = function() {
        return this.each(function () {
            var $this = $(this),
                wrapper = $this.parent(),
                input = wrapper.children('input')[0],
                textarea = wrapper.children('textarea')[0],
                children = input || textarea,
                isVisible = false;

            if (children !== undefined) {
                if (children.value.length > 0) {
                    $this.addClass('noVisible');
                    isVisible = false;
                } else if (children.value.length === 0) {
                    $this.removeClass('noVisible');
                    isVisible = true;
                }
            }

            function hiddenPlaceholder(){
                if(isVisible) {
                    $this.addClass('noVisible');
                    isVisible = false;
                }
            }

            function visiblePlaceholder() {
                if(!isVisible) {
                    if ((children !== undefined) && (children.value.length === 0)){
                        $this.removeClass('noVisible');
                        isVisible = true;
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