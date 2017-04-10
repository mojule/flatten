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

## Usage

Handles objects and arrays. Probably fails on property names that contain
square brackets or dots - todo.
