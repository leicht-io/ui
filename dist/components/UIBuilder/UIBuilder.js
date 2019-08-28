export class BaseComponent {
    constructor(config) {
        this.config = config;
    }
    render() {
    }
}
export class UIBuilder {
    constructor() {
        this.components = [];
        return this;
    }
    with(component, args) {
        this.components.push({ component, args });
        return this;
    }
    run() {
        for (const { component, args } of this.components) {
            const baseComponent = new component(args);
            baseComponent.render();
        }
    }
}
//# sourceMappingURL=UIBuilder.js.map