'use strict';

var is = require('@mojule/is');
var utils = require('@mojule/utils');

var clone = utils.clone;


var isValueType = function isValueType(target) {
  return is.string(target) || is.number(target) || is.boolean(target) || is.null(target);
};

var flatten = function flatten(source) {
  try {
    source = clone(source);
  } catch (e) {
    throw new Error('Expected JSON compatible value');
  }

  var isFlattenable = is.object(source) && !is.empty(source) || is.array(source) && source.length > 0;

  if (!isFlattenable) return source;

  var target = {};

  var route = function route(current) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var isArray = is.array(current);

    var isValue = isArray && current.length === 0 || isValueType(current) || is.empty(current);

    if (isValue) {
      target[prefix] = current;

      return;
    }

    if (is.array(current)) {
      current.forEach(function (value, i) {
        route(value, prefix + '[' + i + ']');
      });

      return;
    }

    if (prefix !== '') prefix += '.';

    Object.keys(current).forEach(function (key) {
      route(current[key], '' + prefix + key);
    });
  };

  route(source);

  return target;
};

module.exports = flatten;