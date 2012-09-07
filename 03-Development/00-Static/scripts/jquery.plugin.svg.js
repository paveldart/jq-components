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
                trueSvgPath,
                trueSvgImage,
                trueSvgText,
                localEllipticalObject,
                x0 = 200, // координата центра окружности по X
                y0 = 200, // координата центра окружности по Y
                pi = Math.PI,
                r = 85, // радиус окружности
                a, // угол в градусах
                cacheA = 0, // переменная, кеширующая угол
                cacheX = 200, // начальный X графика
                cacheY = 115,  // начальный Y графика
                attrValue,
                x, // координата точки на окружности по X
                y, // координата точки на окружности по Y
                i = 0,
                iMax;

            if (window.ellipticalObject !== undefined) {
                localEllipticalObject = window.ellipticalObject;
                iMax = localEllipticalObject.length / 2;
            }

            for (i; i < iMax; i+=1) {
                a = (localEllipticalObject[2*i] * 360) / 100; // считаем центральный угол
                cacheA += a;

//                расчеты для графиков: формула нахождения координатов точки в зависимости от величины центрального угла
                x = x0 + (r * Math.cos(cacheA * pi/180 - pi/2));
                y = y0 + (r * Math.sin(cacheA * pi/180 - pi/2));
                trueSvgPath = $this.children('g').children('path')[i];
                attrValue = 'M' + cacheX + ',' + cacheY + ' A85,85 0 0,1 ' + x + ',' + y;
                trueSvgPath.setAttribute('d', attrValue);


//                расчеты для картинки: вычитаем из координат половину размеров картинок (49/2), увеличиваем радиус
                cacheX = x0 + (1.5 * r * Math.cos((cacheA - a/2) * pi/180 - pi/2)) - 50/2;
                cacheY = y0 + (1.5 * r * Math.sin((cacheA - a/2) * pi/180 - pi/2)) - 50/2;
                trueSvgImage = $this.children('g').children('image')[i];
                trueSvgImage.setAttribute('xlink:href', localEllipticalObject[2*i + 1]);
                trueSvgImage.setAttribute('x', cacheX);
                trueSvgImage.setAttribute('y', cacheY);

//                расчеты для текста: уменьшаем радиус, вычитаем половину ширины и прибавляем половину высоты
                cacheX = x0 + (0.7 * r * Math.cos((cacheA - a/2) * pi/180 - pi/2)) - 12;
                cacheY = y0 + (0.7 * r * Math.sin((cacheA - a/2) * pi/180 - pi/2)) + 7;
                trueSvgText = $this.children('g').children('text')[i];
                trueSvgText.textContent = localEllipticalObject[2*i].toFixed() + '%';
                trueSvgText.setAttribute('x', cacheX);
                trueSvgText.setAttribute('y', cacheY);

                cacheX = x;
                cacheY = y;
            }

            x = y = x0 = y0 = cacheX = cacheY = cacheA = trueSvgText = trueSvgImage = attrValue = trueSvgPath = null;
        });
    };
})(jQuery);