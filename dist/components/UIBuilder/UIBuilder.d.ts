export interface BaseConfig {
}
export declare class BaseComponent<TConfig extends BaseConfig> {
    config: TConfig | undefined;
    constructor(config?: TConfig);
    render(): void;
}
export interface ComponentConstructor<TConfig extends BaseConfig> {
    new (config?: TConfig): BaseComponent<TConfig>;
}
export declare class UIBuilder {
    private components;
    constructor();
    with<TConfig extends BaseConfig>(component: ComponentConstructor<TConfig>, args?: TConfig): UIBuilder;
    run(): void;
}
