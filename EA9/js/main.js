//START EA9
const vec3 = glMatrix.vec3;

const camTarget = vec3.fromValues(0, -15, 15);
const camPos = vec3.fromValues(0, 0, 0);

var keys = {};

function toBase64(arr) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
       arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
 }

window.onload = () => {
    {
        var camMovement_X = 0;
        var camMovement_Y = 0;
        var camMovement_Z = 0;

        document.addEventListener('keydown', function (e) {
            keys[e.keyCode] = true;
        });


        document.addEventListener('keyup', function (e) {
            keys[e.keyCode] = false;
        });

        const app = new App(document.getElementById('canvas1'));
        app.background_color = [1.0, 1.0, 1.0, 1.0];

        app.camera.position = vec3.fromValues(0, -15, 15);
        app.camera.target = vec3.fromValues(0, 0, 0);

        app.on_update = (dt, t) => {
            if (keys[37]) camMovement_X -= 0.25;
            if (keys[38]) camMovement_Y += 0.25;
            if (keys[39]) camMovement_X += 0.25;
            if (keys[40]) camMovement_Y -= 0.25;
            if (keys[82]) camMovement_X = 0, camMovement_Y = 0, camMovement_Z = 0;

            var newPos = vec3.clone(camTarget);
            var newTarget = vec3.clone(camPos);
            vec3.add(newPos, newPos, vec3.fromValues(camMovement_X, camMovement_Y, camMovement_Z));
            vec3.add(newTarget, newTarget, vec3.fromValues(camMovement_X, camMovement_Y, camMovement_Z));

        app.camera.position = newPos;
        app.camera.target = newTarget;
        };

        var donut = new Model(VERTEXSHADER, FRAGMENTSHADER);
        app.add_model(donut);
        {
            var torus = torus_createVertexData();
            donut.indices = torus["indicesTriangles"];
            donut.vnormals = torus["normals"];
            donut.vertex_positions = torus["vertices"];
            donut.texture_coords = torus["uv"];
            donut.vcolors = FILL_COLOR(torus["vertices"].length, [1.0, 1.0, 0.0, 1.0]);
            donut.texture_path = "img/donut.png";
        };
        donut.position = vec3.fromValues(8, 0, 0);
        donut.scale = vec3.fromValues(8, 8, 4);

        var perlin_model = new Model(VERTEXSHADER, FRAGMENTSHADER);
        app.add_model(perlin_model);
        {
            var torus = torus_createVertexData();
            perlin_model.indices = torus["indicesTriangles"];
            perlin_model.vnormals = torus["normals"];
            perlin_model.vertex_positions = torus["vertices"];
            perlin_model.texture_coords = torus["uv"];
            perlin_model.vcolors = FILL_COLOR(torus["vertices"].length, [1.0, 1.0, 0.0, 1.0]);

            let helperCanvas = document.getElementById('helper_canvas');
            helperCanvas.width = 128;
            helperCanvas.height = 256;
            let ctx = helperCanvas.getContext("2d");
            let data = ctx.createImageData(128, 256);
            for (let x = 0; x < 128; x++) {
                for (let y = 0; y < 256; y++){
                    let idx = 4*(x+y*128);
                    let v = parseInt(perlin.get(0.1 * x, 0.1 * y)*4096);
                    data.data[idx+0] = v;
                    data.data[idx+1] = v;
                    data.data[idx+2] = v;
                    data.data[idx+3] = 255;
                }
            }
            ctx.putImageData(data, 0, 0);

            console.log(helperCanvas.toDataURL());

            perlin_model.texture_path = helperCanvas.toDataURL();
        };
        perlin_model.position = vec3.fromValues(-8, 0, 0);
        perlin_model.scale = vec3.fromValues(8, 8, 4);

        app.run();
    }
};
//END EA9
