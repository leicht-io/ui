import {UIModal} from "../src/components/UIModal";
import {DOM} from "../src/@core/utils/DOM";

export class App {

    constructor() {
        DOM.query("#showModal").addEventListener("click", () => {
            new UIModal({container: "body", title: "IFRAME with Wikipedia", iframe: "https://en.wikipedia.org/wiki/Ardbeg_distillery"});
        });

        DOM.query("#showModalWithHtml").addEventListener("click", () => {
            new UIModal({container: "body", title: "HTML", content: "<p>hej</p>"});
        });
    }

}

new App();