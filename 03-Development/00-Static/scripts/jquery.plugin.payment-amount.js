/**
 * jQ input plugin
 * $(id).input();
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
                currencyButtons = paymentAmountWrapper.find('.currency-button');

            paymentAmountValues.on("click", function(){
                var $this = $(this),
                    paymentValue = parseInt($this.html()),
                    visualInput = $this.closest('.payment-amount-scale-values').children('.jsVisualInput'),
                    sliderLeft = 0,
                    sliderMargin = 0,
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

                visualInput.children('.jsRealInput').val(paymentValue);
                visualInput.children('.payment-amount-select-wrapper').animate({
                    'left': sliderLeft,
                    'margin-left': sliderMargin
                })
            });

            currencyChangeButtons.toggle(function(){
                var $this = $(this);

                $this.addClass('isOpened');

                $this.children().animate({
                    width: '35px'
                });
            }, function(){
                var $this = $(this);

                $this.children().not('.currency-current').animate({
                    width: '0'
                }, function(){
                    $this.removeClass('isOpened');
                });
            });

            currencyButtons.on("click", function(){
                var $this = $(this);

                $this.parent().children().removeClass('currency-current');
                $this.addClass('currency-current');
            });

        });
    };
})(jQuery);