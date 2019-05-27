import { UIModalInterface } from "./UIModalInterface";
import { UIComponent } from "../../@core/base/UIComponent";
export declare class UIModal extends UIComponent {
    constructor(content: UIModalInterface);
    private getParentContainer;
    private hideModal;
    private showModal;
    addEventListeners(): void;
    onRendered(): void;
    render(): string;
}
