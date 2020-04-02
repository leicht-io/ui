import { UIModalInterface } from './UIModalInterface';
import { UIComponent } from '../../@core/base/UIComponent';
import { QuerySelector } from '../../@core/DOM/QuerySelector';
import { ClassList } from '../../@core/DOM/ClassList';
import { Event } from '../../@core/DOM/models/Event';

export class UIModal extends UIComponent {
    private keyDownCallback = (event) => this.handleKeyDown(event);

    constructor(content: UIModalInterface) {
        super(content);
    }

    private getParentContainer(): any {
        return QuerySelector.get('.ui-modal--container');
    }

    private hideModal(): void {
        this.removeEventListeners();
        const parentContainer: Element = this.getParentContainer();
        if (parentContainer) {
            ClassList.remove(this.getParentContainer(), 'ui-modal--container--visible');
        }
        this.toggleScroll(false);
        this.destroy();

    }

    private toggleScroll(enable: boolean): void {
        const body: HTMLElement | null = QuerySelector.get('body');

        if (body) {
            if (enable) {
                ClassList.add(body, ['body--disable-scroll']);
            } else {
                ClassList.remove(body, ['body--disable-scroll']);
            }
        }
    }

    private showModal(): void {
        this.toggleScroll(true);
        ClassList.add(this.getParentContainer(), ['ui-modal--container--visible']);
    }

    public addEventListeners(): void {
        const closeBtn: Element | null = QuerySelector.get('.ui-modal--buttons-close');
        if (closeBtn) {
            closeBtn.addEventListener(Event.CLICK, () => {
                this.handleCloseButtonClick();
            });
        }
        this.getParentContainer().addEventListener(Event.CLICK, (event) => {
            this.handleContainerClick(event);
        });

        document.addEventListener(Event.KEYDOWN, this.keyDownCallback);
    }

    private handleCloseButtonClick(): void {
        this.hideModal();
    }

    private handleContainerClick(event: any): void {
        if ((event.target as Node).isSameNode(this.getParentContainer())) {
            this.hideModal();
        }
    }

    private handleKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Escape') {
            this.hideModal();
        }
    }

    public removeEventListeners(): void {
        document.removeEventListener(Event.KEYDOWN, this.keyDownCallback);

        const closeBtn: Element | null = QuerySelector.get('.ui-modal--buttons-close');
        if (closeBtn) {
            closeBtn.removeEventListener(Event.CLICK, (event) => {
                this.handleContainerClick(event);
            });
        }

        const parentContainer: Element = this.getParentContainer();
        if (parentContainer) {
            parentContainer.removeEventListener(Event.CLICK, () => {
                this.handleCloseButtonClick();
            });
        }

    }

    public onRendered(): void {
        this.showModal();
        this.addEventListeners();
    }

    public render(): string {
        let content: string | Element = this.properties.content;
        const classes: string = this.properties.iframe ? 'ui-modal--container-with-iframe' : 'ui-modal--container-with-html';

        if (this.properties.iframe) {
            content = `<iframe src='${this.properties.iframe}'><iframe>`;
        }

        return `<div class="ui-modal--container ${classes}">
                    <div class="ui-modal--wrapper">
                        <div class="ui-modal--title-wrapper">
                            <div class="ui-modal--title"><h5>${this.properties.title}</h5></div>
                            <div class="ui-modal--buttons"><div class="ui-modal--buttons-close">&#10005;</div> </div>
                        </div>
                        <div class="ui-modal--content--wrapper">
                            <div class="ui-modal--content">${content}</div>
                        </div>
                    </div>
                </div>`;
    }

}
