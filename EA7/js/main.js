//START EA7
const vec3 = glMatrix.vec3;

const camTarget = vec3.fromValues(0, 0, 0);
const camPos = vec3.fromValues(0, -10, 8);

var keys = {};

window.onload = () => {
    {
        var camMovementX = 0;
        var camMovementY = 0;
        var camMovementZ = 0;

        document.addEventListener('keydown', function (e) {
            keys[e.keyCode] = true;
        });


        document.addEventListener('keyup', function (e) {
            keys[e.keyCode] = false;
        });

        const app = new App(document.getElementById('canvas'));
        app.background_color = [1.0, 1.0, 1.0, 1.0];

        app.camera.translate = vec3.fromValues(0, -10, 10);
        app.camera.target = vec3.fromValues(0, 0, 0);

        app.on_update = (dt, t) => {
            if (keys[37]) camMovementX -= 0.25;
            if (keys[38]) camMovementY += 0.25;
            if (keys[39]) camMovementX += 0.25;
            if (keys[40]) camMovementY -= 0.25;
            if (keys[85]) camMovementZ += 0.25;
            if (keys[73]) camMovementZ -= 0.25;
            if (keys[82]) camMovementX = 0, camMovementY = 0, camMovementZ = 0;

            var newTarget = vec3.clone(camTarget);
            var newPos = vec3.clone(camPos);
            vec3.add(newPos, newPos, vec3.fromValues(camMovementX, camMovementY, camMovementZ));
            vec3.add(newTarget, newTarget, vec3.fromValues(camMovementX, camMovementY, camMovementZ));

        app.camera.translate = newPos;
        app.camera.target = newTarget;
        };

        var sphere1 = new Model(VERTEXSHADER, FRAGMENTSHADER);
        app.add_model(sphere1);

        {
            var sphere_data = sphere_createVertexData();
            sphere1.indices = sphere_data["indicesTriangles"];
            sphere1.vnormals = sphere_data["normals"];
            sphere1.vpositions = sphere_data["vertices"];
            sphere1.vcolors = FILL_COLOR(sphere_data["vertices"].length, [1.0, 0.0, 0.0, 1.0]);
        };
        sphere1.translate = vec3.fromValues(-8, 5, 0);
        sphere1.scale = vec3.fromValues(6, 6, 6);

        var sphere2 = new Model(VERTEXSHADER, FRAGMENTSHADER);
        app.add_model(sphere2);

        {
            var sphere_data = sphere_createVertexData();
            sphere2.indices = sphere_data["indicesTriangles"];
            sphere2.vnormals = sphere_data["normals"];
            sphere2.vpositions = sphere_data["vertices"];
            sphere2.vcolors = FILL_COLOR(sphere_data["vertices"].length, [1.0, 0.0, 1.0, 1.0]);
        };
        sphere2.translate = vec3.fromValues(8, 5, 0);
        sphere2.scale = vec3.fromValues(6, 6, 6);

        var sphere3 = new Model(VERTEXSHADER, FRAGMENTSHADER);
        app.add_model(sphere3);

        {
            var sphere_data = sphere_createVertexData();
            sphere3.indices = sphere_data["indicesTriangles"];
            sphere3.vnormals = sphere_data["normals"];
            sphere3.vpositions = sphere_data["vertices"];
            sphere3.vcolors = FILL_COLOR(sphere_data["vertices"].length, [1.0, 0.0, 1.0, 1.0]);
        };
        sphere3.translate = vec3.fromValues(0, -7, -2);
        sphere3.scale = vec3.fromValues(4, 4, 4);

        var torus = new Model(VERTEXSHADER, FRAGMENTSHADER);
        app.add_model(torus);

        {
            var torus_data = torus_createVertexData();
            torus.indices = torus_data["indicesTriangles"];
            torus.vnormals = torus_data["normals"];
            torus.vpositions = torus_data["vertices"];
            torus.vcolors = FILL_COLOR(torus_data["vertices"].length, [1.0, 1.0, 0.0, 1.0]);
        };
        torus.translate = vec3.fromValues(0, 0, -3);
        torus.scale = vec3.fromValues(15, 15, 5);

        app.run();
    }
};
//END EA7
