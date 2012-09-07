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

    $.fn.svgElliptical = function() {

        return this.each(function () {
            var $this = $(this),
                wrapper = $this.parent(),
                trueSvg = $this[0],
                trueSvgPath = $this[0],
                localEllipticalObject,
                x0 = 135,
                y0 = 135,
                pi = Math.PI,
                r = 85,
                a, // угол в градусах
                cacheA = 0,
                cacheX = 135, // начальный X графика
                cacheY = 50,  // начальный Y графика
                attrValue,
                x,
                y,
                i = 0,
                iMax;

            if (window.ellipticalObject !== undefined) {
                localEllipticalObject = window.ellipticalObject;
            }

            iMax = localEllipticalObject.length;



            for (i; i < iMax; i+=1) {
                a = (localEllipticalObject[i][0] * 360) / 100; // считаем центральный угол
                cacheA += a;

                //формула нахождения координатов точки в зависимости от величины центрального угла
                x = x0 + r * Math.cos(cacheA * pi/180 - pi/2);
                y = y0 + r * Math.sin(cacheA * pi/180 - pi/2);

                trueSvgPath = $this.children('g').children('path')[i];
                attrValue = 'M' + cacheX + ',' + cacheY + ' A85,85 0 0,1 ' + x + ',' + y;
                trueSvgPath.setAttribute('d', attrValue);

                cacheX = x;
                cacheY = y;
            }
        });
    };
})(jQuery);