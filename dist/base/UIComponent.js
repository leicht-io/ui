export class UIComponent {
    constructor(properties) {
        this.properties = properties;
        window.addEventListener('DOMContentLoaded', (event) => {
            const content = this.render();
            this.addContentToDOM(content);
        });
    }
    render() {
    }
    addContentToDOM(content) {
        document.querySelector(this.properties.container).innerHTML = content;
    }
}
//# sourceMappingURL=UIComponent.js.map