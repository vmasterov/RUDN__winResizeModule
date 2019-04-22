;
var resize = (function () {
    var width = function width(settings) {
        var arg = [].slice.call(arguments, 1),
            winWidth = $(window).width(),
            namespace = settings.userNamespace || 'defaultWidthNamespace',
            timerId;

        if (settings.off !== true) {
            $(window).on('resize.' + namespace, wrapper);
        }
        else {
            $(window).off('resize.' + namespace);
        }

        // Helpers
        function wrapper() {
            if (windowWidth === $(window).width()) {
                return;
            }

            windowWidth = $(window).width();

            if (timerId) {
                clearTimeout(timerId);
            }

            // This function was called once after resize event
            timerId = setTimeout(function () {
                settings.userFunction.apply(null, arg);
                clearTimeout(timerId);
            }, 250);
            // This function was called once after resize event
        }
    };

    var height = function height(settings) {
        var arg = [].slice.call(arguments, 1),
            winHeight = $(window).height(),
            namespace = settings.userNamespace || 'defaultHeightNamespace',
            timerId;

        if (settings.off !== true) {
            $(window).on('resize.' + namespace, wrapper);
        }
        else {
            $(window).off('resize.' + namespace);
        }

        // Helpers
        function wrapper() {
            if (winHeight === $(window).height()) {
                return;
            }

            winHeight = $(window).height();

            if (timerId) {
                clearTimeout(timerId);
            }

            // This function was called once after resize event
            timerId = setTimeout(function () {
                settings.userFunction.apply(null, arg);
                clearTimeout(timerId);
            }, 250);
            // This function was called once after resize event
        }
    };

    var both = function both(context, func) {
        var arg = [].slice.call(arguments, 2),
            timerId;

        $(window).on('resize', function () {
            if (timerId) {
                clearTimeout(timerId);
            }

            timerId = setTimeout(function () {
                func.apply(context, arg);
                clearTimeout(timerId);
            }, 150);
        });
    };

    return {
        width: width,
        height: height,
        both: both
    };
})();