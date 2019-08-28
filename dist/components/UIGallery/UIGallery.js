import { Swipe } from "../../@core/utils/Swipe";
import { BaseComponent } from "../UIBuilder/UIBuilder";
import { QuerySelector } from "../../@core/DOM/QuerySelector";
import { DOM } from "../../@core/DOM/DOM";
import { ClassList } from "../../@core/DOM/ClassList";
import { GridSkeleton } from "../../@core/utils/GridSkeleton";
export class UIGallery extends BaseComponent {
    constructor(config) {
        super(config);
        this.nextSource = "";
        this.previousSource = "";
        this.currentImage = "";
        this.currentIndex = 0;
        if (config) {
            this.photos = config.data.photos;
            this.options = config;
        }
    }
    getBody() {
        return QuerySelector.get("body");
    }
    getWrapper() {
        return QuerySelector.get(".ui-gallery--wrapper");
    }
    removePopUpWrapperFromDom() {
        DOM.removeChildren(".ui-gallery--wrapper");
    }
    addPopUpWrapperToDom() {
        const body = this.getBody();
        if (body) {
            const div = DOM.createElement("div", "<div class='ui-gallery--wrapper'></div>");
            if (div && div.firstChild) {
                DOM.append(body, div.firstChild);
            }
        }
        const wrapper = this.getWrapper();
        if (wrapper) {
            wrapper.addEventListener("click", (event) => {
                if (event.target.tagName !== "IMG") {
                    this.hideImage();
                }
            });
        }
    }
    hideImage() {
        const wrapper = this.getWrapper();
        if (wrapper) {
            ClassList.remove(wrapper, "ui-gallery--wrapper-visible");
            setTimeout(() => {
                this.removePopUpWrapperFromDom();
                this.toggleScroll(false);
            }, 250);
        }
    }
    isWrapperVisible() {
        const wrapper = this.getWrapper();
        if (wrapper) {
            const visibility = window.getComputedStyle(wrapper, null).getPropertyValue('visibility');
            if (visibility === "visible") {
                return true;
            }
        }
        return false;
    }
    toggleScroll(enable) {
        if (enable) {
            ClassList.add('body--disable-scroll', 'body');
        }
        else {
            ClassList.remove('body--disable-scroll', 'body');
        }
    }
    showImage(source) {
        this.toggleScroll(true);
        this.setNextAndPrevImage();
        const wrapper = this.getWrapper();
        if (wrapper && source) {
            const prevImageSrc = this.previousSource;
            const nextImageSrc = this.nextSource;
            wrapper.innerHTML = `
                                    <img alt="Previous Photo" draggable='false' id='ui-gallery--prev-image' src='${prevImageSrc}'/>
                                    <div class="ui-gallery--current-image"><img alt="Current Photo" draggable='false' id='ui-gallery--current-image' src='${source}'/>
                                    <div class="ui-gallery--close">X</div></div>
                                    <img alt="Next Image" draggable='false' id='ui-gallery--next-image' src='${nextImageSrc}'/>
                                `;
            ClassList.add(wrapper, "ui-gallery--wrapper-visible");
            const currentImage = QuerySelector.get("#ui-gallery--current-image");
            currentImage.addEventListener("load", () => {
                ClassList.add(currentImage, "loaded");
            });
            const prevImage = QuerySelector.get("#ui-gallery--prev-image");
            prevImage.addEventListener("load", () => {
                ClassList.add(prevImage, "loaded");
            });
            const nextImage = QuerySelector.get("#ui-gallery--next-image");
            nextImage.addEventListener("load", () => {
                ClassList.add(nextImage, "loaded");
            });
        }
        const swipe = new Swipe('#ui-gallery--current-image');
        swipe.onLeft(() => {
            if (this.photos && this.currentIndex < this.photos.length - 1) {
                this.currentIndex = this.currentIndex + 1;
                this.showImage(this.nextSource);
            }
        });
        swipe.onRight(() => {
            if (this.currentIndex > 0) {
                this.currentIndex = this.currentIndex - 1;
                this.showImage(this.previousSource);
            }
        });
        swipe.onUp(() => {
        });
        swipe.onDown(() => {
        });
        swipe.run();
    }
    addListeners() {
        this.addKeyEventListeners();
    }
    addKeyEventListeners() {
        document.addEventListener("keydown", (event) => {
            if (this.isWrapperVisible()) {
                if (event.code == 'ArrowLeft') {
                    if (this.currentIndex > 0) {
                        this.currentIndex = this.currentIndex - 1;
                        this.showImage(this.previousSource);
                    }
                }
                else if (event.code == 'ArrowRight' && this.photos) {
                    if (this.currentIndex < this.photos.length - 1) {
                        this.currentIndex = this.currentIndex + 1;
                        this.showImage(this.nextSource);
                    }
                }
            }
        });
    }
    setNextAndPrevImage() {
        if (!this.photos && !this.options !== null) {
            return;
        }
        if (this.photos[this.currentIndex + 1]) {
            this.nextSource = this.options.baseUrl + this.photos[this.currentIndex + 1].fullSizePath;
        }
        else {
            this.nextSource = "";
        }
        if (this.photos[this.currentIndex - 1]) {
            this.previousSource = this.options.baseUrl + this.photos[this.currentIndex - 1].fullSizePath;
        }
        else {
            this.previousSource = "";
        }
    }
    render() {
        if (!this.config) {
            return;
        }
        const gallery = QuerySelector.get(this.config.selector);
        if (!gallery) {
            return;
        }
        document.addEventListener("keyup", (e) => {
            if (e.key === "Escape") {
                this.hideImage();
            }
        });
        const photoNodes = [];
        for (let i = 0; i < this.config.data.photos.length; i++) {
            const photo = this.config.data.photos[i];
            const node = DOM.createElement("div", `<img alt="${photo.description}" data-index="${i}" src='${this.config.baseUrl + photo.mediumThumbPath}' data-large='${this.config.baseUrl + photo.fullSizePath}'><p>${photo.description}</p>`, "grid-item");
            const image = node.querySelector("img");
            if (image) {
                image.addEventListener("load", () => {
                    ClassList.add(image, 'loaded');
                });
                image.addEventListener("click", (event) => {
                    if (event && event.target) {
                        this.currentImage = event.target.getAttribute("data-large");
                        this.currentIndex = Number(event.target.getAttribute("data-index"));
                    }
                    this.showImage(this.currentImage);
                });
            }
            photoNodes.push(node);
        }
        GridSkeleton.handle(gallery, photoNodes);
        this.addPopUpWrapperToDom();
        this.addListeners();
    }
}
//# sourceMappingURL=UIGallery.js.map