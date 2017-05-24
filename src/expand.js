'use strict'

const is = require( '@mojule/is' )
const parse = require( './parse' )
const slugToKey = require( './slug-to-key' )

const isArraySlug = slug => slug.charAt( 0 ) === '['

const expand = ( source, target ) => {
  const keys = Object.keys( source )

  if( is.undefined( target ) ){
    const firstPath = keys[ 0 ]
    const firstSlug = parse( firstPath )[ 0 ]
    const isArray = isArraySlug( firstSlug )

    target = isArray ? [] : {}
  }

  const add = path => {
    const slugs = parse( path )

    const value = source[ path ]
    let current = target

    slugs.forEach( ( slug, i ) => {
      const isLast = i === slugs.length - 1
      const key = slugToKey( slug )

      if( isLast ){
        current[ key ] = value
      } else if( is.undefined( current[ key ] ) ) {
        current[ key ] = isArraySlug( slugs[ i + 1 ] ) ? [] : {}
      }

      current = current[ key ]
    })
  }

  keys.forEach( add )

  return target
}

module.exports = expand
