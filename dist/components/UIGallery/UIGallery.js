var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React from 'react';
import './UIGallery.scss';
import { UIIcon } from '../UIIcon';
import { UIImage } from '../UIImage';
import { UILoader } from '../UILoader';
export var UIGallery = function (props) {
    var _a = React.useState(null), photos = _a[0], setPhotos = _a[1];
    var _b = React.useState(false), showSlider = _b[0], setShowSlider = _b[1];
    var _c = React.useState(false), sliderReady = _c[0], setSliderReady = _c[1];
    var _d = React.useState(null), currentImage = _d[0], setCurrentImage = _d[1];
    React.useEffect(function () {
        if (currentImage !== null && currentImage !== '') {
            addKeyEventListeners();
            lockBodyScroll(true);
            setShowSlider(true);
        }
        else {
            lockBodyScroll(false);
            setShowSlider(false);
        }
    }, [currentImage]);
    React.useEffect(function () {
        if (props.gallery) {
            setPhotos(props.gallery.photos);
        }
    }, [props.gallery]);
    var lockBodyScroll = function (lock) {
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
    var addKeyEventListeners = function () {
        document.addEventListener('keyup', function (e) {
            if (e.key === 'Escape') {
                closeImage();
            }
        });
    };
    var closeImage = function () {
        setCurrentImage(null);
        setSliderReady(false);
        setShowSlider(false);
    };
    var getSliderContent = function () {
        if (showSlider) {
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: 'ui-gallery--current-image ' + (sliderReady ? 'ui-gallery--current-image-visible' : '') },
                    React.createElement("img", { alt: "Current Photo", draggable: "false", className: 'loaded', src: currentImage, onLoad: function () {
                            setSliderReady(true);
                        } }),
                    React.createElement("div", { className: "ui-gallery--close", onClick: function () {
                            closeImage();
                        } },
                        React.createElement(UIIcon, { icon: 'close', size: 'sm' })))));
        }
        else {
            return null;
        }
    };
    if (photos) {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: 'ui-gallery--wrapper ' + (showSlider ? 'ui-gallery--wrapper-visible' : ''), onClick: function (event) {
                    if (event.target.classList.contains('ui-gallery--wrapper')) {
                        closeImage();
                    }
                } }, getSliderContent()),
            React.createElement("div", { className: "ui-gallery grid-container grid-two-columns" }, photos && photos.map(function (photo, index) {
                return (React.createElement("div", { className: "grid-item", key: index },
                    React.createElement(UIImage, { alt: photo.description, source: props.baseUrl + photo.mediumThumbPath, onClick: function () {
                            setCurrentImage(props.baseUrl + photo.fullSizePath);
                        }, label: { text: photo.description } })));
            }))));
    }
    else {
        return (React.createElement("div", { className: "ui-gallery grid-container grid-two-columns" }, __spreadArrays(Array(props.skeletons || 10)).map(function (key, index) {
            return (React.createElement("div", { className: "grid-item", key: index },
                React.createElement(UILoader, null)));
        })));
    }
};
//# sourceMappingURL=UIGallery.js.map