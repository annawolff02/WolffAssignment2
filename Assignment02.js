"use strict";

// declare global variables
let gl; 
let points;
let colors;


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
    colors = [
        vec3(1, 0, .5), //up pink
        vec3(1, 0, .5),
        vec3(1, 0, .5),

        vec3(1, 0, .6), //down pink
        vec3(1, 0, .6),
        vec3(1, 0, .6),

        vec3(.3, 0, .9), //up blue
        vec3(.3, 0, .9),
        vec3(.3, 0, .9),

        vec3(.3, 0, 1), //down blue
        vec3(.3, 0, 1),
        vec3(.3, 0, 1),

        vec3(1, .6, 0), //up yellow (orange)
        vec3(1, .6, 0),
        vec3(1, .6, 0),

        vec3(1, .6, 0), //last 3 are mini triangles
        vec3(1, .6, 0),
        vec3(1, .8, 0),

        vec3(1, .6, 0), 
        vec3(1, .6, 0),
        vec3(1, .8, 0),

        vec3(1, .6, 0), 
        vec3(1, .6, 0),
        vec3(1, .8, 0)

        
    ];

    // And, add our vertices point into our array of points
    points = [
        vec2(-.75, -.45 ), //up pink
        vec2( .75, -.45 ), 
        vec2(0.0,  .85 ),

        vec2(-.75, .45), //down pink
        vec2(.75, .45),
        vec2(0, -.85),

        vec2(-.5, -.3), //up blue
        vec2(.5, -.3),
        vec2(0, .6),

        vec2(-.5, .3), //down blue
        vec2(.5, .3),
        vec2(0, -.6),

        vec2(-.2, -.1), //up yellow (orange)
        vec2(.2, -.1),
        vec2(0, .2),

        vec2(-.13, 0), //top L mini
        vec2(-.065, .1),
        vec2(-.2, .1),

        vec2(.13, 0), //top R mini
        vec2(.065, .1),
        vec2(.2, .1),

        vec2(-.065, -.1), //bottom mini
        vec2(.065, -.1),
        vec2(0, -.2)
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
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    let colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    
    // Load the data into the GPU

    let bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    let aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( aPosition );

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}
