/**
 * Defines a read only property on Object
 *
 * @param {Object} from
 * @param {String} where
 * @param {*} value
 */
exports.hiddenProp = function _hiddenProp(from, where, value) {
  Object.defineProperty(from, where, {
    writable: false,
    configurable: false,
    enumerable: false,
    value
  });
};
