//START Aufgabe EA2
//Linienstärke hat in meinem Browser leider nicht funktioniert.
//Ich habe versucht, aus Linien einen Hund zu erstellen. Mit etwas Fantasie ist dieser erkennbar, denke ich. :)
(function () {
  var canvas = document.getElementById('canvas');
  var gl = canvas.getContext('experimental-webgl');


   gl.clearColor(0, 0, 0, 1);

  var vsSource = 'attribute vec2 pos;'+
              'void main(){ gl_Position = vec4(pos*0.25, 0, 4); }';
            var vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vsSource);
            gl.compileShader(vs);

            fsSouce =  'void main() { gl_FragColor = vec4(1,0.64,0,1); }';
            var fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fsSouce);
            gl.compileShader(fs);

            var prog = gl.createProgram();
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            gl.useProgram(prog);

            var vertices = new Float32Array([
              0,0,
              2,1,
              4,-1,
              6,2,
              5,5,
              1.5,6.5,
              -1.5,6.5,
              -5,5,
              -6,2,
              -7,6,
              -5,7,
              0,10.5,
              5,7,
              7,6,
              6,2,
              7,6,
              7,7,
              9,9,
              10,11,
              9,13,
              7,13,
              5,12,
              4.5,10,
              7,7,
              9,9,
              5,12,
              7,13,
              9,9,
              4.5,10,
              0,10.5,
              -4.5,10,
              -7,7,
              -9,9,
              -5,12,
              -7,13,
              -9,9,
              -4.5,10,
              -5,12,
              -7,13,
              -9,13,
              -10,11,
              -9,9,
              -7,7,
              -7,6,
              -6,2,
              -4,-1,
              -2,1,
              0,2,
              2,1,
              0,2,
              0,4,
              2,5,
              1.5,5.5,
              -1.5,5.5,
              -2,5,
              0,4,
              2,5,
              3,3,
              4,-1,
              3,3,
              5,5,
              5,7,
              4.5,10,
              1.5,6.5,
              -1.5,6.5,
              -4.5,10,
              -5,7,
              -5,5,
              -3,3,
              -2,5,
              -3,3,
              -4,-1,
              -2,1,
              0,0
                ]);
            var vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            var posAttrib = gl.getAttribLocation(prog, 'pos');
            gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(posAttrib);

            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.LINE_STRIP, 0, 73);
}) ();
//ENDE Aufgabe EA2
