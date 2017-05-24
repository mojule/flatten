'use strict'

const assert = require( 'assert' )
const is = require( '@mojule/is' )
const flatten = require( '../src' )
const testJson = require( './fixtures/test.json' )

describe( 'Flatten', () => {
  it( 'flattens', () => {
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

  it( 'expands to existing', () => {
    const target = []

    const flat = flatten( testJson )
    const expanded = flatten.expand( flat, target )

    assert.deepEqual( expanded, testJson )
  })

  it( 'expands object', () => {
    const from = {
      a: 1,
      b: 2
    }

    const flat = flatten( from )
    const expanded = flatten.expand( flat )

    assert.deepEqual( expanded, from )
  })

  it( 'expands to existing object', () => {
    const target = {
      a: 1
    }

    const from = {
      b: 2
    }

    const expect = {
      a: 1,
      b: 2
    }

    const flat = flatten( from )
    const expanded = flatten.expand( flat, target )

    assert.deepEqual( expanded, expect )
  })

  it( 'simple value', () => {
    const flat = flatten( 1 )

    assert.equal( flat, 1 )
  })

  it( 'bad object', () => {
    const a = {}
    const b = {}

    a.b = b
    b.a = a

    assert.throws( () => flatten( a ) )
  })

  it( 'no match returns undefined', () => {
    const a = {
      b: {
        c: {
          d: 1
        }
      }
    }

    const match = flatten.match( a, '/b/c/d/e/f' )

    assert.equal( match, undefined )
  })
})
