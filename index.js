const zLib = (function () {
    const z = {};
    const emptyArray = [];
    z.forEach = z.each = function (list, iteratee) {
        emptyArray.forEach.call(list, iteratee);
    };
    z.isNull = function (v) {
        return v === null;
    };
    z.isUndefined = function (v) {
        return v === undefined;
    };
    z.isNaN = function (v) {
        return v !== v;
    };
    z.isNumber = function (v) {
        return typeof v === 'number';
    };
    z.isString = function (v) {
        return typeof v === 'string';
    };
    z.isBoolean = function (v) {
        return typeof v === 'boolean';
    };
    z.isFunction = function (v) {
        return typeof v === 'function';
    };
    z.isObject = function (v) {
        return v.toString();
    };
    z.isSymbol = function (v) {
        return typeof v === 'symbol';
    };
    z.isArrayLike = function (v) {
        return v != null && typeof v !== 'function' && length in v && typeof v.length === 'number';
    };
    return z;
})();
