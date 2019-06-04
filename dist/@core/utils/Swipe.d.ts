export declare class Swipe {
    private yDown;
    private xDown;
    private element;
    private xDiff;
    private yDiff;
    constructor(element: string);
    onLeft(callback?: any): this;
    onRight(callback?: any): this;
    onUp(callback?: any): this;
    onDown(callback?: any): this;
    handleTouchMove(evt: any): void;
    run(): void;
}
