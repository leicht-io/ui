import { DOM } from '../../@core/DOM/DOM';

export class UILoader {

    public static getLoader(): Element {
        const loader: Element = DOM.createElement('div', '<div class="double-bounce1"></div><div class="double-bounce2"></div>');
        loader.classList.add('ui-loader');
        loader.id = Math.random().toString(36).substr(2, 9);

        return loader;
    }

    public static removeLoader(id: string): void {
        const loader: HTMLElement | null = document.getElementById(id);
        if (loader && loader.parentNode) {
            loader.classList.add('ui-loader--fade-out');

            setTimeout(() => {
                if (loader && loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 250);
        }
    }
}
