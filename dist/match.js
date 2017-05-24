'use strict';

var is = require('@mojule/is');
var parse = require('./parse');
var slugToKey = require('./slug-to-key');

var match = function match(target, path) {
  return parse(path).map(slugToKey).reduce(function (match, slug) {
    return match[slug];
  }, target);
};

module.exports = match;