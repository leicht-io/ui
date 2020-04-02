import { QuerySelector } from './QuerySelector';
var DOM = (function () {
    function DOM() {
    }
    DOM.removeChildren = function (query) {
        var parent = QuerySelector.get(query);
        if (parent) {
            parent.innerHTML = '';
        }
    };
    DOM.createElement = function (tagName, innerHtml, className) {
        var element = document.createElement(tagName);
        if (innerHtml) {
            element.innerHTML = innerHtml;
        }
        if (className) {
            element.classList.add(className);
        }
        return element;
    };
    DOM.append = function (queryOrElementToAppendTo, childToAppend) {
        var element = null;
        if (queryOrElementToAppendTo.constructor === String) {
            element = QuerySelector.get(queryOrElementToAppendTo);
        }
        else {
            element = queryOrElementToAppendTo;
        }
        element.append(childToAppend);
    };
    return DOM;
}());
export { DOM };
//# sourceMappingURL=DOM.js.map