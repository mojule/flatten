'use strict'

const is = require( '@mojule/is' )
const parse = require( './parse' )
const slugToKey = require( './slug-to-key' )

const match = ( target, path ) =>
  parse( path ).map( slugToKey ).reduce(
    ( match, slug ) => is.undefined( match ) ? match : match[ slug ],
    target
  )

module.exports = match
