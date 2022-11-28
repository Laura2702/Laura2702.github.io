
//START EA6
const vec3 = glMatrix.vec3;

window.onload = () => {
    {

        var current_pos = 0;
        var animation = true;

        document.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'k':
                    animation = !animation;
                    break;
            }
        });

        const app = new App(document.getElementById('canvas'));
        app.background_color = [1.0, 1.0, 1.0, 1.0];

        app.camera.translate = vec3.fromValues(0, -100, 0);
        app.camera.target = vec3.fromValues(0, 0, 0);

        app.on_update = (dt, t) => {
            if (animation) {
                current_pos += dt;
            }

                        sphere1.translate = glMatrix.vec3.fromValues(0, Math.cos(current_pos) * 10, Math.sin(current_pos) * -10 - 10);
            sphere2.translate = glMatrix.vec3.fromValues(Math.sin(current_pos) * 10, Math.cos(current_pos) * 10 + 10, Math.sin(current_pos) * 10);
            sphere3.translate = glMatrix.vec3.fromValues(Math.cos(current_pos) * -10, Math.sin(current_pos) * 10 + 10, Math.cos(current_pos) * 10);
            sphere4.translate = glMatrix.vec3.fromValues(0, Math.sin(current_pos) * 10, Math.cos(current_pos) * 10 + 10);

            torus.rotation = vec3.fromValues(90, 0, -100*current_pos % 360 + 45);
        };

        var sphere1 = new Model(VERTEXSHADER, FRAGMENTSHADER);
        app.add_model(sphere1);

        {
          //blau
            var sphereData = sphere_createVertexData();
            sphere1.indices = sphereData["indicesTriangles"];
            sphere1.vnormals = sphereData["normals"];
            sphere1.vpositions = sphereData["vertices"];
            sphere1.vcolors = FILL_COLOR(sphereData["vertices"].length, [0.0, 0.0, 1.0, 1.0]);
        };
        sphere1.translate = vec3.fromValues(0, 2, 0);
        sphere1.scale = vec3.fromValues(1.5, 1.5, 1.5);

        var sphere2 = new Model(VERTEXSHADER, FRAGMENTSHADER);
        app.add_model(sphere2);

        {
          //pink
            var sphereData = sphere_createVertexData();
            sphere2.indices = sphereData["indicesTriangles"];
            sphere2.vnormals = sphereData["normals"];
            sphere2.vpositions = sphereData["vertices"];
            sphere2.vcolors = FILL_COLOR(sphereData["vertices"].length, [1.0, 0.0, 1.0, 1.0]);
        };
        sphere2.translate = vec3.fromValues(0, -3, 0);
        sphere2.scale = vec3.fromValues(1.5, 1.5, 1.5);

        var sphere3 = new Model(VERTEXSHADER, FRAGMENTSHADER);
        app.add_model(sphere3);

        {
          //gelb
            var sphereData = sphere_createVertexData();
            sphere3.indices = sphereData["indicesTriangles"];
            sphere3.vnormals = sphereData["normals"];
            sphere3.vpositions = sphereData["vertices"];
            sphere3.vcolors = FILL_COLOR(sphereData["vertices"].length, [1.0, 1.0, 0.0, 1.0]);
        };
        sphere3.translate = vec3.fromValues(0, 0, 3);
        sphere3.scale = vec3.fromValues(1.5, 1.5, 1.5);

        var sphere4 = new Model(VERTEXSHADER, FRAGMENTSHADER);
        app.add_model(sphere4);

        {
          //türkis
            var sphereData = sphere_createVertexData();
            sphere4.indices = sphereData["indicesTriangles"];
            sphere4.vnormals = sphereData["normals"];
            sphere4.vpositions = sphereData["vertices"];
            sphere4.vcolors = FILL_COLOR(sphereData["vertices"].length, [0.0, 1.0, 1.0, 1.0]);
        };
        sphere4.translate = vec3.fromValues(0, 0, -3);
        sphere4.scale = vec3.fromValues(1.5, 1.5, 1.5);


        var torus = new Model(VERTEXSHADER, FRAGMENTSHADER);
        app.add_model(torus);

        {
            var torusData = torus_createVertexData();
            torus.indices = torusData["indicesTriangles"];
            torus.vnormals = torusData["normals"];
            torus.vpositions = torusData["vertices"];
            torus.vcolors = FILL_COLOR(torusData["vertices"].length, [1.0, 1.0, 1.0, 1.0]);
        };
        torus.translate = vec3.fromValues(0, 0, 0);
        torus.scale = vec3.fromValues(10, 10, 3);

        app.run();
    }
};
//END EA6
