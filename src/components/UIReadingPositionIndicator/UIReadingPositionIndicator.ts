import {BaseComponent, BaseConfig} from "../UIBuilder/UIBuilder";
import {QuerySelector} from "../../@core/DOM/QuerySelector";
import {Attribute} from "../../@core/DOM/models/Attribute";
import {Event} from "../../@core/DOM/models/Event";

export class UIReadingPositionIndicator extends BaseComponent<BaseConfig> {
    private windowHeight: number = 0;
    private documentHeight: number = 0;
    private progressBar: HTMLElement | null = null;

    constructor(config?: BaseConfig) {
        super(config);

        requestAnimationFrame(() => {
            this.calculateDimensions();
        });
    }

    private calculateDimensions(): void {
        this.windowHeight = window.innerHeight;
        this.documentHeight = document.documentElement.scrollHeight;
        this.progressBar = QuerySelector.get("progress.ui-reading-position-indicator");

        this.setMax();
    }

    private setProgress(): void {
        if (!this.progressBar) {
            return;
        }

        this.progressBar.setAttribute(Attribute.VALUE, window.pageYOffset.toString());
    }

    private setMax(): void {
        if (!this.progressBar) {
            return;
        }

        const max: number = this.documentHeight - this.windowHeight;

        this.progressBar.setAttribute(Attribute.MAX, max.toString());
    }

    public render() {
        requestAnimationFrame(() => {
            this.setProgress();
        });

        window.addEventListener(Event.SCROLL, () => {
            this.setProgress();
        });

        const container = document.querySelector('.page-container');
        // @ts-ignore
        if (container && typeof ResizeObserver === "function") {
            // @ts-ignore
            new ResizeObserver(entries => {
                this.calculateDimensions();
            }).observe(container);
        }
    }
}
