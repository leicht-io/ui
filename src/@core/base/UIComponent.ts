import {DOM} from "../utils/DOM";

export class UIComponent {
    public properties: any;
    private id: string = DOM.generateUUID(8);

    constructor(properties: any) {
        this.properties = properties;

        const content: any = this.render();
        this.addContentToDOM(content);
    }

    public destroy(): void {
        setTimeout(() => {
            DOM.query("#" + this.id).outerHTML = "";
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

        DOM.query(this.properties.container).appendChild(element);

        setTimeout(() => {
            this.onRendered();
        }, 0);
    }
}