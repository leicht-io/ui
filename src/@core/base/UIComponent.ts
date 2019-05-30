import {DOM} from "../utils/DOM";

export class UIComponent {
    public properties: any;
    private id: string = DOM.generateUUID(8);
    private timeout: any;

    constructor(properties: any) {
        this.properties = properties;

        const content: any = this.render();
        this.addContentToDOM(content);
    }

    public destroy(): void {
        this.timeout = setTimeout(() => {
            const container: Element | null = DOM.query("#" + this.id);
            if (container) {
                container.outerHTML = "";
            }

            if (this.timeout) {
                clearTimeout(this.timeout);
            }
        }, 350);
    }

    public render(): void {
    }

    public onRendered(): void {
    }

    private addContentToDOM(content: string): void {
        const element = document.createElement('div');
        element.innerHTML = content;
        element.id = this.id;

        const container: Element | null = DOM.query(this.properties.container);
        if (container) {
            container.appendChild(element);
        }

        setTimeout(() => {
            this.onRendered();
        }, 0);
    }
}