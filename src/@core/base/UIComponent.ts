import {UUID} from "../utils/UUID";
import {QuerySelector} from "../DOM/QuerySelector";

export class UIComponent {
    public properties: any;
    private id: string = UUID.generate(8);
    private timeout: any;

    constructor(properties: any) {
        this.properties = properties;

        const content: any = this.render();
        this.addContentToDOM(content);
    }

    public destroy(): void {
        this.timeout = setTimeout(() => {
            const container: Element | null = QuerySelector.get("#" + this.id);
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

        const container: Element | null = QuerySelector.get(this.properties.container);
        if (container) {
            container.appendChild(element);
        }

        setTimeout(() => {
            this.onRendered();
        }, 0);
    }
}
