'use strict';

/**
 * @module Utils
 */

/**
 * Convenience function to deeply iterate an object.
 *
 * @param {object|string} item - The item to iterate.
 * @param {function} callback - The callback function.
 */
exports.iterate = function iterate(item, callback) {
    Object.keys(item).forEach(function (key) {
        if (typeof item[key] === 'object') {
            return iterate(item[key], callback);
        } else {
            callback(item, key);
        }
    });
};

/**
 * Clones an object.
 *
 * @param {object} object - An object to clone.
 */
exports.clone = function (object) {
    return JSON.parse(JSON.stringify(object));
};

/**
 * Extends objects.
 *
 * @type {function}
 * @method
 */
exports.assign = !Object.assign ?
    /**
     * @see {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill}
     */
    function (target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert first argument to object');
        }

        var to = Object(target);
        for (var i = 1; i < arguments.length; i++) {
            var nextSource = arguments[i];
            if (nextSource === undefined || nextSource === null) {
                continue;
            }
            nextSource = Object(nextSource);

            var keysArray = Object.keys(nextSource);
            for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                var nextKey = keysArray[nextIndex];
                var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                if (desc !== undefined && desc.enumerable) {
                    to[nextKey] = nextSource[nextKey];
                }
            }
        }
        return to;
    }
    : Object.assign;