(function($) {
    $.fn.placeholder = function() {
        return this.each(function () {
            var $this = $(this),
                wrapper = $this.parent(),
                input = wrapper.children('input'),
                textarea = wrapper.children('textarea');

            wrapper
                .on('keydown', function() {
                    $this.addClass('noVisible');
                })
                .on('keyup', function() {
                    if (((input[0] !== undefined) && (input[0].value.length === 0)) || ((textarea[0] !== undefined) && (textarea[0].value.length === 0))){
                        $this.removeClass('noVisible');
                    }
                });

            if (((input[0] !== undefined) && (input[0].value.length > 0)) || ((textarea[0] !== undefined) && (textarea[0].value.length > 0))) {
                $this.addClass('noVisible');
            } else if (((input[0] !== undefined) && (input[0].value.length === 0)) || ((textarea[0] !== undefined) && (textarea[0].value.length === 0))) {
                $this.removeClass('noVisible');
            }
        });
    };

    function clearPlaceholder(obj) {
        obj.addClass('noVisible');
    }

    function setPlaceholder(obj) {
        obj.removeClass('noVisible');
    }

}(jQuery));