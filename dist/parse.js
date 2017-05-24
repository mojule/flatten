'use strict';

var parse = function parse(path) {
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

module.exports = parse;