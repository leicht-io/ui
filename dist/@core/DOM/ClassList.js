import { QuerySelector } from './QuerySelector';
var ClassList = (function () {
    function ClassList() {
    }
    ClassList.getElement = function (queryOrElement) {
        var element = null;
        if (queryOrElement.constructor === String) {
            element = QuerySelector.get(queryOrElement);
        }
        else {
            element = queryOrElement;
        }
        return element;
    };
    ClassList.remove = function (queryOrElement, classes) {
        var element = this.getElement(queryOrElement);
        if (element) {
            if (classes.constructor === String) {
                element.classList.remove(classes);
            }
            if (classes.constructor === Array) {
                for (var i = 0; i < classes.length; i++) {
                    var className = classes[i];
                    element.classList.remove(className);
                }
            }
        }
    };
    ClassList.add = function (queryOrElement, classes) {
        var element = this.getElement(queryOrElement);
        if (element) {
            if (classes.constructor === String) {
                element.classList.add(classes);
            }
            if (classes.constructor === Array) {
                for (var i = 0; i < classes.length; i++) {
                    var className = classes[i];
                    element.classList.add(className);
                }
            }
        }
    };
    return ClassList;
}());
export { ClassList };
//# sourceMappingURL=ClassList.js.map