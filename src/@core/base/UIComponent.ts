export class UIComponent {
    public properties: any;

    constructor(properties: any) {
        this.properties = properties;

        const content: any = this.render();
        this.addContentToDOM(content);
    }

    public render(): void {
    }

    private addContentToDOM(content: string): void {
        const element = document.createElement('div');
        element.innerHTML = content;

        document.querySelector(this.properties.container).appendChild(element);
    }
}