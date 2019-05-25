import {UIModal} from "../src/components/UIModal";

export class App {

    constructor() {
        document.getElementById("showModal").addEventListener("click", () => {
            console.log("clicked")
            new UIModal({container: "body", title: "hej"});
        });
    }

}

new App();