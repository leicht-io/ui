import {UIModalInterface} from "./UIModalInterface";
import {UIComponent} from "../../@core/base/UIComponent";
import "./UIModal.scss";

export class UIModal extends UIComponent {
    constructor(content: UIModalInterface) {
        super(content);
    }

    public render(): string {
        return `<div class="ui-modal--container">
    <div class="ui-modal--wrapper">
        <div class="ui-modal--title-wrapper">
            <div class="ui-modal--title">${this.properties.title}</div>
            <div class="ui-modal--buttons"><div class="ui-modal--buttons-close">&#10005;</div> </div>
        </div>
        <div class="ui-modal--content--wrapper">
            <div class="ui-modal--content"></div>
        </div>
    </div>
</div>
            `;
    }

}