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
                currencyChangeButtons = paymentAmountWrapper.find('.currency-change-button'),
                currencyWrapperButtons = currencyChangeButtons.children('.currency-change-button-wrapper'),
                currencyButtons = currencyChangeButtons.find('.currency-button'),
                slideRight;

//            ползунок и инпут
            paymentAmountValues.on("click", function(){
                var $this = $(this),
                    placeholder = wrapper.children('label'),
                    paymentValue = parseInt($this.html()),
                    visualInput = $this.closest('.payment-amount-scale-values').children('.jsVisualInput'),
                    sliderLeft = 0,
                    sliderMargin,
                    siblings = $this.parent().children('.payment-amount-value'),
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
                visualInput.children('.jsRealInput').val(paymentValue);
                visualInput.children('.payment-amount-select-wrapper').animate({
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

                $this.animate({
                        width: '38px'
                     }, 300);

                $this.removeClass('isOpened');

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