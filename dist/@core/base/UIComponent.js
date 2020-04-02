import { UUID } from '../utils/UUID';
import { QuerySelector } from '../DOM/QuerySelector';
var UIComponent = (function () {
    function UIComponent(properties) {
        this.id = UUID.generate(8);
        this.properties = properties;
        var content = this.render();
        this.addContentToDOM(content);
    }
    UIComponent.prototype.destroy = function () {
        var _this = this;
        this.timeout = setTimeout(function () {
            var container = QuerySelector.get('#' + _this.id);
            if (container) {
                container.outerHTML = '';
            }
            if (_this.timeout) {
                clearTimeout(_this.timeout);
            }
        }, 350);
    };
    UIComponent.prototype.render = function () {
        return;
    };
    UIComponent.prototype.onRendered = function () {
        return;
    };
    UIComponent.prototype.addContentToDOM = function (content) {
        var _this = this;
        var element = document.createElement('div');
        element.innerHTML = content;
        element.id = this.id;
        var container = QuerySelector.get(this.properties.container);
        if (container) {
            container.appendChild(element);
        }
        setTimeout(function () {
            _this.onRendered();
        }, 0);
    };
    return UIComponent;
}());
export { UIComponent };
//# sourceMappingURL=UIComponent.js.map