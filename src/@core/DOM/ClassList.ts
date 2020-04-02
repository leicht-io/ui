import { QuerySelector } from './QuerySelector';

export class ClassList {

    private static getElement(queryOrElement: string | Element): Element | null {
        let element: Element | null = null;
        if (queryOrElement.constructor === String) {
            element = QuerySelector.get(queryOrElement as string);
        } else {
            element = queryOrElement as Element;
        }

        return element;
    }

    public static remove(queryOrElement: string | Element, classes: string[] | string): void {
        const element: Element | null = this.getElement(queryOrElement);

        if (element) {
            if (classes.constructor === String) {
                element.classList.remove(classes as string);
            }

            if (classes.constructor === Array) {
                for (let i = 0; i < classes.length; i++) {
                    const className: string = classes[i];
                    element.classList.remove(className);
                }
            }
        }
    }

    public static add(queryOrElement: string | Element, classes: string[] | string): void {
        const element: Element | null = this.getElement(queryOrElement);

        if (element) {
            if (classes.constructor === String) {
                element.classList.add(classes as string);
            }

            if (classes.constructor === Array) {
                for (let i = 0; i < classes.length; i++) {
                    const className: string = classes[i];
                    element.classList.add(className);
                }
            }
        }
    }
}
