import { UIModalInterface } from "./UIModalInterface";
import { UIComponent } from "../../@core/base/UIComponent";
export declare class UIModal extends UIComponent {
    private f;
    constructor(content: UIModalInterface);
    private getParentContainer;
    private hideModal;
    private toggleScroll;
    private showModal;
    addEventListeners(): void;
    private handleCloseButtonClick;
    private handleContainerClick;
    private handleKeyDown;
    removeEventListeners(): void;
    onRendered(): void;
    render(): string;
}
