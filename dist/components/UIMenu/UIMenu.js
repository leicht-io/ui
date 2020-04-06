import React from 'react';
import './UIMenu.scss';
import { UIIcon } from '../UIIcon';
export var UIMenu = function (props) {
    var _a = React.useState(false), scrollActive = _a[0], setScrollActive = _a[1];
    React.useEffect(function () {
        document.addEventListener('scroll', function () {
            throttleScroll();
        }, true);
    }, []);
    var getHeaderElement = function () {
        return document.querySelector('.nav-wrapper');
    };
    var throttleScroll = function () {
        onScroll();
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
    var getMenuItem = function (menuItem) {
        if (menuItem.menuItems && menuItem.menuItems.length > 0) {
            return (React.createElement(React.Fragment, null,
                React.createElement("span", { className: "nav-sub-btn" },
                    menuItem.title,
                    React.createElement(UIIcon, { icon: 'chevronDown', color: 'white' })),
                React.createElement("div", { className: "nav-sub-content" }, menuItem.menuItems && menuItem.menuItems.map(function (menuItem, index) {
                    return (React.createElement("a", { key: index, onClick: function () {
                        } }, menuItem.title));
                }))));
        }
        else if (menuItem.button) {
            return (React.createElement("div", { className: "nav-item nav-item--primary" },
                React.createElement("a", { href: menuItem.link }, menuItem.title)));
        }
        else {
            return (React.createElement("a", { href: menuItem.link }, menuItem.title));
        }
    };
    return (React.createElement("div", { className: 'nav-wrapper nav-wrapper--fixed nav-wrapper-transparent ' + (scrollActive ? 'nav-wrapper--active' : '') },
        React.createElement("div", { className: "nav-container" },
            React.createElement("div", { className: "nav-hamburger" },
                React.createElement(UIIcon, { icon: 'hamburger', color: 'white' })),
            React.createElement("div", { className: "logo" },
                React.createElement("a", { href: "/" }, props.logo)),
            React.createElement("div", { className: "nav-background" }),
            React.createElement("nav", { className: "nav" },
                React.createElement("div", { className: "nav-responsive-header" },
                    props.logo,
                    React.createElement("div", { className: "nav-hamburger" },
                        React.createElement(UIIcon, { icon: 'close', color: 'grey' }))),
                React.createElement("div", { className: "nav-content" }, props.menuItems.map(function (menuItem, index) {
                    return (React.createElement("div", { className: 'nav-item ' + ((menuItem.menuItems && menuItem.menuItems.length > 0) ? 'nav-sub' : ''), key: index }, getMenuItem(menuItem)));
                }))))));
};
//# sourceMappingURL=UIMenu.js.map