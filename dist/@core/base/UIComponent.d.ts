export declare class UIComponent {
    properties: any;
    private id;
    private timeout;
    constructor(properties: any);
    destroy(): void;
    render(): void;
    onRendered(): void;
    private addContentToDOM;
}
