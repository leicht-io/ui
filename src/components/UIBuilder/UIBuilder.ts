export interface BaseConfig {
}

export class BaseComponent<TConfig extends BaseConfig> {
    public config: TConfig | undefined;

    public constructor(config?: TConfig) {
        this.config = config;
    }

    render(): void {

    }
}

export interface ComponentConstructor<TConfig extends BaseConfig> {
    new(config?: TConfig): BaseComponent<TConfig>;
}

export class UIBuilder {
    private components: { component: ComponentConstructor<any>, args?: BaseConfig }[] = [];

    constructor() {
        return this;
    }

    public with<TConfig extends BaseConfig>(component: ComponentConstructor<TConfig>, args?: TConfig): UIBuilder {
        this.components.push({component, args});

        return this;
    }

    public run() {
        for (const {component, args} of this.components) {
            const baseComponent = new component(args);
            baseComponent.render();
        }
    }
}
