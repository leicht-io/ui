import { UIModalInterface } from "./UIModalInterface";
import { UIComponent } from "../../@core/base/UIComponent";
import "./UIModal.scss";
export declare class UIModal extends UIComponent {
    constructor(content: UIModalInterface);
    render(): string;
}
