/// <reference path="../lib/Promises.ts" />

function foo ( duration ) {
    var d = new Promises.Deferred();
    setTimeout( () => {
        console.log('DONE');
        d.resolve('hello (after ' + duration + ' miliseconds)')
    }, duration );
    return d.promise();
}

var p0 = foo( 1000 );

p0.then(
    function ( x ) { console.log( 'ZERO', x, p.status(), p.result() ); return 'ZERO'; },
    function () { console.log('ERROR') }
);

var p = Promises.when( p0, foo( 1200 ), foo( 2000 ) );

var p2 = p.then(
    function ( x, y, z ) { console.log( x, y, z, p.status(), p.result() ); return 'Heya'; },
    function () { console.log('ERROR') }
).then(
    function ( x ) { console.log( x, p.status(), p.result() ); return 'Hoya'; },
    function () { console.log('ERROR') }
);

setTimeout( () => {
    p2.then(
        function ( x ) { console.log( '2', x, p.status(), p.result() ) },
        function () { console.log('ERROR') }
    );
}, 1200 );

console.log( p.status() );
console.log( p.result() );








