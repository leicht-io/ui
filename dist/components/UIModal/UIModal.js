import { UIComponent } from "../../@core/base/UIComponent";
import { DOM } from "../../@core/utils/DOM";
export class UIModal extends UIComponent {
    constructor(content) {
        super(content);
    }
    getParentContainer() {
        return DOM.query(".ui-modal--container");
    }
    hideModal() {
        this.getParentContainer().classList.remove("ui-modal--container--visible");
    }
    showModal() {
        this.getParentContainer().classList.add("ui-modal--container--visible");
    }
    addEventListeners() {
        DOM.query(".ui-modal--buttons-close").addEventListener("click", () => {
            this.hideModal();
        });
        this.getParentContainer().addEventListener("click", (event) => {
            if (event.target.isSameNode(this.getParentContainer())) {
                this.hideModal();
                this.destroy();
            }
        });
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