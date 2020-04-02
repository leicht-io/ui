var Swipe = (function () {
    function Swipe(element) {
        var _this = this;
        this.element = null;
        this.element = document.querySelector(element);
        if (this.element) {
            this.element.addEventListener('touchstart', function (evt) {
                _this.xDown = evt.touches[0].clientX;
                _this.yDown = evt.touches[0].clientY;
            }, false);
        }
    }
    Swipe.prototype.onLeft = function (callback) {
        this.onLeft = callback;
        return this;
    };
    Swipe.prototype.onRight = function (callback) {
        this.onRight = callback;
        return this;
    };
    Swipe.prototype.onUp = function (callback) {
        this.onUp = callback;
        return this;
    };
    Swipe.prototype.onDown = function (callback) {
        this.onDown = callback;
        return this;
    };
    Swipe.prototype.handleTouchMove = function (evt) {
        if (!this.xDown || !this.yDown) {
            return;
        }
        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;
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
    };
    Swipe.prototype.run = function () {
        var _this = this;
        if (this.element) {
            this.element.addEventListener('touchmove', function (evt) {
                _this.handleTouchMove(evt);
            }, false);
        }
    };
    return Swipe;
}());
export { Swipe };
//# sourceMappingURL=Swipe.js.map