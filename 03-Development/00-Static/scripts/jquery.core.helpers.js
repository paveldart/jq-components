

$.prototype.timingTest = function(){
//    add: function(test){
        var _that = this,
            tests = [],
            doings = [],
            j = 0,
            jMax = 0,
            i = 0,
            iMax = 0;
        _that.add = function(test){
            doings.push(function(){
                tests.push(test);
                iMax = tests.length;
            });
        };
        _that.remove = function(test){
            doings.push(function(){
                for (i = iMax; i--;){
                    if ((tests[i] === test)){
                        tests.splice(i, 1);
                        iMax -= 1;
                        break;
                    }
                }
            })
        };
        _that.interval = window.setInterval(function(){
            for (i = 0; i < iMax; i += 1){
                tests[i]();
            }
            jMax = doings.length;
            if (jMax > 0){
                for(j = 0; j < jMax; j += 1){
                    doings[j]();
                }
                doings.length = 0;
            }
        }, 16);
        _that.add(test);
//    }
}();

$.prototypeselectExpandEvents = function(object){
    var that = this,
        valueCache = object.selectedIndex;
    function testNeedEvents(){
        if (valueCache != object.selectedIndex){
            valueCache = object.selectedIndex;
            that.generateCustomEvent(object, '__valueChange', valueCache);
        }
    }
    that.timingTest.add(testNeedEvents);
};

$.prototype.inputExpandEvents = function(object){
    var that = this,
        valueCache = object.value;
    function testNeedEvents(){
        if (valueCache != object.value){
            valueCache = object.value;
            that.generateCustomEvent(object, '__valueChange', valueCache);
        }
    }
    that.timingTest.add(testNeedEvents);
};