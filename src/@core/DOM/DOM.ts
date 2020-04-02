import { QuerySelector } from './QuerySelector';

export class DOM {
    public static removeChildren(query: string): void {
        const parent: any = QuerySelector.get(query);
        if (parent) {
            parent.innerHTML = '';
        }
    }

    public static createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, innerHtml?: string, className?: string): HTMLElementTagNameMap[K] {
        const element: HTMLElementTagNameMap[K] = document.createElement(tagName);
        if (innerHtml) {
            element.innerHTML = innerHtml;
        }

        if (className) {
            element.classList.add(className);
        }

        return element;
    }

    public static append<K extends keyof HTMLElementTagNameMap>(queryOrElementToAppendTo: string | HTMLElementTagNameMap[K], childToAppend: any): void {
        let element: HTMLElement | null = null;
        if (queryOrElementToAppendTo.constructor === String) {
            element = QuerySelector.get(queryOrElementToAppendTo as string) as HTMLElement;
        } else {
            element = queryOrElementToAppendTo as HTMLElement;
        }

        element.append(childToAppend);
    }
}
