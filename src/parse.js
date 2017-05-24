'use strict'

const parse = path => {
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

module.exports = parse
