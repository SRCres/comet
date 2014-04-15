(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    root.Box2D = factory();
  }
})(this, function () {
  var root = {};
  (function () {
