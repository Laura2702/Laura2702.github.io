//START EA3
(function () {
  var canvas = document.getElementById('canvas');
            var gl = canvas.getContext('experimental-webgl');

            // Pipeline setup.
            gl.clearColor(1, 1, 1, 1);
            // Backface culling.
            gl.frontFace(gl.CCW);
            gl.enable(gl.CULL_FACE);
            gl.cullFace(gl.BACK); // or gl.FRONT

            // Compile vertex shader.
            var vsSource = ''+
                'attribute vec3 pos;'+
                'attribute vec4 col;'+
                'varying vec4 color;'+
                'void main(){'+
                    'color = col;'+
                    'gl_Position = vec4(pos*0.25, 4);'+
                '}';
            var vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vsSource);
            gl.compileShader(vs);

            // Compile fragment shader.
            fsSouce = 'precision mediump float;'+
                'varying vec4 color;'+
                'void main() {'+
                    'gl_FragColor = color;'+
                '}';
            var fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fsSouce);
            gl.compileShader(fs);

            // Link shader together into a program.
            var prog = gl.createProgram();
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            gl.useProgram(prog);

            var vertices = new Float32Array([
              0,0,0, //0
              2,1,0, //1
              0,2,0, //2
              4,-1,0, //3
              3,3,0, //4
              6,2,0, //5
              5,5,0, //6
              0,4,0, //7
              2,5,0, //8
              1.5,5.5,0, //9
              -1.5,5.5,0, //10
              -2,5,0, //11
              -3,3,0, //12
              -2,1,0, //13
              -4,-1,0, //14
              -6,2,0, //15
              -5,5,0, //16
              -7,6,0, //17
              -5,7,0, //18
              -7,7,0, //19
              -4.5,10,0, //20
              -9,9,0, //21
              -5,12,0, //22
              -7,13,0, //23
              -9,13,0, //24
              -10,11,0, //25
              -3,8,0, //26
              0,10.5,0, //27
              -1.5,6.5,0, //28
              1.5,6.5,0, //29
              3,8,0, //30
              5,7,0, //31
              4.5,10,0, //32
              7,7,0, //33
              7,6,0, //34
              9,9,0, //35
              5,12,0, //36
              7,13,0, //37
              9,13,0, //38
              10,11,0, //39
              0,5.5,0 //40
            ]);

              // Colors as rgba.
                          var colors = new Float32Array([
                            0,0,0,1, //0
                            0,0,0,1, //1
                            0,0,0,1, //2
                            0.82,0.74,0.54,1, //3
                            0.82,0.74,0.54,1, //4
                            0.74,0.62,0.35,1, //5
                            0.82,0.74,0.54,1, //6
                            0,0,0,1, //7
                            0,0,0,1, //8
                            0,0,0,1, //9
                            0,0,0,1, //10
                            0,0,0,1, //11
                            0.82,0.74,0.54,1, //12
                            0,0,0,1, //13
                            0.82,0.74,0.54,1, //14
                            0.74,0.62,0.35,1, //15
                            0.82,0.74,0.54,1, //16
                            0.74,0.62,0.35,1, //17
                            0,0,0,1, //18
                            0.40,0.26,0.14,0.9, //19
                            0.40,0.26,0.14,0.9, //20
                            0.40,0.26,0.14,0.9, //21
                            0.65,0.51,0.25,1, //22
                            0.74,0.62,0.35,1, //23
                            0.74,0.62,0.35,1, //24
                            0.40,0.26,0.14,0.9, //25
                            0,0,0,1, //26
                            0.74,0.62,0.35,1, //27
                            0,0,0,1, //28
                            0,0,0,1, //29
                            0,0,0,1, //30
                            0,0,0,1, //31
                            0.40,0.26,0.14,0.9, //32
                            0.40,0.26,0.14,0.9, //33
                            0.40,0.26,0.14,0.9, //34
                            0.40,0.26,0.14,0.9, //35
                            0.62,0.51,0.25,1, //36
                            0.74,0.62,0.35,1, //37
                            0.74,0.62,0.35,1, //38
                            0.40,0.26,0.14,0.9, //39
                            0.74,0.62,0.35,1, //40

                                        ]);
              // Index data.
                          var indices = new Uint16Array([
                            0,1,2,
                            1,3,4,
                            1,4,2,
                            2,4,7,
                            7,4,8,
                            8,9,7,
                            9,10,7,
                            10,11,7,
                            11,12,7,
                            7,12,2,
                            12,13,2,
                            12,14,13,
                            13,0,2,
                            14,12,15,
                            15,12,16,
                            16,17,15,
                            16,12,11,
                            16,11,10,
                            16,10,28,
                            16,28,18,
                            16,18,17,
                            18,19,17,
                            18,20,19,
                            19,20,21,
                            21,20,22,
                            21,22,23,
                            21,23,24,
                            21,24,25,
                            20,18,26,
                            20,26,27,
                            26,18,28,
                            26,28,27,
                            28,10,40,
                            40,9,29,
                            40,29,28,
                            29,27,28,
                            29,30,27,
                            30,32,27,
                            30,29,31,
                            30,31,32,
                            32,31,33,
                            31,34,33,
                            32,33,35,
                            35,36,32,
                            35,37,36,
                            35,38,37,
                            35,39,38,
                            31,6,34,
                            31,29,6,
                            6,29,9,
                            6,9,8,
                            6,8,4,
                            6,5,34,
                            6,4,5,
                            5,4,3
                            ]);


                          // Setup position vertex buffer object.
                          var vboPos = gl.createBuffer();
                          gl.bindBuffer(gl.ARRAY_BUFFER, vboPos);
                          gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
                          // Bind vertex buffer to attribute variable.
                          var posAttrib = gl.getAttribLocation(prog, 'pos');
                          gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);
                          gl.enableVertexAttribArray(posAttrib);

                          // Setup color vertex buffer object.
                          var vboCol = gl.createBuffer();
                          gl.bindBuffer(gl.ARRAY_BUFFER, vboCol);
                          gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
                          // Bind vertex buffer to attribute variable.
                          var colAttrib = gl.getAttribLocation(prog, 'col');
                          gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
                          gl.enableVertexAttribArray(colAttrib);

                          // Setup index buffer object.
                          var ibo = gl.createBuffer();
                          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
                          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices,
                              gl.STATIC_DRAW);
                          ibo.numerOfEmements = indices.length;

                          // Clear framebuffer and render primitives.
                          gl.clear(gl.COLOR_BUFFER_BIT);
                          gl.drawElements(gl.TRIANGLES, ibo.numerOfEmements,
                              gl.UNSIGNED_SHORT, 0);
}) ();
//END EA3
