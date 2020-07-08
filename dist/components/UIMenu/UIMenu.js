import React from 'react';
import './UIMenu.scss';
import { UIIcon } from '../UIIcon';
export var UIMenu = function (props) {
    var xDown = null;
    var yDown = null;
    var xDiff = null;
    var yDiff = null;
    var timeDown = null;
    var startEl = null;
    var timer = null;
    var last = null;
    var throttleDelay = 100;
    var _a = React.useState(false), scrollActive = _a[0], setScrollActive = _a[1];
    var _b = React.useState(false), showSidebar = _b[0], setShowSidebar = _b[1];
    var _c = React.useState(false), disableAnimations = _c[0], setDisableAnimations = _c[1];
    React.useEffect(function () {
        toggleMenu(showSidebar);
    }, [showSidebar]);
    React.useEffect(function () {
        if (window.pageYOffset > 0) {
            setScrollActive(true);
            setDisableAnimations(true);
        }
        handleInitialLoad();
        addCustomEvent();
        setTouchListeners();
        document.addEventListener('keyup', function (e) {
            if (e.key === 'Escape') {
                setShowSidebar(false);
            }
        });
    }, []);
    var addCustomEvent = function () {
        if (typeof window.CustomEvent !== 'function') {
            window.CustomEvent = function (event, params) {
                params = params || { bubbles: false, cancelable: false, detail: undefined };
                var evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
            };
            window.CustomEvent.prototype = window.Event.prototype;
        }
    };
    var handleInitialLoad = function () {
        document.addEventListener('scroll', function () {
            throttleScroll();
        }, true);
    };
    var setTouchListeners = function () {
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);
        document.addEventListener('touchend', handleTouchEnd, false);
        document.addEventListener('swiped-left', function () {
            setShowSidebar(false);
        });
    };
    var toggleMenu = function (shouldOpen) {
        var body = document.body;
        var nav = document.querySelector('.nav');
        var navBackground = document.querySelector('.nav-background');
        if (shouldOpen && nav && nav.style.display !== 'block') {
            nav.classList.add('nav-active');
            navBackground.classList.add('nav-background-active');
            body.classList.add('nav--disable-scroll');
            return;
        }
        nav.classList.remove('nav-active');
        navBackground.classList.remove('nav-background-active');
        body.classList.remove('nav--disable-scroll');
    };
    var getHeaderElement = function () {
        return document.querySelector('.ui-navigation');
    };
    var throttleScroll = function () {
        var now = +new Date();
        if (last && now < last + throttleDelay) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                onScroll();
                setDisableAnimations(false);
            }, throttleDelay);
        }
        else {
            last = now;
            onScroll();
        }
    };
    var onScroll = function () {
        var header = getHeaderElement();
        if (header && window.pageYOffset && !scrollActive) {
            if (!scrollActive) {
                setScrollActive(true);
            }
        }
        else if (window.pageYOffset === 0) {
            setScrollActive(false);
        }
    };
    var handleTouchEnd = function (e) {
        if (startEl !== e.target)
            return;
        var swipeThreshold = parseInt(startEl.getAttribute('data-swipe-threshold') || '20', 10);
        var swipeTimeout = parseInt(startEl.getAttribute('data-swipe-timeout') || '500', 10);
        var timeDiff = Date.now() - timeDown;
        var eventType = '';
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
    var handleTouchStart = function (e) {
        if (e.target.getAttribute('data-swipe-ignore') === 'true')
            return;
        startEl = e.target;
        timeDown = Date.now();
        xDown = e.touches[0].clientX;
        yDown = e.touches[0].clientY;
        xDiff = 0;
        yDiff = 0;
    };
    var handleTouchMove = function (e) {
        if (!xDown || !yDown)
            return;
        var xUp = e.touches[0].clientX;
        var yUp = e.touches[0].clientY;
        xDiff = xDown - xUp;
        yDiff = yDown - yUp;
    };
    var getMenuItem = function (menuItem) {
        if (menuItem.menuItems && menuItem.menuItems.length > 0) {
            return (React.createElement(React.Fragment, null,
                React.createElement("span", { className: "nav-sub-btn", onClick: function (event) {
                        if (showSidebar) {
                            var sibling = event.target.parentElement.querySelector('.nav-sub-content');
                            if (sibling.classList.contains('nav-sub-content--expanded')) {
                                sibling.classList.remove('nav-sub-content--expanded');
                            }
                            else {
                                sibling.classList.add('nav-sub-content--expanded');
                            }
                        }
                    } },
                    menuItem.title,
                    React.createElement(UIIcon, { icon: 'chevronDown', color: showSidebar ? 'grey' : 'white' })),
                React.createElement("div", { className: 'nav-sub-content' }, menuItem.menuItems && menuItem.menuItems.map(function (menuItem, index) {
                    return (React.createElement("a", { key: index, className: (menuItem.active ? ' active' : ''), onClick: function (event) {
                            handleClick(event, menuItem);
                        } }, menuItem.title));
                }))));
        }
        else if (menuItem.button) {
            return (React.createElement("a", { onClick: function (event) {
                    handleClick(event, menuItem);
                } }, menuItem.title));
        }
        else {
            return (React.createElement("a", { href: menuItem.link, onClick: function (event) {
                    handleClick(event, menuItem);
                } }, menuItem.title));
        }
    };
    var handleClick = function (event, menuItem) {
        event.preventDefault();
        props.onNavigate(menuItem);
    };
    var hasActiveChildren = function (menuItem) {
        var hasActiveChildren = false;
        if (menuItem.menuItems) {
            menuItem.menuItems.forEach(function (menuItem) {
                if (menuItem.active) {
                    hasActiveChildren = true;
                }
            });
        }
        return hasActiveChildren;
    };
    return (React.createElement("div", { className: 'ui-navigation ' + (scrollActive ? 'nav-wrapper--active' : '') + (disableAnimations ? ' disable-animations' : '') + (showSidebar ? ' sidebar-visible' : '') },
        React.createElement("div", { className: "nav-container" },
            React.createElement("div", { className: "nav-hamburger", onClick: function () {
                    setShowSidebar(true);
                } },
                React.createElement(UIIcon, { icon: 'hamburger', color: scrollActive ? 'grey' : 'white', size: 'md' })),
            React.createElement("div", { className: "logo" },
                React.createElement("a", { onClick: function (event) {
                        handleClick(event, { title: 'Home', link: '/' });
                    } }, props.logo)),
            React.createElement("div", { className: "nav-background", onClick: function () {
                    if (showSidebar) {
                        setShowSidebar(false);
                    }
                } }),
            React.createElement("nav", { className: "nav" },
                React.createElement("div", { className: "nav-responsive-header" },
                    props.logo,
                    React.createElement("div", { className: "nav-hamburger", onClick: function () {
                            setShowSidebar(false);
                        } },
                        React.createElement(UIIcon, { icon: 'close', color: 'grey' }))),
                React.createElement("div", { className: "nav-content" }, props.menuItems.map(function (menuItem, index) {
                    return (React.createElement("div", { className: 'nav-item ' + ((menuItem.menuItems && menuItem.menuItems.length > 0) ? 'nav-sub' : '') + (menuItem.active || hasActiveChildren(menuItem) ? ' active' : '') + (menuItem.button ? ' nav-item--primary' : ''), key: index }, getMenuItem(menuItem)));
                }))))));
};
UIMenu.displayName = 'UIMenu';
//# sourceMappingURL=UIMenu.js.map