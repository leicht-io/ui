import { BaseComponent } from "../UIBuilder/UIBuilder";
import { QuerySelector } from "../../@core/DOM/QuerySelector";
import { Attribute } from "../../@core/DOM/models/Attribute";
import { Event } from "../../@core/DOM/models/Event";
export class UIReadingPositionIndicator extends BaseComponent {
    constructor(config) {
        super(config);
        this.windowHeight = 0;
        this.documentHeight = 0;
        this.progressBar = null;
        requestAnimationFrame(() => {
            this.calculateDimensions();
        });
    }
    calculateDimensions() {
        this.windowHeight = window.innerHeight;
        this.documentHeight = document.documentElement.scrollHeight;
        this.progressBar = QuerySelector.get("progress.ui-reading-position-indicator");
        this.setMax();
    }
    setProgress() {
        if (!this.progressBar) {
            return;
        }
        this.progressBar.setAttribute(Attribute.VALUE, window.pageYOffset.toString());
    }
    setMax() {
        if (!this.progressBar) {
            return;
        }
        const max = this.documentHeight - this.windowHeight;
        this.progressBar.setAttribute(Attribute.MAX, max.toString());
    }
    render() {
        requestAnimationFrame(() => {
            this.setProgress();
        });
        window.addEventListener(Event.SCROLL, () => {
            this.setProgress();
        });
        const container = document.querySelector('.page-container');
        if (container && typeof ResizeObserver === "function") {
            new ResizeObserver(entries => {
                this.calculateDimensions();
            }).observe(container);
        }
    }
}
//# sourceMappingURL=UIReadingPositionIndicator.js.map