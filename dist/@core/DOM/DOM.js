import { QuerySelector } from "./QuerySelector";
export class DOM {
    static removeChildren(query) {
        const parent = QuerySelector.get(query);
        if (parent) {
            parent.innerHTML = "";
        }
    }
    static createElement(tagName, innerHtml, className) {
        const element = document.createElement(tagName);
        if (innerHtml) {
            element.innerHTML = innerHtml;
        }
        if (className) {
            element.classList.add(className);
        }
        return element;
    }
    static append(queryOrElementToAppendTo, childToAppend) {
        let element = null;
        if (queryOrElementToAppendTo.constructor === String) {
            element = QuerySelector.get(queryOrElementToAppendTo);
        }
        else {
            element = queryOrElementToAppendTo;
        }
        element.append(childToAppend);
    }
}
//# sourceMappingURL=DOM.js.map