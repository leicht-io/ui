export declare class DOM {
    static removeChildren(query: string): void;
    static createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, innerHtml?: string, className?: string): HTMLElementTagNameMap[K];
    static append<K extends keyof HTMLElementTagNameMap>(queryOrElementToAppendTo: string | HTMLElementTagNameMap[K], childToAppend: any): void;
}
