import {UIModal} from "../src/components/UIModal";

export class App {

    constructor() {
        new UIModal({container: "body", title: "hej"});
    }

}

new App();