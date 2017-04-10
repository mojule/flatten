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

var parseSlugs = function parseSlugs(path) {
  var slugs = [];

  var slug = '';

  path.split('').forEach(function (c) {
    if (c === '.') {
      if (slug !== '') {
        slugs.push(slug);
        slug = '';
      }

      return;
    }

    if (c === '[') {
      if (slug !== '') {
        slugs.push(slug);
      }
      slug = '';
    }

    slug += c;

    if (c === ']') {
      slugs.push(slug);
      slug = '';
    }
  });

  if (slug !== '') slugs.push(slug);

  return slugs;
};

var slugToKey = function slugToKey(slug) {
  if (slug.charAt(0) === '[') return slug.slice(1, slug.indexOf(']'));

  return slug;
};

var match = function match(target, path) {
  return parseSlugs(path).map(slugToKey).reduce(function (match, slug) {
    if (match === undefined) return match;

    return match[slug];
  }, target);
};

var isArraySlug = function isArraySlug(slug) {
  return slug.charAt(0) === '[';
};

var expand = function expand(source, target) {
  var keys = Object.keys(source);

  if (is.undefined(target)) {
    var firstPath = keys[0];
    var firstSlug = parseSlugs(firstPath)[0];
    var isArray = isArraySlug(firstSlug);

    target = isArray ? [] : {};
  }

  var add = function add(path) {
    var slugs = parseSlugs(path);

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

Object.assign(flatten, { expand: expand, match: match });

module.exports = flatten;