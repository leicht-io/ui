import { UUID } from "../utils/UUID";
import { QuerySelector } from "../DOM/QuerySelector";
export class UIComponent {
    constructor(properties) {
        this.id = UUID.generate(8);
        this.properties = properties;
        const content = this.render();
        this.addContentToDOM(content);
    }
    destroy() {
        this.timeout = setTimeout(() => {
            const container = QuerySelector.get("#" + this.id);
            if (container) {
                container.outerHTML = "";
            }
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
        }, 350);
    }
    render() {
    }
    onRendered() {
    }
    addContentToDOM(content) {
        const element = document.createElement('div');
        element.innerHTML = content;
        element.id = this.id;
        const container = QuerySelector.get(this.properties.container);
        if (container) {
            container.appendChild(element);
        }
        setTimeout(() => {
            this.onRendered();
        }, 0);
    }
}
//# sourceMappingURL=UIComponent.js.map