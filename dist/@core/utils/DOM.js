export class DOM {
    static removeChildren(query) {
        const parent = document.querySelector(query);
        if (parent) {
            parent.innerHTML = "";
        }
    }
    static createElement(tagName, innerHtml) {
        const element = document.createElement(tagName);
        if (innerHtml) {
            element.innerHTML = innerHtml;
        }
        return element;
    }
    static appendElement(queryOrElementToAppendTo, childToAppend) {
        let element = null;
        if (queryOrElementToAppendTo.constructor === String) {
            element = DOM.query(queryOrElementToAppendTo);
        }
        else {
            element = queryOrElementToAppendTo;
        }
        element.append(childToAppend);
    }
    static removeClasses(queryOrElement, classes) {
        let element = null;
        if (queryOrElement.constructor === String) {
            element = DOM.query(queryOrElement);
        }
        else {
            element = queryOrElement;
        }
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
    static addClasses(queryOrElement, classes) {
        let element = null;
        if (queryOrElement.constructor === String) {
            element = DOM.query(queryOrElement);
        }
        else {
            element = queryOrElement;
        }
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
    static query(query) {
        const element = document.querySelector(query);
        if (element) {
            return element;
        }
        return null;
    }
    static generateUUID(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
//# sourceMappingURL=DOM.js.map