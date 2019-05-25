export class UIComponent {
    private properties: any;

    constructor(properties: any) {
        this.properties = properties;

        window.addEventListener('DOMContentLoaded', (event) => {
            const content: any = this.render();
            this.addContentToDOM(content);
        });
    }

    public render(): void {
    }

    private addContentToDOM(content: string): void {
        document.querySelector(this.properties.container).innerHTML = content;
    }
}