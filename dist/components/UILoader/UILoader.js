import { DOM } from "../../@core/DOM/DOM";
export class UILoader {
    static getLoader() {
        const loader = DOM.createElement("div", '<div class="double-bounce1"></div><div class="double-bounce2"></div>');
        loader.classList.add("ui-loader");
        loader.id = Math.random().toString(36).substr(2, 9);
        return loader;
    }
    static removeLoader(id) {
        const loader = document.getElementById(id);
        if (loader && loader.parentNode) {
            loader.classList.add("ui-loader--fade-out");
            setTimeout(() => {
                if (loader && loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 250);
        }
    }
}
//# sourceMappingURL=UILoader.js.map