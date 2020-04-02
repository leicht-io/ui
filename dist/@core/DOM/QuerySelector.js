var QuerySelector = (function () {
    function QuerySelector() {
    }
    QuerySelector.get = function (query) {
        return document.querySelector(query);
    };
    QuerySelector.getAll = function (query) {
        return document.querySelectorAll(query);
    };
    return QuerySelector;
}());
export { QuerySelector };
//# sourceMappingURL=QuerySelector.js.map