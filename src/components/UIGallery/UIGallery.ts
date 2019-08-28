import {Swipe} from "../../@core/utils/Swipe";
import {UIGalleryOptions} from "./UIGalleryOptions";
import {BaseComponent} from "../UIBuilder/UIBuilder";
import {QuerySelector} from "../../@core/DOM/QuerySelector";
import {DOM} from "../../@core/DOM/DOM";
import {ClassList} from "../../@core/DOM/ClassList";
import {GridSkeleton} from "../../@core/utils/GridSkeleton";

export class UIGallery extends BaseComponent<UIGalleryOptions> {
    private nextSource: string | null = "";
    private previousSource: string | null = "";
    private currentImage: string = "";
    private currentIndex: number = 0;
    private photos: any;
    private options: any;

    constructor(config?: UIGalleryOptions) {
        super(config);

        if (config) {
            this.photos = config.data.photos;
            this.options = config;
        }
    }

    private getBody(): HTMLElement | null {
        return QuerySelector.get("body");
    }

    private getWrapper(): Element | null {
        return QuerySelector.get(".ui-gallery--wrapper");
    }

    private removePopUpWrapperFromDom(): void {
        DOM.removeChildren(".ui-gallery--wrapper");
    }

    private addPopUpWrapperToDom(): void {
        const body = this.getBody();

        if (body) {
            const div = DOM.createElement("div", "<div class='ui-gallery--wrapper'></div>");
            if (div && div.firstChild) {
                DOM.append(body, div.firstChild);
            }
        }

        const wrapper = this.getWrapper();
        if (wrapper) {
            wrapper.addEventListener("click", (event: Event) => {
                if ((event.target as any).tagName !== "IMG") {
                    this.hideImage();
                }
            });
        }
    }

    private hideImage(): void {
        const wrapper = this.getWrapper();
        if (wrapper) {
            ClassList.remove(wrapper, "ui-gallery--wrapper-visible")
            setTimeout(() => {
                this.removePopUpWrapperFromDom();
                this.toggleScroll(false);
            }, 250);
        }
    }

    private isWrapperVisible(): boolean {
        const wrapper = this.getWrapper();
        if (wrapper) {
            const visibility = window.getComputedStyle(wrapper, null).getPropertyValue('visibility');
            if (visibility === "visible") {
                return true;
            }
        }

        return false;
    }

    private toggleScroll(enable: boolean): void {
        if (enable) {
            ClassList.add('body--disable-scroll', 'body');
        } else {
            ClassList.remove('body--disable-scroll', 'body');
        }
    }

    private showImage(source: string | null): void {
        this.toggleScroll(true);
        this.setNextAndPrevImage();

        const wrapper = this.getWrapper();
        if (wrapper && source) {
            const prevImageSrc: any = this.previousSource;
            const nextImageSrc: any = this.nextSource;
            wrapper.innerHTML = `
                                    <img alt="Previous Photo" draggable='false' id='ui-gallery--prev-image' src='${prevImageSrc}'/>
                                    <div class="ui-gallery--current-image"><img alt="Current Photo" draggable='false' id='ui-gallery--current-image' src='${source}'/>
                                    <div class="ui-gallery--close">X</div></div>
                                    <img alt="Next Image" draggable='false' id='ui-gallery--next-image' src='${nextImageSrc}'/>
                                `;

            ClassList.add(wrapper, "ui-gallery--wrapper-visible");

            const currentImage: any = QuerySelector.get("#ui-gallery--current-image");
            currentImage.addEventListener("load", () => {
                ClassList.add(currentImage, "loaded");
            });

            const prevImage: any = QuerySelector.get("#ui-gallery--prev-image");
            prevImage.addEventListener("load", () => {
                ClassList.add(prevImage, "loaded");
            });

            const nextImage: any = QuerySelector.get("#ui-gallery--next-image");
            nextImage.addEventListener("load", () => {
                ClassList.add(nextImage, "loaded");
            });
        }


        const swipe: Swipe = new Swipe('#ui-gallery--current-image');
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

    private addListeners(): void {
        this.addKeyEventListeners();
    }

    private addKeyEventListeners(): void {
        document.addEventListener("keydown", (event) => {
            if (this.isWrapperVisible()) {
                if (event.code == 'ArrowLeft') {
                    if (this.currentIndex > 0) {
                        this.currentIndex = this.currentIndex - 1;
                        this.showImage(this.previousSource);
                    }
                } else if (event.code == 'ArrowRight' && this.photos) {
                    if (this.currentIndex < this.photos.length - 1) {
                        this.currentIndex = this.currentIndex + 1;
                        this.showImage(this.nextSource);
                    }
                }
            }
        });
    }

    private setNextAndPrevImage(): void {
        if (!this.photos && !this.options !== null) {
            return;
        }

        if (this.photos[this.currentIndex + 1]) {
            this.nextSource = this.options.baseUrl + this.photos[this.currentIndex + 1].fullSizePath;
        } else {
            this.nextSource = "";
        }

        if (this.photos[this.currentIndex - 1]) {
            this.previousSource = this.options.baseUrl + this.photos[this.currentIndex - 1].fullSizePath;
        } else {
            this.previousSource = "";
        }
    }

    public render() {
        if (!this.config) {
            return;
        }
        const gallery: HTMLElement | null = QuerySelector.get(this.config.selector);
        if (!gallery) {
            return;
        }

        document.addEventListener("keyup", (e: any) => {
            if (e.key === "Escape") {
                this.hideImage();
            }
        });

        const photoNodes: Element[] = [];
        for (let i = 0; i < this.config.data.photos.length; i++) {
            const photo: any = this.config.data.photos[i];
            const node: Element = DOM.createElement("div", `<img alt="${photo.description}" data-index="${i}" src='${this.config.baseUrl + photo.mediumThumbPath}' data-large='${this.config.baseUrl + photo.fullSizePath}'><p>${photo.description}</p>`, "grid-item");
            const image: Element | null = node.querySelector("img");

            if (image) {
                image.addEventListener("load", () => {
                    ClassList.add(image, 'loaded');
                });

                image.addEventListener("click", (event: Event) => {
                    if (event && event.target) {
                        this.currentImage = (event.target as any).getAttribute("data-large");
                        this.currentIndex = Number((event.target as any).getAttribute("data-index"));
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
