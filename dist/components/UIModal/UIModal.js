import { UIComponent } from "../../@core/base/UIComponent";
import { QuerySelector } from "../../@core/DOM/QuerySelector";
import { ClassList } from "../../@core/DOM/ClassList";
import { Event } from "../../@core/DOM/models/Event";
export class UIModal extends UIComponent {
    constructor(content) {
        super(content);
        this.keyDownCallback = (event) => this.handleKeyDown(event);
    }
    getParentContainer() {
        return QuerySelector.get(".ui-modal--container");
    }
    hideModal() {
        this.removeEventListeners();
        const parentContainer = this.getParentContainer();
        if (parentContainer) {
            ClassList.remove(this.getParentContainer(), "ui-modal--container--visible");
        }
        this.toggleScroll(false);
        this.destroy();
    }
    toggleScroll(enable) {
        const body = QuerySelector.get("body");
        if (body) {
            if (enable) {
                ClassList.add(body, ['body--disable-scroll']);
            }
            else {
                ClassList.remove(body, ['body--disable-scroll']);
            }
        }
    }
    showModal() {
        this.toggleScroll(true);
        ClassList.add(this.getParentContainer(), ["ui-modal--container--visible"]);
    }
    addEventListeners() {
        const closeBtn = QuerySelector.get(".ui-modal--buttons-close");
        if (closeBtn) {
            closeBtn.addEventListener(Event.CLICK, () => {
                this.handleCloseButtonClick();
            });
        }
        this.getParentContainer().addEventListener(Event.CLICK, (event) => {
            this.handleContainerClick(event);
        });
        document.addEventListener(Event.KEYDOWN, this.keyDownCallback);
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
        if (event.key === "Escape") {
            this.hideModal();
        }
    }
    removeEventListeners() {
        document.removeEventListener(Event.KEYDOWN, this.keyDownCallback);
        const closeBtn = QuerySelector.get(".ui-modal--buttons-close");
        if (closeBtn) {
            closeBtn.removeEventListener(Event.CLICK, (event) => {
                this.handleContainerClick(event);
            });
        }
        const parentContainer = this.getParentContainer();
        if (parentContainer) {
            parentContainer.removeEventListener(Event.CLICK, () => {
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
                </div>`;
    }
}
//# sourceMappingURL=UIModal.js.map