/**
 * jQ special payment input plugin
 * $(id).paymentAmount();
 */

//todo переосмыслить/переписать
(function($){
    $.fn.paymentAmount = function() {

        return this.each(function () {
            var $this = $(this),
                wrapper = $this.parent(),
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


//            ползунок
            $this.on({
                keyup: function(){
                    switch($this.val()){
                        case '500':
                            sliderLeft = '0';
                            activeValue = 0;
                            paymentAmountSlider.addClass('isVisible');
                            break;
                        case '1000':
                            sliderLeft = '-13px';
                            activeValue = 1;
                            paymentAmountSlider.addClass('isVisible');
                            break;
                        case '3000':
                            sliderLeft = '-13px';
                            activeValue = 2;
                            paymentAmountSlider.addClass('isVisible');
                            break;
                        case '5000':
                            sliderLeft = '-13px';
                            activeValue = 3;
                            paymentAmountSlider.addClass('isVisible');
                            break;
                        case '10000':
                            sliderLeft = '-35px';
                            activeValue = 4;
                            paymentAmountSlider.addClass('isVisible');
                            break;
                        default:
                            paymentAmountSlider.removeClass('isVisible');
                            paymentAmountValues.removeClass('isActive');
                            break;
                    }

                    sliderMargin = (25*activeValue)+'%';
                    paymentAmountSlider.animate({
                        'left': sliderLeft,
                        'margin-left': sliderMargin
                    })
                }
            });

            paymentAmountValues.on('click', function(){
                var $this = $(this),
                    placeholder = wrapper.children('label'),
                    paymentValue = parseInt($this.html()),
                    siblings = $this.parent().children('.payment-amount-value');

                activeValue = 0;

                for(activeValue; activeValue < siblings.length; activeValue++){
                    if ($this[0] === siblings[activeValue]) {
                        break;
                    }
                }

                switch(activeValue){
                    case 0:
                        sliderLeft = '0';
                        break;
                    case (siblings.length - 1):
                        sliderLeft = '-35px';
                        break;
                    default:
                        sliderLeft = '-13px';
                        break;
                }

                sliderMargin = (25*activeValue)+'%';

                $this.siblings().removeClass('isActive');
                $this.addClass('isActive');

                placeholder.addClass('noVisible');
                paymentAmountSlider.addClass('isVisible');
                wrapper.children('.jsRealInput').val(paymentValue);
                paymentAmountSlider.animate({
                    'left': sliderLeft,
                    'margin-left': sliderMargin
                })
            });


//            выбор валюты
            currencyChangeButtons.toggle(function(){
                var $this = $(this);

                $this.addClass('isOpened')
                     .animate({
                         width: '200px'
                     }, 300);

                currencyWrapperButtons.animate({
                    right: '0'
                }, 300);

            }, function(){
                var $this = $(this),
                    currencyButtonIndex = $this.find('.currency-current').index();

                slideRight = (40*currencyButtonIndex)+'px';

                $this.removeClass('isOpened')
                     .animate({
                        width: '38px'
                     }, 300);

                currencyWrapperButtons.animate({
                    right: slideRight
                }, 300);
            });

            currencyButtons.on("click", function(){
                var $this = $(this);

                $this.parent().children().removeClass('currency-current');
                $this.addClass('currency-current');
            });
        });
    };
})(jQuery);


// тоже самое, но с анимацией кнопок выбора валюты на css
(function($){
    $.fn.paymentAmountCss = function() {

        return this.each(function () {
            var $this = $(this),
                wrapper = $this.parent(),
                paymentAmountWrapper = wrapper.parent().parent(),
                paymentAmountValues = paymentAmountWrapper.find('.payment-amount-value'),
                paymentAmountSlider = wrapper.children('.payment-amount-select-wrapper'),
                currencyChangeButtons = paymentAmountWrapper.find('.currency-change-button'),
                currencyWrapperButtons = currencyChangeButtons.children('.currency-change-button-wrapper'),
                currencyButtons = currencyChangeButtons.find('.currency-button'),
                sliderLeft = 0,
                sliderMargin,
                activeValue = 0;


//            ползунок
            $this.on({
                keyup: function(){
                    switch($this.val()){
                        case '500':
                            sliderLeft = '0';
                            activeValue = 0;
                            paymentAmountSlider.addClass('isVisible');
                            break;
                        case '1000':
                            sliderLeft = '-13px';
                            activeValue = 1;
                            paymentAmountSlider.addClass('isVisible');
                            break;
                        case '3000':
                            sliderLeft = '-13px';
                            activeValue = 2;
                            paymentAmountSlider.addClass('isVisible');
                            break;
                        case '5000':
                            sliderLeft = '-13px';
                            activeValue = 3;
                            paymentAmountSlider.addClass('isVisible');
                            break;
                        case '10000':
                            sliderLeft = '-35px';
                            activeValue = 4;
                            paymentAmountSlider.addClass('isVisible');
                            break;
                        default:
                            paymentAmountSlider.removeClass('isVisible');
                            paymentAmountValues.removeClass('isActive');
                            break;
                    }

                    sliderMargin = (25*activeValue)+'%';
                    paymentAmountSlider.animate({
                        'left': sliderLeft,
                        'margin-left': sliderMargin
                    })
                }
            });

            paymentAmountValues.on('click', function(){
                var $this = $(this),
                    placeholder = wrapper.children('label'),
                    paymentValue = parseInt($this.html()),
                    siblings = $this.parent().children('.payment-amount-value');

                activeValue = 0;

                for(activeValue; activeValue < siblings.length; activeValue++){
                    if ($this[0] === siblings[activeValue]) {
                        break;
                    }
                }

                switch(activeValue){
                    case 0:
                        sliderLeft = '0';
                        break;
                    case (siblings.length - 1):
                        sliderLeft = '-35px';
                        break;
                    default:
                        sliderLeft = '-13px';
                        break;
                }

                sliderMargin = (25*activeValue)+'%';

                $this.siblings().removeClass('isActive');
                $this.addClass('isActive');

                placeholder.addClass('noVisible');
                paymentAmountSlider.addClass('isVisible');
                wrapper.children('.jsRealInput').val(paymentValue);
                paymentAmountSlider.animate({
                    'left': sliderLeft,
                    'margin-left': sliderMargin
                })
            });


//            выбор валюты
            currencyChangeButtons.toggle(function(){
                var $this = $(this);

                $this.addClass('isOpened');
                currencyWrapperButtons.removeClass('isOpened0')
                                      .removeClass('isOpened1')
                                      .removeClass('isOpened2')
                                      .removeClass('isOpened3')
                                      .removeClass('isOpened4');

            }, function(){
                var $this = $(this),
                    currencyButtonIndex = $this.find('.currency-current').index(),
                    currencyWrapperButtonsClass;

                currencyWrapperButtonsClass = 'isOpened' + currencyButtonIndex;
                currencyWrapperButtons.addClass(currencyWrapperButtonsClass);
                $this.removeClass('isOpened');


            });

            currencyButtons.on('click', function(){
                var $this = $(this);

                $this.parent().children().removeClass('currency-current');
                $this.addClass('currency-current');
            });
        });
    };
})(jQuery);