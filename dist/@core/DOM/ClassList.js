import { QuerySelector } from "./QuerySelector";
export class ClassList {
    static getElement(queryOrElement) {
        let element = null;
        if (queryOrElement.constructor === String) {
            element = QuerySelector.get(queryOrElement);
        }
        else {
            element = queryOrElement;
        }
        return element;
    }
    static remove(queryOrElement, classes) {
        const element = this.getElement(queryOrElement);
        if (element) {
            if (classes.constructor === String) {
                element.classList.remove(classes);
            }
            if (classes.constructor === Array) {
                for (let i = 0; i < classes.length; i++) {
                    const className = classes[i];
                    element.classList.remove(className);
                }
            }
        }
    }
    static add(queryOrElement, classes) {
        const element = this.getElement(queryOrElement);
        if (element) {
            if (classes.constructor === String) {
                element.classList.add(classes);
            }
            if (classes.constructor === Array) {
                for (let i = 0; i < classes.length; i++) {
                    const className = classes[i];
                    element.classList.add(className);
                }
            }
        }
    }
}
//# sourceMappingURL=ClassList.js.map