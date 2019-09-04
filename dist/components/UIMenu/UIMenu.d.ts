import { BaseComponent, BaseConfig } from "../UIBuilder/UIBuilder";
export declare class UIMenu extends BaseComponent<BaseConfig> {
    private xDown;
    private yDown;
    private xDiff;
    private yDiff;
    private timeDown;
    private startEl;
    private timer;
    private throttleDelay;
    private last;
    private initialLoad;
    constructor(config?: BaseConfig);
    private addCustomEvent;
    private handleInitialLoad;
    private setActiveLinkItem;
    private setListeners;
    private setScrollListeners;
    private setTouchListeners;
    private setClickListeners;
    private toggleMenu;
    private throttle;
    private getHeaderElement;
    private handleScrollClasses;
    private toggleMenuChevrons;
    private toggleHamburger;
    private onScroll;
    private handleTouchEnd;
    private handleTouchStart;
    private handleTouchMove;
    render(): void;
}