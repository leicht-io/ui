import {UIModalInterface} from "./UIModalInterface";
import {UIComponent} from "../../@core/base/UIComponent";
import {DOM} from "../../@core/utils/DOM";

export class UIModal extends UIComponent {
    private f = (event) => this.handleKeyDown(event);

    constructor(content: UIModalInterface) {
        super(content);
    }

    private getParentContainer(): any {
        return DOM.query(".ui-modal--container");
    }

    private hideModal(): void {
        this.removeEventListeners();
        const parentContainer: Element = this.getParentContainer();
        if (parentContainer) {
            this.getParentContainer().classList.remove("ui-modal--container--visible");
        }
        this.toggleScroll(false);
        this.destroy();

    }

    private toggleScroll(enable: boolean): void {
        if (enable) {
            DOM.query("body").classList.add("body--disable-scroll");
        } else {
            DOM.query("body").classList.remove("body--disable-scroll");
        }
    }

    private showModal(): void {
        this.toggleScroll(true);
        this.getParentContainer().classList.add("ui-modal--container--visible");
    }

    public addEventListeners(): void {
        const closeBtn: Element | null = DOM.query(".ui-modal--buttons-close");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                this.handleCloseButtonClick();
            });
        }
        this.getParentContainer().addEventListener("click", (event) => {
            this.handleContainerClick(event);
        });

        document.addEventListener("keydown", this.f);
    }

    private handleCloseButtonClick(): void {
        this.hideModal();
    }

    private handleContainerClick(event: Event): void {
        if ((event.target as Node).isSameNode(this.getParentContainer())) {
            this.hideModal();
        }
    }

    private handleKeyDown(event: KeyboardEvent): void {
        console.log("clicked")
        if (event.key === "Escape") {
            this.hideModal();
        }
    }

    public removeEventListeners(): void {
        document.removeEventListener("keydown", this.f);

        const closeBtn: Element | null = DOM.query(".ui-modal--buttons-close");
        if (closeBtn) {
            closeBtn.removeEventListener("click", (event) => {
                this.handleContainerClick(event);
            });
        }

        const parentContainer: Element = this.getParentContainer();
        if (parentContainer) {
            parentContainer.removeEventListener("click", () => {
                this.handleCloseButtonClick();
            });
        }

    }

    public onRendered(): void {
        this.showModal();
        this.addEventListeners();
    }

    public render(): string {
        let content: string | Element = this.properties.content;
        let classes: string = this.properties.iframe ? "ui-modal--container-with-iframe" : "ui-modal--container-with-html";
        if (this.properties.iframe) {
            content = `<iframe src='${this.properties.iframe}'><iframe>`;
        }

        return `<div class="ui-modal--container ${classes}">
    <div class="ui-modal--wrapper">
        <div class="ui-modal--title-wrapper">
            <div class="ui-modal--title"><h5>${this.properties.title}</h5></div>
            <div class="ui-modal--buttons"><div class="ui-modal--buttons-close">&#10005;</div> </div>
        </div>
        <div class="ui-modal--content--wrapper">
            <div class="ui-modal--content">${content}</div>
        </div>
    </div>
</div>
            `;
    }

}
