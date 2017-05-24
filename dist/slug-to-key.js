'use strict';

var slugToKey = function slugToKey(slug) {
  if (slug.charAt(0) === '[') return slug.slice(1, slug.indexOf(']'));

  return slug;
};

module.exports = slugToKey;