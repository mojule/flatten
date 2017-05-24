'use strict'

const expand = require( './expand' )
const flatten = require( './flatten' )
const match = require( './match' )
const parse = require( './match' )

Object.assign( flatten, { expand, match, parse } )

module.exports = flatten
