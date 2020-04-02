var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { UIComponent } from '../../@core/base/UIComponent';
import { QuerySelector } from '../../@core/DOM/QuerySelector';
import { ClassList } from '../../@core/DOM/ClassList';
import { Event } from '../../@core/DOM/models/Event';
var UIModal = (function (_super) {
    __extends(UIModal, _super);
    function UIModal(content) {
        var _this = _super.call(this, content) || this;
        _this.keyDownCallback = function (event) { return _this.handleKeyDown(event); };
        return _this;
    }
    UIModal.prototype.getParentContainer = function () {
        return QuerySelector.get('.ui-modal--container');
    };
    UIModal.prototype.hideModal = function () {
        this.removeEventListeners();
        var parentContainer = this.getParentContainer();
        if (parentContainer) {
            ClassList.remove(this.getParentContainer(), 'ui-modal--container--visible');
        }
        this.toggleScroll(false);
        this.destroy();
    };
    UIModal.prototype.toggleScroll = function (enable) {
        var body = QuerySelector.get('body');
        if (body) {
            if (enable) {
                ClassList.add(body, ['body--disable-scroll']);
            }
            else {
                ClassList.remove(body, ['body--disable-scroll']);
            }
        }
    };
    UIModal.prototype.showModal = function () {
        this.toggleScroll(true);
        ClassList.add(this.getParentContainer(), ['ui-modal--container--visible']);
    };
    UIModal.prototype.addEventListeners = function () {
        var _this = this;
        var closeBtn = QuerySelector.get('.ui-modal--buttons-close');
        if (closeBtn) {
            closeBtn.addEventListener(Event.CLICK, function () {
                _this.handleCloseButtonClick();
            });
        }
        this.getParentContainer().addEventListener(Event.CLICK, function (event) {
            _this.handleContainerClick(event);
        });
        document.addEventListener(Event.KEYDOWN, this.keyDownCallback);
    };
    UIModal.prototype.handleCloseButtonClick = function () {
        this.hideModal();
    };
    UIModal.prototype.handleContainerClick = function (event) {
        if (event.target.isSameNode(this.getParentContainer())) {
            this.hideModal();
        }
    };
    UIModal.prototype.handleKeyDown = function (event) {
        if (event.key === 'Escape') {
            this.hideModal();
        }
    };
    UIModal.prototype.removeEventListeners = function () {
        var _this = this;
        document.removeEventListener(Event.KEYDOWN, this.keyDownCallback);
        var closeBtn = QuerySelector.get('.ui-modal--buttons-close');
        if (closeBtn) {
            closeBtn.removeEventListener(Event.CLICK, function (event) {
                _this.handleContainerClick(event);
            });
        }
        var parentContainer = this.getParentContainer();
        if (parentContainer) {
            parentContainer.removeEventListener(Event.CLICK, function () {
                _this.handleCloseButtonClick();
            });
        }
    };
    UIModal.prototype.onRendered = function () {
        this.showModal();
        this.addEventListeners();
    };
    UIModal.prototype.render = function () {
        var content = this.properties.content;
        var classes = this.properties.iframe ? 'ui-modal--container-with-iframe' : 'ui-modal--container-with-html';
        if (this.properties.iframe) {
            content = "<iframe src='" + this.properties.iframe + "'><iframe>";
        }
        return "<div class=\"ui-modal--container " + classes + "\">\n                    <div class=\"ui-modal--wrapper\">\n                        <div class=\"ui-modal--title-wrapper\">\n                            <div class=\"ui-modal--title\"><h5>" + this.properties.title + "</h5></div>\n                            <div class=\"ui-modal--buttons\"><div class=\"ui-modal--buttons-close\">&#10005;</div> </div>\n                        </div>\n                        <div class=\"ui-modal--content--wrapper\">\n                            <div class=\"ui-modal--content\">" + content + "</div>\n                        </div>\n                    </div>\n                </div>";
    };
    return UIModal;
}(UIComponent));
export { UIModal };
//# sourceMappingURL=UIModal.js.map