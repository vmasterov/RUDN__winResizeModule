;
var resize = (function () {
    var width = function width(settings) {
        var arg = [].slice.call(arguments, 1),
            winWidth = $(window).width(),
            namespace = settings.userNamespace || 'defaultWidthNamespace',
            timerId;

        if (settings.off !== true) {
            $(window).on('resize.' + namespace, function() {
                _wrapper(winWidth);
            });
        }
        else {
            $(window).off('resize.' + namespace);
        }
    };

    var height = function height(settings) {
        var arg = [].slice.call(arguments, 1),
            winHeight = $(window).height(),
            namespace = settings.userNamespace || 'defaultHeightNamespace',
            timerId;

        if (settings.off !== true) {
            $(window).on('resize.' + namespace, function() {
                _wrapper(winHeight);
            });
        }
        else {
            $(window).off('resize.' + namespace);
        }
    };

    var both = function width(context, func) {
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

    // Helpers
        function _wrapper(dimension) {
            if (dimension === $(window).width()) {
                return;
            }

            dimension = $(window).width();

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

    return {
        width: width,
        height: height,
        both: both
    };
})();