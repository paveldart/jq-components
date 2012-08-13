var SWF01 = {
    $d: function(){
        var html = document.documentElement,
            htmlClass = '',
            os = navigator.platform,
            browser = $.browser,
            browserVersion = browser.version;
            $d = {
                browser: browser,
                os: os,
                isFx: false,
                isWebKit: false,
                isChrome: false,
                isSafari: false,
                isOpera: false,
                isIE: false,
                isOldIE: false,
                browserVersion: browserVersion,
                isOld: false,
                isUndefined: false,
            };

        if (browser.mozilla === true){
            $d.browserVersion = parseFloat(browserVersion);
            $d.isFx = true;
            htmlClass += ' isFX isNoIE FX_' + $d.browserVersion;
            if ($d.browserVersion < 3.5){
                $d.isOld = true;
                htmlClass += ' OldFX';
            }
        } else if (browser.chrome === true){
            $d.browserVersion = parseFloat(browserVersion);
            $d.isChrome = $d.isWebKit = true;
            htmlClass += ' isChrome isWebKit isNoIE Ch_' + $d.browserVersion;
            if ($d.browserVersion < 4){
                htmlClass += ' OldCh';
                $d.isOld = true;
            }
        } else if (browser.msie === true){
            $d.browserVersion = parseFloat(browserVersion);
            /*if (document.documentMode !== undefined){
                $d.browserVersion = document.documentMode;
            } else if (document.compatMode === 'CSS1Compat'){
                $d.browserVersion = parseFloat(browser.substr(browser.indexOf('MSIE') + 5, 3));
            } else{
                $d.browserVersion = 5;
            }*/
            $d.isIE = true;
            htmlClass += ' isIE IE_' + $d.browserVersion;
            if ($d.browserVersion < 9){
                $d.isOldIE = true;
                htmlClass += ' isOldIE';
            } else{
                htmlClass += ' isNewIE';
            }
        } else if (browser.safari === true){
            //переопределяю browser, так как $.browser.version в Сафари передает номер сборки
            browser = navigator.userAgent;
            $d.browserVersion = parseFloat(browser.substr(browser.indexOf('Version/') + 8, 4));
            $d.isSafari = $d.isWebKit = true;
            htmlClass += ' isSafari isWebKit isNoIE SF_' + $d.browserVersion;
            if ($d.browserVersion < 4){
                htmlClass += ' OldSF';
                $d.isOld = true;
            }
        } else if (browser.opera === true){
            browser = navigator.userAgent;
            $d.browserVersion = parseFloat(browser.substr(browser.indexOf('Version/') + 8, 4));
            $d.isOpera = true;
            htmlClass += ' isOpera isNoIE O_' + $d.browserVersion;
            if ($d.browserVersion < 11){
                htmlClass += ' OldO';
                $d.isOld = true;
            }
        } else {
            htmlClass += ' UndefinedBrowser';
            $d.isUndefined = true;
        }

        $(html).addClass(htmlClass);
    }()
};