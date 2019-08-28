export declare class DOM {
    static removeChildren(query: string): void;
    static createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, innerHtml?: string): HTMLElementTagNameMap[K];
    static appendElement<K extends keyof HTMLElementTagNameMap>(queryOrElementToAppendTo: string | HTMLElementTagNameMap[K], childToAppend: any): void;
    static removeClasses(queryOrElement: string | Element, classes: string[] | string): void;
    static addClasses(queryOrElement: string | Element, classes: string[] | string): void;
    static query(query: string): HTMLElement | null;
    static generateUUID(length: number): string;
}
