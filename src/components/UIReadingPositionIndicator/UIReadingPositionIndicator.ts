import {BaseComponent, BaseConfig} from "../UIBuilder/UIBuilder";

export class UIReadingPositionIndicator extends BaseComponent<BaseConfig> {
    constructor(config?: BaseConfig) {
        super(config);
    }

    private cycle(progressBar: HTMLElement | null): void {
        this.setMax(progressBar);
        this.setProgress(progressBar)
    }

    private setProgress(progressBar: HTMLElement | null): void {
        if (!progressBar) {
            return;
        }

        progressBar.setAttribute('value', window.pageYOffset.toString());
    }

    private setMax(progressBar: HTMLElement | null): void {
        if (!progressBar) {
            return;
        }

        const windowHeight: number = window.innerHeight;
        const documentHeight: number = document.documentElement.offsetHeight;
        const max: number = documentHeight - windowHeight;

        progressBar.setAttribute('max', max.toString());
    }

    public render() {
        const progressBar: HTMLElement | null = document.querySelector("progress.ui-reading-position-indicator");

        this.cycle(progressBar);
        window.addEventListener("scroll", () => {
            this.cycle(progressBar);
        })
    }
}
