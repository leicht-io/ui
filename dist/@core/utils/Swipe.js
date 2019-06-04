export class Swipe {
    constructor(element) {
        this.element = null;
        this.element = document.querySelector(element);
        if (this.element) {
            this.element.addEventListener('touchstart', (evt) => {
                this.xDown = evt.touches[0].clientX;
                this.yDown = evt.touches[0].clientY;
            }, false);
        }
    }
    onLeft(callback) {
        this.onLeft = callback;
        return this;
    }
    onRight(callback) {
        this.onRight = callback;
        return this;
    }
    onUp(callback) {
        this.onUp = callback;
        return this;
    }
    onDown(callback) {
        this.onDown = callback;
        return this;
    }
    handleTouchMove(evt) {
        if (!this.xDown || !this.yDown) {
            return;
        }
        const xUp = evt.touches[0].clientX;
        const yUp = evt.touches[0].clientY;
        this.xDiff = this.xDown - xUp;
        this.yDiff = this.yDown - yUp;
        if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) {
            if (this.xDiff > 0) {
                this.onLeft();
            }
            else {
                this.onRight();
            }
        }
        else {
            if (this.yDiff > 0) {
                this.onUp();
            }
            else {
                this.onDown();
            }
        }
        this.xDown = null;
        this.yDown = null;
    }
    run() {
        if (this.element) {
            this.element.addEventListener('touchmove', (evt) => {
                this.handleTouchMove(evt);
            }, false);
        }
    }
}
//# sourceMappingURL=Swipe.js.map