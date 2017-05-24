# flatten

Flattens and expands nested objects

## Install

`npm install @mojule/flatten`

## Example

```javascript
const flatten = require( '@mojule/flatten' )
const obj = {
  person: {
    firstName: 'Nik',
    lastName: 'Coughlin'
  }
}

const { expand, match } = flatten

const firstName = match( obj, 'person.firstName' )

// "Nik"
console.log( firstName )

const flat = flatten( obj )

/*
{
  "person.firstName": "Nik",
  "person.lastName": "Coughlin"
}
*/
console.log( flat )

const expanded = expand( flat )

/*
{
  "person": {
    "firstName": "Nik",
    "lastName": "Coughlin"
  }
}
*/
console.log( expanded )
```

You can also require flatten, expand, match and parse on their own:

```javascript
const flatten = require( '@mojule/flatten/dist/flatten' )
const expand = require( '@mojule/flatten/dist/expand' )
const match = require( '@mojule/flatten/dist/match' )
const parse = require( '@mojule/flatten/dist/parse' )
```

## Usage

Handles objects and arrays. Probably fails on property names that contain
square brackets or dots - todo.
