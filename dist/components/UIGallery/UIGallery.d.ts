import { UIGalleryOptions } from "./UIGalleryOptions";
import { BaseComponent } from "../UIBuilder/UIBuilder";
export declare class UIGallery extends BaseComponent<UIGalleryOptions> {
    private nextSource;
    private previousSource;
    private currentImage;
    private currentIndex;
    private photos;
    private options;
    constructor(config?: UIGalleryOptions);
    private getBody;
    private getWrapper;
    private removePopUpWrapperFromDom;
    private addPopUpWrapperToDom;
    private hideImage;
    private isWrapperVisible;
    private toggleScroll;
    private showImage;
    private addListeners;
    private addKeyEventListeners;
    private setNextAndPrevImage;
    render(): void;
}
