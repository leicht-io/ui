import {BaseComponent, BaseConfig} from "../UIBuilder/UIBuilder";

export class UIReadingPositionIndicator extends BaseComponent<BaseConfig> {
    private windowHeight: number = 0;
    private documentHeight: number = 0;
    private progressBar: HTMLElement | null = null;

    constructor(config?: BaseConfig) {
        super(config);

        requestAnimationFrame(() => {
            this.windowHeight = window.innerHeight;
            this.documentHeight = document.documentElement.scrollHeight;
            this.progressBar = document.querySelector("progress.ui-reading-position-indicator");

            this.setMax();
        });
    }

    private setProgress(): void {
        if (!this.progressBar) {
            return;
        }

        this.progressBar.setAttribute('value', window.pageYOffset.toString());
    }

    private setMax(): void {
        if (!this.progressBar) {
            return;
        }

        const max: number = this.documentHeight - this.windowHeight;

        this.progressBar.setAttribute('max', max.toString());
    }

    public render() {
        this.setProgress();

        window.addEventListener("scroll", () => {
            this.setProgress();
        })
    }
}
