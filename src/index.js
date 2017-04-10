'use strict'

const is = require( '@mojule/is' )
const utils = require( '@mojule/utils' )

const { clone } = utils

const isValueType = target =>
  is.string( target ) || is.number( target ) || is.boolean( target ) ||
  is.null( target )

const flatten = source => {
  try {
    source = clone( source )
  } catch( e ){
    throw new Error( 'Expected JSON compatible value' )
  }

  const isFlattenable =
    ( is.object( source ) && !is.empty( source ) ) ||
    ( is.array( source ) && source.length > 0 )

  if( !isFlattenable )
    return source

  const target = {}

  const route = ( current, prefix = '' ) => {
    const isArray = is.array( current )

    const isValue =
      ( isArray && current.length === 0 ) ||
      isValueType( current ) || is.empty( current )

    if( isValue ){
      target[ prefix ] = current

      return
    }

    if( is.array( current ) ){
      current.forEach( ( value, i ) => {
        route( value, `${ prefix }[${ i }]` )
      })

      return
    }

    if( prefix !== '' )
      prefix += '.'

    Object.keys( current ).forEach( key => {
      route( current[ key ], `${ prefix }${ key }` )
    })
  }

  route( source )

  return target
}

const parseSlugs = path => {
  const slugs = []

  let slug = ''

  path.split( '' ).forEach( c => {
    if( c === '.' ){
      if( slug !== '' ){
        slugs.push( slug )
        slug = ''
      }

      return
    }

    if( c === '[' ){
      if( slug !== '' ){
        slugs.push( slug )
      }
      slug = ''
    }

    slug += c

    if( c === ']' ){
      slugs.push( slug )
      slug = ''
    }
  })

  if( slug !== '' )
    slugs.push( slug )

  return slugs
}

const slugToKey = slug => {
  if( slug.charAt( 0 ) === '[' )
    return slug.slice( 1, slug.indexOf( ']' ) )

  return slug
}

const match = ( target, path ) =>
  parseSlugs( path ).map( slugToKey ).reduce( ( match, slug ) => {
    if( match === undefined )
      return match

    return match[ slug ]
  }, target )

const isArraySlug = slug => slug.charAt( 0 ) === '['

const expand = ( source, target ) => {
  const keys = Object.keys( source )

  if( is.undefined( target ) ){
    const firstPath = keys[ 0 ]
    const firstSlug = parseSlugs( firstPath )[ 0 ]
    const isArray = isArraySlug( firstSlug )

    target = isArray ? [] : {}
  }

  const add = path => {
    const slugs = parseSlugs( path )

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

Object.assign( flatten, { expand, match } )

module.exports = flatten
