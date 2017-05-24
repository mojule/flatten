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

module.exports = flatten
