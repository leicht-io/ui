import React from 'react';
import './UIModal.scss';
import { UIIcon } from '../UIIcon';
export var UIModal = function (props) {
    var keyDownCallback = function (event) { return handleKeyDown(event); };
    React.useEffect(function () {
        addEventListeners();
    }, []);
    React.useEffect(function () {
        if (props.show) {
            toggleBodyScrollLock(true);
        }
        else {
            toggleBodyScrollLock(false);
        }
    }, [props.show]);
    var toggleBodyScrollLock = function (lock) {
        var body = document.querySelector('body');
        if (body) {
            if (lock) {
                body.classList.add('body--disable-scroll');
            }
            else {
                body.classList.remove('body--disable-scroll');
            }
        }
    };
    var addEventListeners = function () {
        document.addEventListener('keydown', keyDownCallback);
    };
    var handleKeyDown = function (event) {
        if (event.key === 'Escape' && props.onHide) {
            props.onHide();
        }
    };
    if (props.show) {
        if (props.type === 'IFRAME') {
            return (React.createElement("div", { className: "ui-modal--container ui-modal--container-with-iframe ui-modal--container--visible", onClick: function (event) {
                    if (event.target.classList.contains('ui-modal--container') && props.onHide) {
                        props.onHide();
                    }
                } },
                React.createElement("div", { className: "ui-modal--wrapper" },
                    React.createElement("div", { className: "ui-modal--title-wrapper" },
                        React.createElement("div", { className: "ui-modal--title" },
                            React.createElement("h5", null, props.title)),
                        React.createElement("div", { className: "ui-modal--buttons" },
                            React.createElement("div", { className: "ui-modal--buttons-close", onClick: function () {
                                    if (props.onHide) {
                                        props.onHide();
                                    }
                                } },
                                React.createElement(UIIcon, { icon: 'close' })))),
                    React.createElement("div", { className: "ui-modal--content--wrapper" },
                        React.createElement("div", { className: "ui-modal--content" },
                            React.createElement("iframe", { src: props.iframeUrl }))))));
        }
        else {
            return (React.createElement("div", { className: "ui-modal--container ui-modal--container-with-html ui-modal--container--visible", onClick: function (event) {
                    if (event.target.classList.contains('ui-modal--container') && props.onHide) {
                        props.onHide();
                    }
                } },
                React.createElement("div", { className: "ui-modal--wrapper" },
                    React.createElement("div", { className: "ui-modal--title-wrapper" },
                        React.createElement("div", { className: "ui-modal--title" },
                            React.createElement("h5", null, props.title)),
                        React.createElement("div", { className: "ui-modal--buttons" },
                            React.createElement("div", { className: "ui-modal--buttons-close", onClick: function () {
                                    if (props.onHide) {
                                        props.onHide();
                                    }
                                } },
                                React.createElement(UIIcon, { icon: 'close' })))),
                    React.createElement("div", { className: "ui-modal--content--wrapper" },
                        React.createElement("div", { className: "ui-modal--content" }, props.children)))));
        }
    }
    else {
        return null;
    }
};
UIModal.displayName = 'UIModal';
//# sourceMappingURL=UIModal.js.map