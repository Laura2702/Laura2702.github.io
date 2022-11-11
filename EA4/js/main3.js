//START EA4
// Get the WebGL context.
var canvas = document.getElementById('canvas3');
var gl = canvas.getContext('experimental-webgl');

// Pipeline setup.
gl.clearColor(.95, .95, .95, 1);
// Backface culling.
gl.frontFace(gl.CCW);
gl.enable(gl.CULL_FACE);
gl.cullFace(gl.BACK);
// ...
// ...
// ...
// ...
// ...
// ...

// Compile vertex shader.
var vsSource = '' +
    'attribute vec3 pos;' +
    'attribute vec4 col;' +
    'varying vec4 color;' +
    'void main(){' + 'color = col;' +
    'gl_Position = vec4(pos, 1);' +
    '}';
var vs = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vs, vsSource);
gl.compileShader(vs);

// Compile fragment shader.
fsSouce = 'precision mediump float;' +
    'varying vec4 color;' +
    'void main() {' +
    'gl_FragColor = color;' +
    '}';
var fs = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fs, fsSouce);
gl.compileShader(fs);

// Link shader together into a program.
var prog = gl.createProgram();
gl.attachShader(prog, vs);
gl.attachShader(prog, fs);
gl.bindAttribLocation(prog, 0, "pos");
gl.linkProgram(prog);
gl.useProgram(prog);

// Vertex data.
// Positions, Index data.
var vertices, indicesLines, indicesTris;
// Fill the data arrays.
createVertexData();

// Setup position vertex buffer object.
var vboPos = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vboPos);
gl.bufferData(gl.ARRAY_BUFFER,
    vertices, gl.STATIC_DRAW);
// Bind vertex buffer to attribute variable.
var posAttrib = gl.getAttribLocation(prog, 'pos');
gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT,
    false, 0, 0);
gl.enableVertexAttribArray(posAttrib);

// Setup constant color.
var colAttrib = gl.getAttribLocation(prog, 'col');

// Setup lines index buffer object.
var iboLines = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    indicesLines, gl.STATIC_DRAW);
iboLines.numberOfElements = indicesLines.length;
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

// Setup tris index buffer object.
var iboTris = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    indicesTris, gl.STATIC_DRAW);
iboTris.numberOfElements = indicesTris.length;
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

// Clear framebuffer and render primitives.
gl.clear(gl.COLOR_BUFFER_BIT);

// Setup rendering tris.
gl.vertexAttrib4f(colAttrib, 0.50, 0.52, 0.57, 1);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
gl.drawElements(gl.TRIANGLES,
    iboTris.numberOfElements, gl.UNSIGNED_SHORT, 0);

// Setup rendering lines.
gl.vertexAttrib4f(colAttrib, 0.117, 0.117, 0.117, 1);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
gl.drawElements(gl.LINES,
    iboLines.numberOfElements, gl.UNSIGNED_SHORT, 0);

function createVertexData(){
    //Bowl
    var t = 1;
    const c = 0.1;
    var n = 32;
    var m = 32;

    var u_max = Math.PI, u_min = -Math.PI;
    var v_max = Math.PI, v_min = -Math.PI;
    // Positions.
    vertices = new Float32Array(3 * (n+1) * (m+1));
    // Index data.
    indicesLines = new Uint16Array(2 * 2 * n * m);
    indicesTris  = new Uint16Array(3 * 2 * n * m);

    var du = (u_max - u_min) / n;
    var dv = (v_max - v_min) / m;
    // Counter for entries in index array.
    var iLines = 0;
    var iTris = new Float32Array(4 * (n + 1));

        // Loop angle t.
    for(var i=0, u=0; i <= n; i++, u += du) {
          // Loop radius r.
          for(var j=0, v=0; j <= m; j++, v += dv) {

            var u = u_min + i * du;
            var v = v_min + j * dv;
            var iVertex = i*(m+1) + j;


            var y = ((2 * -v / Math.PI - Math.cos(v))) * c;
            var x = (Math.tanh(u) * (3.8 * Math.tanh(v))) * c;
            var z = ((Math.cos(v) + Math.sin(v) - 1) * (1 + Math.sin(v)) * Math.log(1 - Math.PI * v / 10) + 7.5 * Math.sin(v)) * c;

            // Set vertex positions.
            vertices[iVertex * 3] = x;
            vertices[iVertex * 3 + 1] = y;
            vertices[iVertex * 3 + 2] = z;

            // Set index.
            // Line on beam.
            if(j>0 && i>0){
                indicesLines[iLines++] = iVertex - 1;
                indicesLines[iLines++] = iVertex;
            }
            // Line on ring.
            if(j>0 && i>0){
                indicesLines[iLines++] = iVertex - (m+1);
                indicesLines[iLines++] = iVertex;
            }

            // Set index.
            // Two Triangles.
            if(j>0 && i>0){
                indicesTris[iTris++] = iVertex;
                indicesTris[iTris++] = iVertex - 1;
                indicesTris[iTris++] = iVertex - (m+1);
                //
                indicesTris[iTris++] = iVertex - 1;
                indicesTris[iTris++] = iVertex - (m+1) - 1;
                indicesTris[iTris++] = iVertex - (m+1);
            }
        }
}}
//END EA4
