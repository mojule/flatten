'use strict';

var expand = require('./expand');
var flatten = require('./flatten');
var match = require('./match');
var parse = require('./match');

Object.assign(flatten, { expand: expand, match: match, parse: parse });

module.exports = flatten;