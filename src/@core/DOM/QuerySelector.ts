export class QuerySelector {
    public static get(query: string): HTMLElement | null {
        return document.querySelector(query);
    }

    public static getAll(query: string): NodeListOf<Element> {
        return document.querySelectorAll(query);
    }
}
