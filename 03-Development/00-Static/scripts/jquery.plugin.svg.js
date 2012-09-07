(function($){

    $.fn.svg = function() {

        return this.each(function () {
            var $this = $(this),
                trueSvg = $this[0],
                wrapper = $this.parent(),
                wrapperWidth = wrapper[0].clientWidth,
                wrapperHeight = wrapper[0].clientHeight;

            trueSvg.setAttribute('viewBox','0 0 ' + wrapperWidth + ' ' + wrapperHeight);
        });
    };
})(jQuery);