import { UIModalInterface } from "./UIModalInterface";
import { UIComponent } from "../../base/UIComponent";
export declare class UIModal extends UIComponent {
    constructor(content: UIModalInterface);
    render(): string;
}
