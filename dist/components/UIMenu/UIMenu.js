import { BaseComponent } from "../UIBuilder/UIBuilder";
import { QuerySelector } from "../../@core/DOM/QuerySelector";
import { ClassList } from "../../@core/DOM/ClassList";
import { Attribute } from "../../@core/DOM/models/Attribute";
import { Event } from "../../@core/DOM/models/Event";
export class UIMenu extends BaseComponent {
    constructor(config) {
        super(config);
        this.xDown = null;
        this.yDown = null;
        this.xDiff = null;
        this.yDiff = null;
        this.timeDown = null;
        this.startEl = null;
        this.timer = null;
        this.throttleDelay = 100;
        this.last = null;
        this.initialLoad = true;
    }
    addCustomEvent() {
        if (typeof window.CustomEvent !== 'function') {
            window.CustomEvent = function (event, params) {
                params = params || { bubbles: false, cancelable: false, detail: undefined };
                const evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
            };
            window.CustomEvent.prototype = window.Event.prototype;
        }
    }
    handleInitialLoad() {
        requestAnimationFrame(() => {
            const wrapper = QuerySelector.get(".nav-wrapper");
            if (wrapper !== null) {
                if (this.initialLoad && window.pageYOffset > 0) {
                    ClassList.add(wrapper, "disable-animations");
                    this.handleScrollClasses(true);
                    this.toggleMenuChevrons(false);
                    this.toggleHamburger(true);
                    ClassList.add(wrapper, "nav-wrapper--active");
                }
                else {
                    ClassList.remove(wrapper, "disable-animations");
                }
            }
            this.initialLoad = false;
        });
    }
    setActiveLinkItem() {
        const anchors = QuerySelector.getAll(".nav-wrapper a");
        const pathName = document.location.pathname.split("/")[1];
        for (let i = 0; i < anchors.length; i++) {
            const anchor = anchors.item(i);
            const attribute = anchor.getAttribute(Attribute.HREF);
            if (anchor && anchor.parentElement && attribute && attribute.split("/")[1] === pathName) {
                ClassList.add(anchor.parentElement, "active");
            }
        }
    }
    setListeners() {
        this.setTouchListeners();
        this.setClickListeners();
        this.setScrollListeners();
    }
    setScrollListeners() {
        window.addEventListener(Event.SCROLL, () => {
            this.throttle();
        }, true);
    }
    setTouchListeners() {
        document.addEventListener('touchstart', this.handleTouchStart, false);
        document.addEventListener('touchmove', this.handleTouchMove, false);
        document.addEventListener('touchend', this.handleTouchEnd, false);
        document.addEventListener('swiped-left', () => {
            this.toggleMenu(false);
        });
    }
    setClickListeners() {
        const hamburger = QuerySelector.get(".nav-hamburger");
        const navBackground = QuerySelector.get(".nav-background");
        const dropDownButtons = QuerySelector.getAll(".nav-sub-btn");
        const closeBtn = QuerySelector.get(".nav-responsive-header .ui-i--close");
        hamburger.addEventListener(Event.CLICK, () => {
            this.toggleMenu(true);
        });
        navBackground.addEventListener(Event.CLICK, () => {
            this.toggleMenu(false);
        });
        for (let i = 0; i < dropDownButtons.length; i++) {
            const button = dropDownButtons.item(i);
            button.addEventListener(Event.CLICK, function (event) {
                const subContent = event.target.parentElement.querySelector(".nav-sub-content");
                if (subContent.classList.contains("nav-sub-content-active")) {
                    ClassList.remove(subContent, "nav-sub-content-active");
                }
                else {
                    for (let q = 0; q < dropDownButtons.length; q++) {
                        const subParent = dropDownButtons[q].parentElement;
                        subParent.getElementsByClassName("nav-sub-content")[0].classList.remove("nav-sub-content-active");
                    }
                    ClassList.add(subContent, "nav-sub-content-active");
                }
            });
        }
        closeBtn.addEventListener(Event.CLICK, () => {
            this.toggleMenu(false);
        });
    }
    toggleMenu(shouldOpen) {
        const body = document.body;
        const nav = document.querySelector(".nav");
        const navBackground = document.querySelector(".nav-background");
        if (shouldOpen && nav && nav.style.display !== "block") {
            nav.classList.add("nav-active");
            navBackground.classList.add("nav-background-active");
            body.classList.add("nav--disable-scroll");
            return;
        }
        nav.classList.remove("nav-active");
        navBackground.classList.remove("nav-background-active");
        body.classList.remove("nav--disable-scroll");
    }
    throttle() {
        const now = +new Date();
        if (this.last && now < this.last + this.throttleDelay) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.last = now;
                this.onScroll();
            }, this.throttleDelay);
        }
        else {
            this.last = now;
            this.onScroll();
        }
    }
    getHeaderElement() {
        return QuerySelector.get(".nav-wrapper");
    }
    handleScrollClasses(showOriginal) {
        const header = this.getHeaderElement();
        if (!header) {
            return;
        }
        if (!showOriginal) {
            ClassList.add(header, "nav-wrapper--active");
        }
        else {
            ClassList.remove(header, "nav-wrapper--active");
        }
    }
    toggleMenuChevrons(add) {
        const menuIcons = QuerySelector.getAll(".nav-wrapper .ui-i--chevron-down");
        for (let i = 0; i < menuIcons.length; i++) {
            const icon = menuIcons.item(i);
            if (add) {
                icon.classList.add("ui-i--white");
                icon.classList.remove("ui-i--gray");
            }
            else {
                icon.classList.remove("ui-i--white");
                icon.classList.add("ui-i-gray");
            }
        }
    }
    toggleHamburger(dark) {
        const hamburgers = QuerySelector.getAll(".nav-wrapper .ui-i--hamburger");
        for (let i = 0; i < hamburgers.length; i++) {
            const hamburger = hamburgers.item(i);
            if (dark) {
                hamburger.classList.remove("ui-i--white");
                hamburger.classList.remove("ui-i--gray");
            }
            else {
                hamburger.classList.remove("ui-i--gray");
                hamburger.classList.add("ui-i--white");
            }
        }
    }
    onScroll() {
        const wrapper = QuerySelector.get(".nav-wrapper");
        if (wrapper) {
            ClassList.remove(wrapper, "disable-animations");
        }
        const header = this.getHeaderElement();
        if (header && window.pageYOffset && !header.classList.contains("nav-wrapper--active")) {
            this.handleScrollClasses(false);
            this.toggleMenuChevrons(false);
            this.toggleHamburger(true);
        }
        else if (window.pageYOffset === 0) {
            this.handleScrollClasses(true);
            this.toggleMenuChevrons(true);
            this.toggleHamburger(false);
        }
    }
    handleTouchEnd(e) {
        if (this.startEl !== e.target)
            return;
        const swipeThreshold = parseInt(this.startEl.getAttribute('data-swipe-threshold') || '20', 10);
        const swipeTimeout = parseInt(this.startEl.getAttribute('data-swipe-timeout') || '500', 10);
        const timeDiff = Date.now() - this.timeDown;
        let eventType = '';
        if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) {
            if (Math.abs(this.xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
                if (this.xDiff > 0) {
                    eventType = 'swiped-left';
                }
                else {
                    eventType = 'swiped-right';
                }
            }
        }
        else {
            if (Math.abs(this.yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
                if (this.yDiff > 0) {
                    eventType = 'swiped-up';
                }
                else {
                    eventType = 'swiped-down';
                }
            }
        }
        if (eventType !== '') {
            this.startEl.dispatchEvent(new CustomEvent(eventType, { bubbles: true, cancelable: true }));
        }
        this.xDown = null;
        this.yDown = null;
        this.timeDown = null;
    }
    handleTouchStart(e) {
        if (e.target.getAttribute('data-swipe-ignore') === 'true')
            return;
        this.startEl = e.target;
        this.timeDown = Date.now();
        this.xDown = e.touches[0].clientX;
        this.yDown = e.touches[0].clientY;
        this.xDiff = 0;
        this.yDiff = 0;
    }
    handleTouchMove(e) {
        if (!this.xDown || !this.yDown)
            return;
        const xUp = e.touches[0].clientX;
        const yUp = e.touches[0].clientY;
        this.xDiff = this.xDown - xUp;
        this.yDiff = this.yDown - yUp;
    }
    ;
    render() {
        this.addCustomEvent();
        this.handleInitialLoad();
        this.setActiveLinkItem();
        this.setListeners();
    }
}
//# sourceMappingURL=UIMenu.js.map