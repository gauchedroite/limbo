
import Freezer = require("../freezer/Freezer");
import Utils = require("../freezer/utils");

var freezer = new Freezer({
    a: {x: 1, y: 2, z: [0, 1, 2] },
    b: [ 5, 6, 7 , { m: 1, n: 2 } ],
    c: 'Hola',
    d: null // It is possible to store whatever
}, {});

// Let's get the frozen data stored
var state = freezer.get();

//Listen to changes in the state. New value will have the new state for your app
freezer.on('update', function( newValue: any ) {
    console.log( 'I was updated' );
});

// The data is read as usual
console.log( state.c ); // logs 'Hola'




export default function State() {
    return 42;
}
