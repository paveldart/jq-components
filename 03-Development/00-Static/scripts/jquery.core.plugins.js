//jQ check version and CSS-features in browser

$.prototype.$d = function(){
    var html = document.documentElement,
        testElemStyle = document.createElement('div').style,
        htmlClass = '',
        browser = $.browser,
        browserVersion = browser.version,
        os = navigator.platform,
        jsStylePrefixes = ['webkit', 'Moz', 'O', 'MS'],
        cssStylePrefixes = ['-webkit-', '-moz-', '-o-', '-ms-'],
        upperProperty,
        i,
        iMax = jsStylePrefixes.length,
        $d = {
            browser: browser,
            browserVersion: browserVersion,
            os: os,
            isMac: false,
            isIPad: false,
            isIPhone: false,
            isWindows: false,
            isAndroid: false,
            isOldAndroid: false,
            isRetina: false,
            isTouch: false,
            isFx: false,
            isWebKit: false,
            isChrome: false,
            isSafari: false,
            isOpera: false,
            isIE: false,
            isOldIE: false,
            isOld: false,
            isUndefined: false,
            isSVG: false,
            isTransforms: false,
            sTransform: null,
            cssTransform: null,
            isTransitions: false,
            sTransition: null,
            cssTransition: null,
            eTransitionEnd: null,
            sTDelay: null,
            sTDuration: null,
            sTProperty: null,
            sTTimingFunction: null,
            isAnimation: false,
            sAnimation: null,
            cssAnimation: null,
            cssKeyFrame: null,
            isPerspective: false,
            sPerspective: null,
            cssPerspective: null,
            sPerspectiveOrigin: null,
            cssPerspectiveOrigin: null,
            isBorderRadius: false,
            sBorderRadius: null,
            cssBorderRadius: null,
            isBoxShadow: false,
            sBoxShadow: null,
            cssBoxShadow: null,
            isCSSGradient: false,
            cssLinearGradient: null,
            cssRadialGradient: null
        };

    function testProperty(property, cssProperty){
        upperProperty = property.charAt(0).toUpperCase() + property.substr(1);
        if (testElemStyle[property] !== undefined){
            $d['s' + upperProperty] = property;
            $d['css' + upperProperty] = cssProperty || property;
            if (property === 'transition'){
                $d.eTransitionEnd = 'transitionend';
                $d.sTDelay = 'transitionDelay';
                $d.sTDuration = 'transitionDuration';
                $d.sTProperty = 'transitionProperty';
                $d.sTTimingFunction = 'transitionTimingFunction';
            } else if (property === 'animation'){
                $d.cssKeyFrame = '@keyframes';
            } else if (property === 'perspective'){
                $d.sPerspectiveOrigin = 'perspectiveOrigin';
                $d.cssPerspectiveOrigin = 'perspective-origin';
            }
            return true;
        }
        for (i = iMax; i-- ;){
            if (testElemStyle[jsStylePrefixes[i] + upperProperty] !== undefined){
                $d['s' + upperProperty] = jsStylePrefixes[i] + upperProperty;
                $d['css' + upperProperty] = cssStylePrefixes[i] + (cssProperty || property);
                if (property === 'transition'){
                    $d.eTransitionEnd = $d.isFx !== undefined ? 'transitionend' : jsStylePrefixes[i] + 'TransitionEnd';
                    $d.sTDelay = jsStylePrefixes[i] + 'TransitionDelay';
                    $d.sTDuration = jsStylePrefixes[i] + 'TransitionDuration';
                    $d.sTProperty = jsStylePrefixes[i] + 'TransitionProperty';
                    $d.sTTimingFunction = jsStylePrefixes[i] + 'TransitionTimingFunction';
                } else if (property === 'animation'){
                    $d.cssKeyFrame = '@' + cssStylePrefixes[i] + 'keyframes';
                } else if (property === 'perspective'){
                    $d.sPerspectiveOrigin = jsStylePrefixes[i] + 'PerspectiveOrigin';
                    $d.cssPerspectiveOrigin = cssStylePrefixes[i] + 'perspective-origin';
                }
                return true;
            }
        }
        return false;
    }

    function addGradientSupport(prefix){
        $d.isCSSGradient = true;
        $d.cssLinearGradient = prefix + 'linear-gradient';
        $d.cssRadialGradient = prefix + 'radial-gradient';
        htmlClass += ' isCSSGradientFriendly';
    }

//  check OS
    if (os.indexOf('Win') !== -1){
        $d.isWindows = true;
        htmlClass += ' Windows';
    } else if (os.indexOf('Mac') !== -1){
        $d.isMac = true;
        htmlClass += ' Mac';
    } else if ((os.indexOf('iPhone') !== -1) || (os.indexOf('iPod') !== -1)){
        $d.isIPhone = true;
        htmlClass += ' iPhone';
    } else if (browser.indexOf('Android') !== -1){
        $d.isAndroid = true;
        htmlClass += ' Android';
        if (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.0")){
            browser += ' isNewAndroid';
        } else {
            $d.isOldAndroid = true;
            browser += ' isOldAndroid';
        }
    } else if (os.indexOf('iPad') !== -1){
        $d.isIPad = true;
        htmlClass += ' iPad';
    }
    if ((window.devicePixelRatio !== undefined) && (window.devicePixelRatio > 1)) {
        $d.isRetina = true;
        htmlClass += ' isRetina';
    } else{
        htmlClass += ' isNotRetina';
    }
    $d.isTouch = $d.isIPad || $d.isIPhone || $d.isAndroid || false;
    htmlClass += $d.isTouch ? ' isTouch' : ' isNotTouch';


//  check browser and version
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
        if (document.documentMode !== undefined){
            $d.browserVersion = document.documentMode;
        } else if (document.compatMode === 'CSS1Compat'){
            $d.browserVersion = parseFloat(browserVersion);
        } else{
            $d.browserVersion = 5;
        }
        $d.isIE = true;
        htmlClass += ' isIE IE_' + $d.browserVersion;
        if ($d.browserVersion < 9){
            $d.isOldIE = true;
            htmlClass += ' isOldIE';
        } else{
            htmlClass += ' isNewIE';
        }
    } else if (browser.safari === true){
//      переопределяю browser, так как $.browser.version в Сафари передает номер сборки
        browser = navigator.userAgent;
        $d.browserVersion = parseFloat(browser.substr(browser.indexOf('Version/') + 8, 4));
        $d.isSafari = $d.isWebKit = true;
        htmlClass += ' isSafari isWebKit isNoIE SF_' + $d.browserVersion;
        if ($d.browserVersion < 4){
            htmlClass += ' OldSF';
            $d.isOld = true;
        }
    } else if (browser.opera === true){
        $d.browserVersion = parseInt(browserVersion);
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

//  check CSS-features in browser
    $d.isTransitions = testProperty('transition');
    $d.isTransforms = testProperty('transform');
    $d.isAnimation = testProperty('animation');
    $d.isPerspective = testProperty('perspective');
    $d.isBorderRadius = testProperty('borderRadius', 'border-radius');
    $d.isBoxShadow = testProperty('boxShadow', 'box-shadow');
    htmlClass += $d.isBorderRadius ? ' isBoxShadowFriendly' : ' isBoxShadowUnfriendly';
    htmlClass += $d.isBorderRadius ? ' isRBSFriendly' : ' isRBSUnfriendly';
    if ((($d.isIPad || $d.isIPhone) && (browser.safari === true)) || ($d.isAndroid && (browser.safari === true)) || ($d.isChrome && ($d.browserVersion >= 16)) || ($d.isSafari && ($d.browserVersion >= 5))){
        addGradientSupport('-webkit-');
    } else if ($d.isFx && ($d.browserVersion >= 3.6)){
        addGradientSupport('-moz-');
    } else if ($d.isOpera && ($d.browserVersion >= 11.6)){
        addGradientSupport('-o-');
    } else if ($d.isIE && ($d.browserVersion >= 10)){
        addGradientSupport('-ms-');
    } else{
        htmlClass += ' isCSSGradientUnfriendly';
        $d.isCSSGradient = false;
    }
//  attention! reusing var Property!
    upperProperty = html.className;
    if (upperProperty.indexOf('noJS') !== -1){
        html.className = upperProperty.replace('noJS', '');
    }
    htmlClass += $d.isCSSGradient && $d.isBoxShadow && $d.isBorderRadius ? ' isCSSModernBrowser' : 'isCSSNotModernBrowser';

    $(html).addClass(htmlClass);

    htmlClass = i = iMax = upperProperty = testElemStyle = jsStylePrefixes = cssStylePrefixes = os = browser = testProperty = null;
    return $d;
}();