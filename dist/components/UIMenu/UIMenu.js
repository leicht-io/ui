import React from "react";
import { QuerySelector } from "../../@core/DOM/QuerySelector";
import { Attribute } from "../../@core/DOM/models/Attribute";
import { Event } from "../../@core/DOM/models/Event";
import "./UIMenu.scss";
export const UIMenu = () => {
    let xDown = null;
    let yDown = null;
    let xDiff = null;
    let yDiff = null;
    let timeDown = null;
    let startEl = null;
    let timer = null;
    let throttleDelay = 100;
    let last = null;
    let initialLoad = true;
    const addCustomEvent = () => {
        if (typeof window.CustomEvent !== 'function') {
            window.CustomEvent = function (event, params) {
                params = params || { bubbles: false, cancelable: false, detail: undefined };
                const evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
            };
            window.CustomEvent.prototype = window.Event.prototype;
        }
    };
    const handleInitialLoad = () => {
        requestAnimationFrame(() => {
            const wrapper = QuerySelector.get(".nav-wrapper");
            if (wrapper !== null) {
                if (initialLoad && window.pageYOffset > 0) {
                    wrapper.classList.add("disable-animations");
                    handleScrollClasses(true);
                    toggleMenuChevrons(false);
                    toggleHamburger(true);
                    wrapper.classList.add("nav-wrapper--active");
                }
                else {
                    wrapper.classList.remove("disable-animations");
                }
            }
            initialLoad = false;
        });
    };
    const setActiveLinkItem = () => {
        const anchors = QuerySelector.getAll(".nav-wrapper a");
        const pathName = document.location.pathname.split("/")[1];
        for (let i = 0; i < anchors.length; i++) {
            const anchor = anchors.item(i);
            const attribute = anchor.getAttribute(Attribute.HREF);
            if (anchor && anchor.parentElement && attribute && attribute.split("/")[1] === pathName) {
                anchor.parentElement.classList.add("active");
            }
        }
    };
    const setListeners = () => {
        setTouchListeners();
        setClickListeners();
        setScrollListeners();
    };
    const setScrollListeners = () => {
        window.addEventListener(Event.SCROLL, () => {
            throttle();
        }, true);
    };
    const setTouchListeners = () => {
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);
        document.addEventListener('touchend', handleTouchEnd, false);
        document.addEventListener('swiped-left', () => {
            toggleMenu(false);
        });
    };
    const setClickListeners = () => {
        const hamburger = QuerySelector.get(".nav-hamburger");
        const navBackground = QuerySelector.get(".nav-background");
        const dropDownButtons = QuerySelector.getAll(".nav-sub-btn");
        const closeBtn = QuerySelector.get(".nav-responsive-header .ui-i--close");
        if (hamburger) {
            hamburger.addEventListener(Event.CLICK, () => {
                toggleMenu(true);
            });
        }
        if (navBackground) {
            navBackground.addEventListener(Event.CLICK, () => {
                toggleMenu(false);
            });
        }
        for (let i = 0; i < dropDownButtons.length; i++) {
            const button = dropDownButtons.item(i);
            button.addEventListener(Event.CLICK, function (event) {
                const subContent = event.target.parentElement.querySelector(".nav-sub-content");
                if (subContent.classList.contains("nav-sub-content-active")) {
                    subContent.classList.remove("nav-sub-content-active");
                }
                else {
                    for (let q = 0; q < dropDownButtons.length; q++) {
                        const subParent = dropDownButtons[q].parentElement;
                        subParent.getElementsByClassName("nav-sub-content")[0].classList.remove("nav-sub-content-active");
                    }
                    subContent.classList.add("nav-sub-content-active");
                }
            });
        }
        if (closeBtn) {
            closeBtn.addEventListener(Event.CLICK, () => {
                toggleMenu(false);
            });
        }
    };
    const toggleMenu = (shouldOpen) => {
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
    };
    const throttle = () => {
        const now = +new Date();
        if (last && now < last + throttleDelay) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                last = now;
                onScroll();
            }, throttleDelay);
        }
        else {
            last = now;
            onScroll();
        }
    };
    const getHeaderElement = () => {
        return QuerySelector.get(".nav-wrapper");
    };
    const handleScrollClasses = (showOriginal) => {
        const header = getHeaderElement();
        if (!header) {
            return;
        }
        if (!showOriginal) {
            header.classList.add("nav-wrapper--active");
        }
        else {
            header.classList.remove("nav-wrapper--active");
        }
    };
    const toggleMenuChevrons = (add) => {
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
    };
    const toggleHamburger = (dark) => {
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
    };
    const onScroll = () => {
        const wrapper = QuerySelector.get(".nav-wrapper");
        if (wrapper) {
            wrapper.classList.remove("disable-animations");
        }
        const header = getHeaderElement();
        if (header && window.pageYOffset && !header.classList.contains("nav-wrapper--active")) {
            handleScrollClasses(false);
            toggleMenuChevrons(false);
            toggleHamburger(true);
        }
        else if (window.pageYOffset === 0) {
            handleScrollClasses(true);
            toggleMenuChevrons(true);
            toggleHamburger(false);
        }
    };
    const handleTouchEnd = (e) => {
        if (startEl !== e.target)
            return;
        const swipeThreshold = parseInt(startEl.getAttribute('data-swipe-threshold') || '20', 10);
        const swipeTimeout = parseInt(startEl.getAttribute('data-swipe-timeout') || '500', 10);
        const timeDiff = Date.now() - timeDown;
        let eventType = '';
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (Math.abs(xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
                if (xDiff > 0) {
                    eventType = 'swiped-left';
                }
                else {
                    eventType = 'swiped-right';
                }
            }
        }
        else {
            if (Math.abs(yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
                if (yDiff > 0) {
                    eventType = 'swiped-up';
                }
                else {
                    eventType = 'swiped-down';
                }
            }
        }
        if (eventType !== '') {
            startEl.dispatchEvent(new CustomEvent(eventType, { bubbles: true, cancelable: true }));
        }
        xDown = null;
        yDown = null;
        timeDown = null;
    };
    const handleTouchStart = (e) => {
        if (e.target.getAttribute('data-swipe-ignore') === 'true')
            return;
        startEl = e.target;
        timeDown = Date.now();
        xDown = e.touches[0].clientX;
        yDown = e.touches[0].clientY;
        xDiff = 0;
        yDiff = 0;
    };
    const handleTouchMove = (e) => {
        if (!xDown || !yDown)
            return;
        const xUp = e.touches[0].clientX;
        const yUp = e.touches[0].clientY;
        xDiff = xDown - xUp;
        yDiff = yDown - yUp;
    };
    addCustomEvent();
    handleInitialLoad();
    setActiveLinkItem();
    setListeners();
    return (React.createElement("div", { className: "nav-wrapper nav-wrapper--fixed nav-wrapper-transparent" },
        React.createElement("div", { className: "nav-container" },
            React.createElement("div", { className: "nav-hamburger" },
                React.createElement("div", { className: "ui-i ui-i--hamburger ui-i--white ui-i--md" })),
            React.createElement("div", { className: "logo" },
                React.createElement("a", { href: "/" },
                    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "blur", width: "40", height: "40", viewBox: "0 0 10.583 10.583" },
                        React.createElement("path", { className: "p1", d: "M4.803.13L1.067 2.288c-.302.175-.488.497-.488.846V7.45c0 .35.186.67.488.846l3.736 2.157c.302.174.675.174.977 0l3.737-2.157c.302-.175.488-.497.488-.846V3.134c0-.35-.186-.67-.488-.846L5.78.13c-.302-.174-.675-.174-.977 0z", fillRule: "nonzero" }),
                        React.createElement("path", { className: "p2", d: "M1173.852 656.84s6.596-26.822 6.596-40.183c0-13.46-6.596-40.183-6.596-40.183h268.85v206.74c57.768 17.28 99.944 71.124 99.944 134.813 0 77.553-62.665 140.64-139.922 140.64-77.157 0-139.922-63.087-139.922-140.64 0-63.7 42.176-117.535 99.944-134.813V656.84zm228.872 200.914c33.18 0 59.966 27.023 59.966 60.274s-26.785 60.274-59.966 60.274c-33.08 0-59.966-27.023-59.966-60.274s26.885-60.274 59.966-60.274zm-839.53 195.088c-57.768-17.38-99.944-71.124-99.944-134.813 0-77.653 62.765-140.64 139.922-140.64 77.257 0 139.922 62.987 139.922 140.64 0 63.7-42.176 117.434-99.944 134.813v86.192H878.52l-25.486 130.594 149.916 194.585 159.2-194.585-29.683-130.293 230.27-.3.4-50.53s26.785 6.43 40.078 6.53c13.093 0 39.478-6.128 39.478-6.128V1219.4l-211.382.3 11.494 80.064-239.866 298.66-239.866-298.66 12.793-80.366h-212.68zm39.978-195.087c33.18 0 59.966 27.023 59.966 60.274s-26.785 60.274-59.966 60.274c-33.08 0-59.966-27.023-59.966-60.274s26.885-60.274 59.966-60.274zm265.65-281.28c17.3-58.064 70.86-100.457 134.125-100.457 77.257 0 139.922 62.987 139.922 140.64 0 77.553-62.665 140.64-139.922 140.64-62.865 0-116.235-41.9-133.725-99.352L643.15 656.84v90s-26.585-6.932-39.978-7.032c-13.293-.1-39.978 6.33-39.978 6.33V576.475zm134.125-20.1c33.18 0 59.966 27.023 59.966 60.274s-26.785 60.274-59.966 60.274c-33.08 0-59.966-27.023-59.966-60.274s26.885-60.274 59.966-60.274z", transform: "matrix(.006019 0 0 .005788 -.741536 -.57126)", fillRule: "evenodd", fill: "#fff" })),
                    React.createElement("svg", { className: "blur", xmlns: "http://www.w3.org/2000/svg", width: "123.506", height: "20", viewBox: "0 0 32.67763 5.2916668" },
                        React.createElement("g", { fillRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: "2", clipRule: "evenodd" },
                            React.createElement("path", { fillRule: "nonzero", d: "M.869123.0903074v4.33902752h1.80792878l.50761078.77184624H-.00007353V.09030741zM7.0146871.0903074v.79966053H4.65742613v1.34203896H6.7156835v.7579391H4.65742612v1.41157465H6.6948228l.3754929.79966052h-3.2820861V.09030741zM7.84354967.09030734h.86919653v5.11087382h-.86919653zM12.06992931-.000089c.72317151 0 1.3281323.25032851 1.82183593.7579391l-.5493322.62582128c-.34767862-.3893999-.77184653-.58409986-1.27250373-.58409986-.50761077 0-.9248251.17383924-1.23773585.52151773-.31986433.34072492-.47979649.78575338-.47979649 1.32813182 0 .53542487.15993216.98045333.47979649 1.32117825.31291075.34767848.73012508.52151773 1.23773585.52151773.52151792 0 .95959297-.20165352 1.30031801-.61191414l.54237863.63972842c-.46588934.51456416-1.08475726.77184624-1.84269664.77184624-.75793937 0-1.3768073-.25032851-1.87051093-.75098553-.48675005-.50065702-.73012508-1.13343187-.73012508-1.89137097 0-.76489267.24337503-1.39766752.73012508-1.89832454.49370363-.50065702 1.11257156-.75098553 1.87051093-.75098553zM18.59654842.0903074v5.11087376h-.86224296V2.98299242h-2.3294467v2.21818874h-.86919653V.09030741h.86919653v2.09997806h2.3294467V.0903074zM23.5933813.0903074v.77184625H21.8619418v4.33902751h-.86919653V.86215365H19.2613058V.0903074zM24.1065513 4.32503137c.10430358-.10430354.22946788-.15297853.38940004-.15297853s.28509646.04867499.38940004.15297853c.10430359.10430355.15993216.23642137.15993216.39635348 0 .1599321-.05562857.29204993-.15993216.39635347-.10430358.09734998-.22946788.15297854-.38940004.15297854s-.28509646-.05562856-.38940005-.15297854c-.10430358-.10430354-.15993216-.23642137-.15993216-.39635347s.05562858-.29204993.15993216-.39635348zM25.85050591.09030734h.86919653v5.11087382h-.86919653zM28.2133282.7578501c.49370362-.50761059 1.11952512-.7579391 1.86355735-.7579391s1.36290016.25032851 1.85660379.7579391c.49370363.50065702.74403223 1.13343187.74403223 1.89137097 0 .76489267-.2503286 1.39766751-.74403223 1.89832454-.49370363.49370345-1.11257156.74403196-1.85660379.74403196-.7509858 0-1.36985373-.25032851-1.86355735-.74403196-.49370363-.50065703-.73707866-1.13343187-.73707866-1.89832454 0-.7579391.24337503-1.39071395.73707866-1.89137097zm1.86355735.04172142c-.50761077 0-.91787153.17383924-1.23773585.52151773-.31986433.34767849-.47979649.79270695-.47979649 1.32813182s.15993216.98045333.47979649 1.32117825c.31986432.34767848.73012508.52151773 1.23773585.52151773.5006572 0 .91091797-.17383925 1.23773586-.52151773.31986432-.34072492.47979648-.78575338.47979648-1.32117825s-.15993216-.98045333-.47979648-1.32813182c-.3268179-.34767849-.73707866-.52151773-1.23773586-.52151773z" }))))),
            React.createElement("div", { className: "nav-background" }),
            React.createElement("nav", { className: "nav" },
                React.createElement("div", { className: "nav-responsive-header" },
                    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "40", height: "40", viewBox: "0 0 10.583 10.583" },
                        React.createElement("path", { className: "p1", d: "M4.803.13L1.067 2.288c-.302.175-.488.497-.488.846V7.45c0 .35.186.67.488.846l3.736 2.157c.302.174.675.174.977 0l3.737-2.157c.302-.175.488-.497.488-.846V3.134c0-.35-.186-.67-.488-.846L5.78.13c-.302-.174-.675-.174-.977 0z", fillRule: "nonzero" }),
                        React.createElement("path", { className: "p2", d: "M1173.852 656.84s6.596-26.822 6.596-40.183c0-13.46-6.596-40.183-6.596-40.183h268.85v206.74c57.768 17.28 99.944 71.124 99.944 134.813 0 77.553-62.665 140.64-139.922 140.64-77.157 0-139.922-63.087-139.922-140.64 0-63.7 42.176-117.535 99.944-134.813V656.84zm228.872 200.914c33.18 0 59.966 27.023 59.966 60.274s-26.785 60.274-59.966 60.274c-33.08 0-59.966-27.023-59.966-60.274s26.885-60.274 59.966-60.274zm-839.53 195.088c-57.768-17.38-99.944-71.124-99.944-134.813 0-77.653 62.765-140.64 139.922-140.64 77.257 0 139.922 62.987 139.922 140.64 0 63.7-42.176 117.434-99.944 134.813v86.192H878.52l-25.486 130.594 149.916 194.585 159.2-194.585-29.683-130.293 230.27-.3.4-50.53s26.785 6.43 40.078 6.53c13.093 0 39.478-6.128 39.478-6.128V1219.4l-211.382.3 11.494 80.064-239.866 298.66-239.866-298.66 12.793-80.366h-212.68zm39.978-195.087c33.18 0 59.966 27.023 59.966 60.274s-26.785 60.274-59.966 60.274c-33.08 0-59.966-27.023-59.966-60.274s26.885-60.274 59.966-60.274zm265.65-281.28c17.3-58.064 70.86-100.457 134.125-100.457 77.257 0 139.922 62.987 139.922 140.64 0 77.553-62.665 140.64-139.922 140.64-62.865 0-116.235-41.9-133.725-99.352L643.15 656.84v90s-26.585-6.932-39.978-7.032c-13.293-.1-39.978 6.33-39.978 6.33V576.475zm134.125-20.1c33.18 0 59.966 27.023 59.966 60.274s-26.785 60.274-59.966 60.274c-33.08 0-59.966-27.023-59.966-60.274s26.885-60.274 59.966-60.274z", transform: "matrix(.006019 0 0 .005788 -.741536 -.57126)", fillRule: "evenodd", fill: "#fff" })),
                    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "123.506", height: "20", viewBox: "0 0 32.67763 5.2916668" },
                        React.createElement("g", { fillRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: "2", clipRule: "evenodd" },
                            React.createElement("path", { fillRule: "nonzero", d: "M.869123.0903074v4.33902752h1.80792878l.50761078.77184624H-.00007353V.09030741zM7.0146871.0903074v.79966053H4.65742613v1.34203896H6.7156835v.7579391H4.65742612v1.41157465H6.6948228l.3754929.79966052h-3.2820861V.09030741zM7.84354967.09030734h.86919653v5.11087382h-.86919653zM12.06992931-.000089c.72317151 0 1.3281323.25032851 1.82183593.7579391l-.5493322.62582128c-.34767862-.3893999-.77184653-.58409986-1.27250373-.58409986-.50761077 0-.9248251.17383924-1.23773585.52151773-.31986433.34072492-.47979649.78575338-.47979649 1.32813182 0 .53542487.15993216.98045333.47979649 1.32117825.31291075.34767848.73012508.52151773 1.23773585.52151773.52151792 0 .95959297-.20165352 1.30031801-.61191414l.54237863.63972842c-.46588934.51456416-1.08475726.77184624-1.84269664.77184624-.75793937 0-1.3768073-.25032851-1.87051093-.75098553-.48675005-.50065702-.73012508-1.13343187-.73012508-1.89137097 0-.76489267.24337503-1.39766752.73012508-1.89832454.49370363-.50065702 1.11257156-.75098553 1.87051093-.75098553zM18.59654842.0903074v5.11087376h-.86224296V2.98299242h-2.3294467v2.21818874h-.86919653V.09030741h.86919653v2.09997806h2.3294467V.0903074zM23.5933813.0903074v.77184625H21.8619418v4.33902751h-.86919653V.86215365H19.2613058V.0903074zM24.1065513 4.32503137c.10430358-.10430354.22946788-.15297853.38940004-.15297853s.28509646.04867499.38940004.15297853c.10430359.10430355.15993216.23642137.15993216.39635348 0 .1599321-.05562857.29204993-.15993216.39635347-.10430358.09734998-.22946788.15297854-.38940004.15297854s-.28509646-.05562856-.38940005-.15297854c-.10430358-.10430354-.15993216-.23642137-.15993216-.39635347s.05562858-.29204993.15993216-.39635348zM25.85050591.09030734h.86919653v5.11087382h-.86919653zM28.2133282.7578501c.49370362-.50761059 1.11952512-.7579391 1.86355735-.7579391s1.36290016.25032851 1.85660379.7579391c.49370363.50065702.74403223 1.13343187.74403223 1.89137097 0 .76489267-.2503286 1.39766751-.74403223 1.89832454-.49370363.49370345-1.11257156.74403196-1.85660379.74403196-.7509858 0-1.36985373-.25032851-1.86355735-.74403196-.49370363-.50065703-.73707866-1.13343187-.73707866-1.89832454 0-.7579391.24337503-1.39071395.73707866-1.89137097zm1.86355735.04172142c-.50761077 0-.91787153.17383924-1.23773585.52151773-.31986433.34767849-.47979649.79270695-.47979649 1.32813182s.15993216.98045333.47979649 1.32117825c.31986432.34767848.73012508.52151773 1.23773585.52151773.5006572 0 .91091797-.17383925 1.23773586-.52151773.31986432-.34072492.47979648-.78575338.47979648-1.32117825s-.15993216-.98045333-.47979648-1.32813182c-.3268179-.34767849-.73707866-.52151773-1.23773586-.52151773z" }))),
                    React.createElement("div", { className: "nav-hamburger" },
                        React.createElement("div", { className: "ui-i ui-i--close ui-i--gray ui-i--lg" }))),
                React.createElement("div", { className: "nav-content" },
                    React.createElement("div", { className: "nav-item" },
                        React.createElement("a", { href: "#home" }, "Home")),
                    React.createElement("div", { className: "nav-item nav-sub" },
                        React.createElement("span", { className: "nav-sub-btn" },
                            "About ",
                            React.createElement("div", { className: "ui-i ui-i--chevron-down  ui-i--white" })),
                        React.createElement("div", { className: "nav-sub-content" },
                            React.createElement("a", { href: "#company" }, "Company"),
                            React.createElement("a", { href: "#team" }, "Team"),
                            React.createElement("a", { href: "#careers" }, "Careers"))),
                    React.createElement("div", { className: "nav-item nav-sub" },
                        React.createElement("span", { className: "nav-sub-btn" },
                            "Services ",
                            React.createElement("div", { className: "ui-i ui-i--chevron-down ui-i--white" })),
                        React.createElement("div", { className: "nav-sub-content" },
                            React.createElement("a", { href: "#bring" }, "Bring"),
                            React.createElement("a", { href: "#deliver" }, "Deliver"),
                            React.createElement("a", { href: "#package" }, "Package"),
                            React.createElement("a", { href: "#express" }, "Express"))),
                    React.createElement("div", { className: "nav-item nav-sub" },
                        React.createElement("span", { className: "nav-sub-btn" },
                            "Partners ",
                            React.createElement("div", { className: "ui-i ui-i--chevron-down ui-i--white" })),
                        React.createElement("div", { className: "nav-sub-content" },
                            React.createElement("a", { href: "#link1" }, "Link 1"),
                            React.createElement("a", { href: "#link2" }, "Link 2"),
                            React.createElement("a", { href: "#link3" }, "Link 3"),
                            React.createElement("a", { href: "#link4" }, "Link 4"))),
                    React.createElement("div", { className: "nav-item" },
                        React.createElement("a", { href: "/contact" }, "Contact")),
                    React.createElement("div", { className: "nav-item nav-item--primary" },
                        React.createElement("a", { href: "/shop" }, "Shop")))))));
};
//# sourceMappingURL=UIMenu.js.map