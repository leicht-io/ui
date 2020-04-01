import { ClassList } from "../../@core/DOM/ClassList";
import React from "react";
import "./UIGallery.scss";
export const UIGallery = (props) => {
    const [photos, setPhotos] = React.useState(null);
    const [showSlider, setShowSlider] = React.useState(false);
    const [sliderReady, setSliderReady] = React.useState(false);
    const [currentImage, setCurrentImage] = React.useState(null);
    React.useEffect(() => {
        if (currentImage !== null && currentImage !== "") {
            addKeyEventListeners();
            lockBodyScroll(true);
            setShowSlider(true);
        }
        else {
            lockBodyScroll(false);
            setShowSlider(false);
        }
    }, [currentImage]);
    React.useEffect(() => {
        if (props.gallery) {
            setPhotos(props.gallery.photos);
        }
    }, [props.gallery]);
    const lockBodyScroll = (lock) => {
        if (lock) {
            ClassList.add('body--disable-scroll', 'body');
        }
        else {
            ClassList.remove('body--disable-scroll', 'body');
        }
    };
    const addKeyEventListeners = () => {
        document.addEventListener("keyup", (e) => {
            if (e.key === "Escape") {
                setCurrentImage(null);
                setSliderReady(false);
            }
        });
    };
    const getSliderContent = () => {
        if (showSlider && photos) {
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "ui-gallery--current-image " + (sliderReady ? "ui-gallery--current-image-visible" : "") },
                    React.createElement("img", { alt: "Current Photo", draggable: 'false', className: "loaded", src: currentImage && currentImage.source, onLoad: () => {
                            setSliderReady(true);
                        } }),
                    React.createElement("div", { className: "ui-gallery--close", onClick: () => {
                            setCurrentImage(null);
                            setSliderReady(false);
                        } }, "X"))));
        }
        else {
            return null;
        }
    };
    if (photos) {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "ui-gallery--wrapper " + (showSlider ? "ui-gallery--wrapper-visible" : '') }, getSliderContent()),
            React.createElement("div", { className: "ui-gallery grid-container grid-two-columns" }, photos && photos.map((photo, index) => {
                return (React.createElement("div", { className: "grid-item", key: index },
                    React.createElement("img", { alt: photo.description, src: props.baseUrl + photo.mediumThumbPath, "data-index": index, "data-large": props.baseUrl + photo.fullSizePath, onClick: (event) => {
                            const currentImage = event.target.getAttribute("data-large");
                            const currentIndex = Number(event.target.getAttribute("data-index"));
                            setCurrentImage({ source: currentImage, index: currentIndex });
                        }, onLoad: (event) => {
                            ClassList.add(event.target, 'loaded');
                        } }),
                    React.createElement("p", null, photo.description)));
            }))));
    }
    else {
        return (React.createElement("div", { className: "ui-gallery grid-container grid-two-columns" }, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
            return (React.createElement("div", { className: "grid-item", key: index }));
        })));
    }
};
//# sourceMappingURL=UIGallery.js.map