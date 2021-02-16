"use strict";

// declare global variables
let gl; 
let points1;
let colors1;
let points2;
let colors2;
let points3;
let colors3;
let points4;
let colors4;
let points5;
let colors5; 
let points6;
let colors6;

window.onload = function init()
{
    let canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }

    //
    //  Initialize our data for a single triangle
    //
    //
    //  Initialize our data for the triangles
    //
    //(red, green, blue) values for all of the vertices
    colors1 = [
        vec3(1, 0, .5),
        vec3(1, 0, .5),
        vec3(1, 0, .5)
    ];

    colors2 = [
        vec3(1, 0, .6),
        vec3(1, 0, .6),
        vec3(1, 0, .6)
    ];

    colors3 = [
        vec3(.3, 0, 1),
        vec3(.3, 0, 1),
        vec3(.3, 0, 1)
    ];

    colors4 = [
        vec3(0, .3, .7),
        vec3(0, .3, .7),
        vec3(0, .3, .7)
    ];

    colors5 = [
        vec3(.8, .8, 0),
        vec3(1, .6, 0),
        vec3(.6, .4, 0)
    ];

    colors6 = [
        vec3(.8, .8, 0),
        vec3(1, .6, 0),
        vec3(.6, .4, 0)
    ];

    // And, add our vertices point into our array of points
    points1 = [
        vec2(-.75, -.6 ), //1st triangle
        vec2( .75, -.6 ), 
        vec2(0.0,  .75 ) 
        ];

    points2 = [
        vec2(-.75, .5),
        vec2(.75, .5),
        vec2(0, -.8)
        ];

    points3 = [
        vec2(-.5, -.4),
        vec2(.5, -.4),
        vec2(0, .5)
    ]

    points4 = [
        vec2(-.5, .3),
        vec2(.5, .3),
        vec2(0, -.55)
    ]
    points5 = [
        vec2(-.2, -.1),
        vec2(.2, -.1),
        vec2(0, .3)        
    ]

    points6 = [
        vec2(-.2, .1),
        vec2(.2, .1),
        vec2(0, -.35)
    ]


    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0, .3, 0, 1.0 );

    //  Load shaders and initialize attribute buffers

    let program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    let cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors1), gl.STATIC_DRAW );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors2), gl.STATIC_DRAW );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors3), gl.STATIC_DRAW );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors4), gl.STATIC_DRAW );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors5), gl.STATIC_DRAW );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors6), gl.STATIC_DRAW );

    let colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    
    // Load the data into the GPU

    let bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points1), gl.STATIC_DRAW );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points2), gl.STATIC_DRAW );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points3), gl.STATIC_DRAW );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points4), gl.STATIC_DRAW );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points5), gl.STATIC_DRAW );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points6), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    let aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( aPosition );

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points1.length );
    gl.drawArrays( gl.TRIANGLES, 0, points2.length );
    gl.drawArrays( gl.TRIANGLES, 0, points3.length );
}
