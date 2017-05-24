'use strict';

var is = require('@mojule/is');
var parse = require('./parse');
var slugToKey = require('./slug-to-key');

var isArraySlug = function isArraySlug(slug) {
  return slug.charAt(0) === '[';
};

var expand = function expand(source, target) {
  var keys = Object.keys(source);

  if (is.undefined(target)) {
    var firstPath = keys[0];
    var firstSlug = parse(firstPath)[0];
    var isArray = isArraySlug(firstSlug);

    target = isArray ? [] : {};
  }

  var add = function add(path) {
    var slugs = parse(path);

    var value = source[path];
    var current = target;

    slugs.forEach(function (slug, i) {
      var isLast = i === slugs.length - 1;
      var key = slugToKey(slug);

      if (isLast) {
        current[key] = value;
      } else if (is.undefined(current[key])) {
        current[key] = isArraySlug(slugs[i + 1]) ? [] : {};
      }

      current = current[key];
    });
  };

  keys.forEach(add);

  return target;
};

module.exports = expand;