import {Swipe} from "../../@core/utils/Swipe";

export class UIGallery {
    private nextSource: string | null = "";
    private previousSource: string | null = "";
    private currentImage: string = "";
    private currentIndex: number = 0;
    private photos: any;

    constructor(container: string, response: any) {
        this.photos = response.photos;

        let index = 0;
        for (const photo of response.photos) {
            const node: Element = document.createElement("DIV");
            node.classList.add("grid-item");
            node.innerHTML = `<img data-index="${index}" src='https://ni.leicht.io/${photo.mediumThumbPath}' data-large='https://ni.leicht.io/${photo.fullSizePath}'>`;

            const image: Element | null = node.querySelector("img");
            if (image) {
                image.addEventListener("load", () => {
                    image.classList.add("loaded");
                });

                image.addEventListener("click", (event: Event) => {
                    if (event && event.target) {
                        this.currentImage = (event.target as any).getAttribute("data-large");
                        this.currentIndex = Number((event.target as any).getAttribute("data-index"));
                        //this.previousSource = this.photos[this.currentIndex - 1].fullSizePath;
                        //this.nextSource = this.photos[this.currentIndex + 1].fullSizePath;

                    }

                    this.showImage(this.currentImage);
                });
            }

            const gallery: Element | null = document.querySelector(container);
            if (gallery) {
                gallery.append(node)
            }

            index++;
        }

        this.run();
    }

    private getBody(): Element | null {
        return document.querySelector("body");
    }

    private getWrapper(): Element | null {
        return document.querySelector(".ui-gallery--wrapper");
    }

    private removePopUpWrapperFromDom(): void {
        const wrapper: any = document.querySelector(".ui-gallery--wrapper");
        if (wrapper) {
            wrapper.innerHTML = "";
        }
    }

    private addPopUpWrapperToDom(): void {
        const body = this.getBody();
        if (body) {
            const div = document.createElement("div");
            div.innerHTML = "<div class='ui-gallery--wrapper'></div>";
            if (div && div.firstChild) {
                body.appendChild(div.firstChild);
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
            wrapper.classList.remove("ui-gallery--wrapper-visible");
            setTimeout(() => {
                this.removePopUpWrapperFromDom();
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

    private showImage(source: string | null): void {
        this.setNextAndPrevImage();

        const wrapper = this.getWrapper();
        if (wrapper && source) {
            const prevImageSrc: any = this.previousSource;
            const nextImageSrc: any = this.nextSource;
            wrapper.innerHTML = `<img draggable='false' id='ui-gallery--prev-image' src='${prevImageSrc}'/><img draggable='false' id='ui-gallery--current-image' src='${source}'/><img draggable='false' id='ui-gallery--next-image' src='${nextImageSrc}'/>`;
            wrapper.classList.add("ui-gallery--wrapper-visible");

            const currentImage: any = document.querySelector("#ui-gallery--current-image");
            currentImage.addEventListener("load", (event) => {
                currentImage.classList.add("loaded");
            });

            const prevImage: any = document.querySelector("#ui-gallery--prev-image");
            prevImage.addEventListener("load", (event) => {
                prevImage.classList.add("loaded");
            });

            const nextImage: any = document.querySelector("#ui-gallery--next-image");
            nextImage.addEventListener("load", (event) => {
                nextImage.classList.add("loaded");
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
        if (!this.photos) {
            return;
        }

        if (this.photos[this.currentIndex + 1]) {
            this.nextSource = "https://ni.leicht.io/" + this.photos[this.currentIndex + 1].fullSizePath;
        } else {
            this.nextSource = "";
        }

        if (this.photos[this.currentIndex - 1]) {
            this.previousSource = "https://ni.leicht.io/" + this.photos[this.currentIndex - 1].fullSizePath;
        } else {
            this.previousSource = "";
        }
    }

    private run(): void {
        this.addPopUpWrapperToDom();
        this.addListeners();
    }
}