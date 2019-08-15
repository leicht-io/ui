import {BaseConfig, BaseComponent} from "../UIBuilder/UIBuilder";

export class UIMenu extends BaseComponent<BaseConfig> {
        private xDown: any = null;
    private yDown: any = null;
    private xDiff: any = null;
    private yDiff: any = null;
    private timeDown: any = null;
    private startEl: any = null;
    private timer: any = null;
    private throttleDelay: number = 100;
    private last: any = null;
    private initialLoad = true;

    constructor(config?: BaseConfig) {
        super(config);
    }

    // patch CustomEvent to allow constructor creation (IE/Chrome)
    private addCustomEvent(): void {
        if (typeof (window as any).CustomEvent !== 'function') {
            (window as any).CustomEvent = function (event, params) {
                params = params || {bubbles: false, cancelable: false, detail: undefined};
                const evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
            };

            (window as any).CustomEvent.prototype = (window as any).Event.prototype;
        }
    }

    private handleInitialLoad(): void {
        setTimeout(() => {
            const wrapper: any = document.querySelector(".nav-wrapper");
            if (wrapper !== null) {
                if (this.initialLoad && window.pageYOffset > 0) {
                    wrapper.classList.add("disable-animations");

                    this.handleScrollClasses(true);
                    this.toggleMenuChevrons(false);
                    this.toggleHamburger(true);
                } else {
                    wrapper.classList.remove("disable-animations");
                }
            }
            this.initialLoad = false;
        }, 0);
    }

    private setActiveLinkItem(): void {
        document.querySelectorAll(".nav-wrapper a").forEach((anchor: Element) => {
            const pathName = document.location.pathname.split("/")[1];
            const attribute: string | null = anchor.getAttribute("href");
            if (anchor && anchor.parentElement && attribute && attribute.split("/")[1] === pathName) {
                anchor.parentElement.classList.add("active");
            }
        });
    }

    private setListeners(): void {
        this.setTouchListeners();
        this.setClickListeners();
        this.setScrollListeners();
    }

    private setScrollListeners(): void {
        window.addEventListener('scroll', () => {
            this.throttle();
        }, true);
    }

    private setTouchListeners(): void {
        document.addEventListener('touchstart', this.handleTouchStart, false);
        document.addEventListener('touchmove', this.handleTouchMove, false);
        document.addEventListener('touchend', this.handleTouchEnd, false);

        document.addEventListener('swiped-left', () => {
            this.toggleMenu(false);
        });
    }

    private setClickListeners(): void {
        const hamburger: any = document.querySelector(".nav-hamburger");
        const navBackground: any = document.querySelector(".nav-background");
        const dropDownButtons = document.querySelectorAll(".nav-sub-btn");
        const closeBtn: any = document.querySelector(".nav-responsive-header .ui-i--close");

        hamburger.addEventListener("click", () => {
            this.toggleMenu(true);
        });

        navBackground.addEventListener("click", () => {
            this.toggleMenu(false);
        });

        dropDownButtons.forEach((button: any) => {
            button.addEventListener("click", function (event: any) {
                const subContent: any = event.target.parentElement.querySelector(".nav-sub-content");

                if (subContent.classList.contains("nav-sub-content-active")) {
                    subContent.classList.remove("nav-sub-content-active");
                } else {
                    for (let q = 0; q < dropDownButtons.length; q++) {
                        const subParent: any = dropDownButtons[q].parentElement;
                        subParent.getElementsByClassName("nav-sub-content")[0].classList.remove("nav-sub-content-active");
                    }

                    subContent.classList.add("nav-sub-content-active");
                }
            });
        });

        closeBtn.addEventListener("click", () => {
            this.toggleMenu(false);
        });
    }

    private toggleMenu(shouldOpen: boolean): void {
        const body: any = document.getElementsByTagName('body')[0];
        const nav: any = document.getElementsByClassName("nav")[0];
        const navBackground: any = document.getElementsByClassName("nav-background")[0];

        if (shouldOpen) {
            if (nav && nav.style.display !== "block") {
                nav.classList.add("nav-active");
                navBackground.classList.add("nav-background-active");
                body.classList.add("nav--disable-scroll");
            } else {
                nav.classList.remove("nav-active");
                navBackground.classList.remove("nav-background-active");
                body.classList.remove("nav--disable-scroll");
            }
        } else {
            nav.classList.remove("nav-active");
            navBackground.classList.remove("nav-background-active");
            body.classList.remove("nav--disable-scroll");
        }
    }

    private throttle() {
        const now = +new Date();
        if (this.last && now < this.last + this.throttleDelay) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.last = now;
                this.onScroll();
            }, this.throttleDelay);
        } else {
            this.last = now;
            this.onScroll();
        }
    }

    private getHeaderElement() {
        return document.querySelector(".nav-wrapper");
    }

    private handleScrollClasses(showOriginal: boolean): void {
        const header = this.getHeaderElement();

        if (!header) {
            return;
        }

        if (!showOriginal) {
            header.classList.add("nav-wrapper--active");
        } else {
            header.classList.remove("nav-wrapper--active");
        }
    }

    private toggleMenuChevrons(add: boolean): void {
        const menuIcons: any = document.querySelectorAll(".nav-wrapper .ui-i--chevron-down");

        for (const icon of menuIcons) {
            if (add) {
                icon.classList.add("ui-i--white");
                icon.classList.remove("ui-i--gray");
            } else {
                icon.classList.remove("ui-i--white");
                icon.classList.add("ui-i-gray");
            }
        }
    }

    private toggleHamburger(dark: boolean): void {
        document.querySelectorAll(".nav-wrapper .ui-i--hamburger").forEach((hamburger) => {

            if (dark) {
                hamburger.classList.remove("ui-i--white");
                hamburger.classList.remove("ui-i--gray");
            } else {
                hamburger.classList.remove("ui-i--gray");
                hamburger.classList.add("ui-i--white");
            }
        })
    }

    private onScroll() {
        const wrapper: any = document.querySelector(".nav-wrapper");
        if (wrapper !== null) {
            wrapper.classList.remove("disable-animations");
        }

        const header = this.getHeaderElement();

        if (header && window.pageYOffset && !header.classList.contains("nav-wrapper--active")) {
            this.handleScrollClasses(false);
            this.toggleMenuChevrons(false);
            this.toggleHamburger(true);
        } else if (window.pageYOffset === 0) {
            this.handleScrollClasses(true);
            this.toggleMenuChevrons(true);
            this.toggleHamburger(false);
        }
    }

    private handleTouchEnd(e) {
        if (this.startEl !== e.target) return;

        const swipeThreshold = parseInt(this.startEl.getAttribute('data-swipe-threshold') || '20', 10);    // default 10px
        const swipeTimeout = parseInt(this.startEl.getAttribute('data-swipe-timeout') || '500', 10);      // default 1000ms
        const timeDiff = Date.now() - this.timeDown;
        let eventType = '';

        if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) { // most significant
            if (Math.abs(this.xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
                if (this.xDiff > 0) {
                    eventType = 'swiped-left';
                } else {
                    eventType = 'swiped-right';
                }
            }
        } else {
            if (Math.abs(this.yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
                if (this.yDiff > 0) {
                    eventType = 'swiped-up';
                } else {
                    eventType = 'swiped-down';
                }
            }
        }

        if (eventType !== '') {
            this.startEl.dispatchEvent(new CustomEvent(eventType, {bubbles: true, cancelable: true})); // fire event on the element that started the swipe
        }

        this.xDown = null;
        this.yDown = null;
        this.timeDown = null;
    }

    private handleTouchStart(e) {
        if (e.target.getAttribute('data-swipe-ignore') === 'true') return;

        this.startEl = e.target;
        this.timeDown = Date.now();
        this.xDown = e.touches[0].clientX;
        this.yDown = e.touches[0].clientY;
        this.xDiff = 0;
        this.yDiff = 0;
    }

    private handleTouchMove(e) {
        if (!this.xDown || !this.yDown) return;

        const xUp = e.touches[0].clientX;
        const yUp = e.touches[0].clientY;
        this.xDiff = this.xDown - xUp;
        this.yDiff = this.yDown - yUp;
    };

    public render(): void {
        this.addCustomEvent();
        this.handleInitialLoad();
        this.setActiveLinkItem();
        this.setListeners();
    }

}
