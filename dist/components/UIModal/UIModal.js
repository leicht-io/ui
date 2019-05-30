import { UIComponent } from "../../@core/base/UIComponent";
import { DOM } from "../../@core/utils/DOM";
export class UIModal extends UIComponent {
    constructor(content) {
        super(content);
        this.f = (event) => this.handleKeyDown(event);
    }
    getParentContainer() {
        return DOM.query(".ui-modal--container");
    }
    hideModal() {
        this.removeEventListeners();
        const parentContainer = this.getParentContainer();
        if (parentContainer) {
            this.getParentContainer().classList.remove("ui-modal--container--visible");
        }
        this.destroy();
    }
    showModal() {
        this.getParentContainer().classList.add("ui-modal--container--visible");
    }
    addEventListeners() {
        const closeBtn = DOM.query(".ui-modal--buttons-close");
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
    handleCloseButtonClick() {
        this.hideModal();
    }
    handleContainerClick(event) {
        if (event.target.isSameNode(this.getParentContainer())) {
            this.hideModal();
        }
    }
    handleKeyDown(event) {
        console.log("clicked");
        if (event.key === "Escape") {
            this.hideModal();
        }
    }
    removeEventListeners() {
        document.removeEventListener("keydown", this.f);
        const closeBtn = DOM.query(".ui-modal--buttons-close");
        if (closeBtn) {
            closeBtn.removeEventListener("click", (event) => {
                this.handleContainerClick(event);
            });
        }
        const parentContainer = this.getParentContainer();
        if (parentContainer) {
            parentContainer.removeEventListener("click", () => {
                this.handleCloseButtonClick();
            });
        }
    }
    onRendered() {
        this.showModal();
        this.addEventListeners();
    }
    render() {
        let content = this.properties.content;
        let classes = this.properties.iframe ? "ui-modal--container-with-iframe" : "ui-modal--container-with-html";
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
//# sourceMappingURL=UIModal.js.map