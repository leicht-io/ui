import { BaseComponent, BaseConfig } from "../UIBuilder/UIBuilder";
export declare class UIReadingPositionIndicator extends BaseComponent<BaseConfig> {
    private windowHeight;
    private documentHeight;
    private progressBar;
    constructor(config?: BaseConfig);
    private calculateDimensions;
    private setProgress;
    private setMax;
    render(): void;
}
