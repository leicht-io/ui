import { DOM } from '../../@core/DOM/DOM';
var UILoader = (function () {
    function UILoader() {
    }
    UILoader.getLoader = function () {
        var loader = DOM.createElement('div', '<div class="double-bounce1"></div><div class="double-bounce2"></div>');
        loader.classList.add('ui-loader');
        loader.id = Math.random().toString(36).substr(2, 9);
        return loader;
    };
    UILoader.removeLoader = function (id) {
        var loader = document.getElementById(id);
        if (loader && loader.parentNode) {
            loader.classList.add('ui-loader--fade-out');
            setTimeout(function () {
                if (loader && loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 250);
        }
    };
    return UILoader;
}());
export { UILoader };
//# sourceMappingURL=UILoader.js.map