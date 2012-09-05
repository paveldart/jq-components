// input event

(function ($) {
    $.event.special.textchange = {
        setup: function (data, namespaces) {
            var $this = $(this);

            $this.data('lastValue', this.contentEditable === 'true' ? $this.html() : $this.val());
            $this.on('keyup.textchange', $.event.special.textchange.handler);
            $this.on('cut.textchange paste.textchange input.textchange', $.event.special.textchange.delayedHandler);
        },

        teardown: function (namespaces) {
            $(this).off('.textchange');
        },

        handler: function (event) {
            $.event.special.textchange.triggerIfChanged($(this));
        },

        delayedHandler: function (event) {
            var element = $(this);
            setTimeout(function () {
                $.event.special.textchange.triggerIfChanged(element);
            }, 25);
        },

        triggerIfChanged: function (element) {
            var current = element[0].contentEditable === 'true' ? element.html() : element.val();
            if (current !== element.data('lastValue')) {
                element.trigger('textchange', [element.data('lastValue')]);
                element.data('lastValue', current);
            }
        }
    };
})(jQuery);