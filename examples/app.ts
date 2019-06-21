import {UIModal} from "../src/components/UIModal";
import {DOM} from "../src/@core/utils/DOM";
import "../src/@core/styles/@theme.scss";
import {UIGallery} from "../src/components/UIGallery";
import {UIMenu} from "../src/components/UIMenu";
import {UIReadingPositionIndicator} from "../src/components/UIReadingPositionIndicator/UIReadingPositionIndicator";
import {UIBuilder} from "../src/components/UIBuilder/UIBuilder";
import {galleryMockResponse} from "./assets/gallery.mock";

export class App {

    constructor() {
        new UIBuilder()
            .with(UIMenu)
            .with(UIReadingPositionIndicator)
            .with(UIGallery, {selector: ".ui-gallery", baseUrl: "https://ni.leicht.io/", data: galleryMockResponse})
            .run();

        DOM.query("#showModal").addEventListener("click", () => {
            new UIModal({
                container: "body",
                title: "IFRAME with Wikipedia",
                iframe: "https://en.wikipedia.org/wiki/Ardbeg_distillery"
            });
        });

        DOM.query("#showModalWithHtml").addEventListener("click", () => {
            new UIModal({container: "body", title: "HTML", content: "<p>hej</p>"});
        });
    }

}

new App();
