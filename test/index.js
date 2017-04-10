'use strict'

const assert = require( 'assert' )
const is = require( '@mojule/is' )
const flatten = require( '../src' )
const testJson = require( './fixtures/test.json' )

describe( 'Flatten', () => {
  it( 'flatterns', () => {
    const flat = flatten( testJson )

    assert( is.object( flat ) )
  })

  it( 'matches', () => {
    const flat = flatten( testJson )

    Object.keys( flat ).forEach( path => {
      const flatValue = flat[ path ]
      const matchedValue = flatten.match( testJson, path )

      assert.deepEqual( flatValue, matchedValue )
    })

    const flat2 = flatten( testJson[ 11 ] )

    Object.keys( flat2 ).forEach( path => {
      const flatValue = flat2[ path ]
      const matchedValue = flatten.match( testJson[ 11 ], path )

      assert.deepEqual( flatValue, matchedValue )
    })
  })

  it( 'expands', () => {
    const flat = flatten( testJson )
    const expanded = flatten.expand( flat )

    assert.deepEqual( expanded, testJson )
  })
})
