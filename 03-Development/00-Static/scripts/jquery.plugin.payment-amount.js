/**
 * jQ special payment input plugin
 * $(id).paymentAmount();
 */

//todo переосмыслить/переписать
(function($){
    var $d = $.$d;

    $.fn.paymentAmount = function() {

        return this.each(function () {
            var $this = $(this),
                wrapper = $this.parent(),
                trueInput = $this[0],
                paymentAmountWrapper = wrapper.parent().parent(),
                paymentAmountValues = paymentAmountWrapper.find('.payment-amount-value'),
                paymentAmountSlider = wrapper.children('.payment-amount-select-wrapper'),
                currencyChangeButtons = paymentAmountWrapper.find('.currency-change-button'),
                currencyWrapperButtons = currencyChangeButtons.children('.currency-change-button-wrapper'),
                currencyButtons = currencyChangeButtons.find('.currency-button'),
                sliderLeft = 0,
                sliderMargin,
                activeValue = 0,
                slideRight;

//            проверка на CSS-Transitions
            if ($d.isTransitions) {
                paymentAmountWrapper.addClass('payment-amount-css');
            }

//            проверка состояния инпута и анимация ползунка
            setInterval(function(){
                if (trueInput.value === '500') {
                    sliderLeft = '0';
                    activeValue = 0;
                    paymentAmountSlider.addClass('isVisible');
                } else if (trueInput.value === '1000') {
                    sliderLeft = '-13px';
                    activeValue = 1;
                    paymentAmountSlider.addClass('isVisible');
                } else if (trueInput.value === '3000') {
                    sliderLeft = '-13px';
                    activeValue = 2;
                    paymentAmountSlider.addClass('isVisible');
                } else if (trueInput.value === '5000') {
                    sliderLeft = '-13px';
                    activeValue = 3;
                    paymentAmountSlider.addClass('isVisible');
                } else if (trueInput.value === '10000') {
                    sliderLeft = '-35px';
                    activeValue = 4;
                    paymentAmountSlider.addClass('isVisible');
                }
                else {
                    paymentAmountSlider.removeClass('isVisible');
                    paymentAmountValues.removeClass('isActive');
                }

                sliderMargin = (25*activeValue)+'%';

                paymentAmountSlider.animate({
                    'left': sliderLeft,
                    'margin-left': sliderMargin
                })
            }, 500);

            paymentAmountValues.on({
                click: function(){
                    trueInput.value = parseInt($(this).html()) + '';
                },
                touchend: function(){
                    trueInput.value = parseInt($(this).html()) + '';
                }
            });


//            выбор валюты
            currencyChangeButtons.toggle(function(){
                var $this = $(this);

//                проверка: если браузер не поддерживает CSS-Transitions, то анимируем с помощью jQ
                if ($d.isTransitions) {
                    $this.addClass('isOpened');
                    currencyWrapperButtons.removeClass('isOpened_0')
                        .removeClass('isOpened_1')
                        .removeClass('isOpened_2')
                        .removeClass('isOpened_3')
                        .removeClass('isOpened_4');
                } else {
                    $this.addClass('isOpened')
                        .animate({
                            width: '200px'
                        }, 300);

                    currencyWrapperButtons.animate({
                        right: '0'
                    }, 300);
                }
            }, function(){
                var $this = $(this),
                    currencyButtonIndex = $this.find('.currency-current').index(),
                    currencyWrapperButtonsClass;

                if ($d.isTransitions) {
                    currencyWrapperButtonsClass = 'isOpened_' + currencyButtonIndex;
                    currencyWrapperButtons.addClass(currencyWrapperButtonsClass);
                    $this.removeClass('isOpened');
                } else {
                    slideRight = (40*currencyButtonIndex)+'px';

                    $this.removeClass('isOpened')
                        .animate({
                            width: '38px'
                        }, 300);

                    currencyWrapperButtons.animate({
                        right: slideRight
                    }, 300);
                }
            });

            currencyButtons.on("click", function(){
                var $this = $(this);

                $this.parent().children().removeClass('currency-current');
                $this.addClass('currency-current');
            });
        });
    };
})(jQuery);