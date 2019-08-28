import {UIModal} from "../src/components/UIModal";
import "../src/@core/styles/@theme.scss";
import {UIGallery} from "../src/components/UIGallery";
import {UIMenu} from "../src/components/UIMenu";
import {UIReadingPositionIndicator} from "../src/components/UIReadingPositionIndicator/UIReadingPositionIndicator";
import {UIBuilder} from "../src/components/UIBuilder/UIBuilder";
import {galleryMockResponse} from "./assets/gallery.mock";
import {QuerySelector} from "../src/@core/DOM/QuerySelector";
import {Event} from "../src/@core/DOM/models/Event";

export class App {

    constructor() {
        new UIBuilder()
            .with(UIMenu)
            .with(UIReadingPositionIndicator)
            .run();

        setTimeout(() => {
            new UIGallery({
                selector: ".ui-gallery",
                baseUrl: "https://ni.leicht.io/",
                data: galleryMockResponse
            }).render();
        }, 1500);

        const modal: HTMLElement | null = QuerySelector.get("#showModal");
        const modalWithHtml: HTMLElement | null = QuerySelector.get("#showModalWithHtml");

        if (modal && modalWithHtml) {
            modal.addEventListener(Event.CLICK, () => {
                new UIModal({
                    container: "body",
                    title: "IFRAME with Wikipedia",
                    iframe: "https://en.wikipedia.org/wiki/Ardbeg_distillery"
                });
            });

            modalWithHtml.addEventListener(Event.CLICK, () => {
                new UIModal({container: "body", title: "HTML", content: "<p>hej</p>"});
            });
        }
    }

}

new App();
