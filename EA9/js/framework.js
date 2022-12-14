//START EA9
class Model {
    constructor(vs_src, fs_src) {
        this._vs_src = vs_src;
        this._fs_src = fs_src;
        this._position = glMatrix.vec3.create();
        this._rotation = glMatrix.vec3.create();
        this._scale = glMatrix.vec3.fromValues(1.0, 1.0, 1.0);

        this._model_matrix = glMatrix.mat4.create();
        this._render_mode = "TRIANGLES";
        this.on_update = (dt, t) => { };
    }

    set position(vec3) {
        this._position = vec3;
    }

    set rotation(vec3_deg) {
        this._rotation = vec3_deg;
    }

    set scale(vec3) {
        this._scale = vec3;
    }

    set indices(data) {
        // Set indicies
        this._GL_CONTEXT.bindBuffer(this._GL_CONTEXT.ELEMENT_ARRAY_BUFFER, this._ibo);
        this._GL_CONTEXT.bufferData(this._GL_CONTEXT.ELEMENT_ARRAY_BUFFER, data, this._GL_CONTEXT.STATIC_DRAW);
        this._ibo.numberOfElements = data.length;
    }

    set vertex_positions(data) {
        this._GL_CONTEXT.bindBuffer(this._GL_CONTEXT.ARRAY_BUFFER, this._vbo_pos);
        this._GL_CONTEXT.bufferData(this._GL_CONTEXT.ARRAY_BUFFER, data, this._GL_CONTEXT.STATIC_DRAW);
        this._GL_CONTEXT.vertexAttribPointer(this._coord_attr, 3, this._GL_CONTEXT.FLOAT, false, 0, 0);
    }

    set vcolors(data) {
        this._GL_CONTEXT.bindBuffer(this._GL_CONTEXT.ARRAY_BUFFER, this._vbo_col);
        this._GL_CONTEXT.bufferData(this._GL_CONTEXT.ARRAY_BUFFER, data, this._GL_CONTEXT.STATIC_DRAW);
        this._GL_CONTEXT.vertexAttribPointer(this._color_attr, 4, this._GL_CONTEXT.FLOAT, false, 0, 0);
    }

    set vnormals(data) {
        this._GL_CONTEXT.bindBuffer(this._GL_CONTEXT.ARRAY_BUFFER, this._vbo_norm);
        this._GL_CONTEXT.bufferData(this._GL_CONTEXT.ARRAY_BUFFER, data, this._GL_CONTEXT.STATIC_DRAW);
        this._GL_CONTEXT.vertexAttribPointer(this._color_attr, 3, this._GL_CONTEXT.FLOAT, false, 0, 0);
    }

    set texture_coords(data) {
        this._GL_CONTEXT.bindBuffer(this._GL_CONTEXT.ARRAY_BUFFER, this._vbo_tc);
        this._GL_CONTEXT.bufferData(this._GL_CONTEXT.ARRAY_BUFFER, data, this._GL_CONTEXT.STATIC_DRAW);
        this._GL_CONTEXT.vertexAttribPointer(this._texturecoord_attr, 2, this._GL_CONTEXT.FLOAT, false, 0, 0);
    }

    set texture_path(path) {
        this._texture.image = new Image();

        var self = this;
        this._texture.image.onload = function() {
            self._on_texture_set();
        };
        this._texture.image.src = path;
    }

    set texture(data) {
        this._texture.image = new Image();

        var self = this;
        this._texture.image.onload = function() {
            self._on_texture_set();
        };
        this._texture.image.image = data;
    }

    _on_texture_set() {
        this._texture.loaded = true;

        this._GL_CONTEXT.bindTexture(this._GL_CONTEXT.TEXTURE_2D, this._texture);
        this._GL_CONTEXT.texImage2D(
            this._GL_CONTEXT.TEXTURE_2D, 0, this._GL_CONTEXT.RGBA,
            this._GL_CONTEXT.RGBA, this._GL_CONTEXT.UNSIGNED_BYTE, this._texture.image);

        this._GL_CONTEXT.texParameteri(this._GL_CONTEXT.TEXTURE_2D, this._GL_CONTEXT.TEXTURE_MIN_FILTER, this._GL_CONTEXT.NEAREST);
        this._GL_CONTEXT.texParameteri(this._GL_CONTEXT.TEXTURE_2D, this._GL_CONTEXT.TEXTURE_MAG_FILTER, this._GL_CONTEXT.NEAREST);
        this._GL_CONTEXT.generateMipmap(this._GL_CONTEXT.TEXTURE_2D);

        this._GL_CONTEXT.bindTexture(this._GL_CONTEXT.TEXTURE_2D, null);
    }

    set render_mode(mode) {
        this._render_mode = mode;
    }

    init_context(context) {
        this._GL_CONTEXT = context;

        this._vbo_pos = this._GL_CONTEXT.createBuffer();
        this._vbo_norm = this._GL_CONTEXT.createBuffer();
        this._vbo_col = this._GL_CONTEXT.createBuffer();
        this._vbo_tc = this._GL_CONTEXT.createBuffer();
        this._ibo = this._GL_CONTEXT.createBuffer();

        this._texture = this._GL_CONTEXT.createTexture();
        this._texture.loaded = false;

        this._init_shaders();
    }

    _init_shaders() {
        this._vertex_shader = this._GL_CONTEXT.createShader(this._GL_CONTEXT.VERTEX_SHADER);
        this._GL_CONTEXT.shaderSource(this._vertex_shader, this._vs_src);
        this._GL_CONTEXT.compileShader(this._vertex_shader);

        this._fragment_shader = this._GL_CONTEXT.createShader(this._GL_CONTEXT.FRAGMENT_SHADER);
        this._GL_CONTEXT.shaderSource(this._fragment_shader, this._fs_src);
        this._GL_CONTEXT.compileShader(this._fragment_shader);

        this._shader_program = this._GL_CONTEXT.createProgram();
        this._GL_CONTEXT.attachShader(this._shader_program, this._vertex_shader);
        this._GL_CONTEXT.attachShader(this._shader_program, this._fragment_shader);
        this._GL_CONTEXT.linkProgram(this._shader_program);

        this._coord_attr = this._GL_CONTEXT.getAttribLocation(this._shader_program, "coordinates");
        this._norm_attr = this._GL_CONTEXT.getAttribLocation(this._shader_program, "normals");
        this._color_attr = this._GL_CONTEXT.getAttribLocation(this._shader_program, "color");
        this._texturecoord_attr = this._GL_CONTEXT.getAttribLocation(this._shader_program, "texturecoord");

        this._texture_attr = this._GL_CONTEXT.getUniformLocation(this._shader_program, "uTexture");

        this._projmatrix_attr = this._GL_CONTEXT.getUniformLocation(this._shader_program, "projmatrix");
        this._viewmatrix_attr = this._GL_CONTEXT.getUniformLocation(this._shader_program, "viewmatrix");
        this._modelmatrix_attr = this._GL_CONTEXT.getUniformLocation(this._shader_program, "modelmatrix");
    }

    render(projection_matrix, view_matrix) {
        this._GL_CONTEXT.useProgram(this._shader_program);

        this._GL_CONTEXT.bindBuffer(this._GL_CONTEXT.ARRAY_BUFFER, this._vbo_pos);
        this._GL_CONTEXT.vertexAttribPointer(this._coord_attr, 3, this._GL_CONTEXT.FLOAT, false, 0, 0);
        this._GL_CONTEXT.enableVertexAttribArray(this._coord_attr);

        this._GL_CONTEXT.bindBuffer(this._GL_CONTEXT.ARRAY_BUFFER, this._vbo_norm);
        this._GL_CONTEXT.vertexAttribPointer(this._norm_attr, 3, this._GL_CONTEXT.FLOAT, false, 0, 0);
        this._GL_CONTEXT.enableVertexAttribArray(this._norm_attr);

        this._GL_CONTEXT.bindBuffer(this._GL_CONTEXT.ARRAY_BUFFER, this._vbo_col);
        this._GL_CONTEXT.vertexAttribPointer(this._color_attr, 4, this._GL_CONTEXT.FLOAT, false, 0, 0);
        this._GL_CONTEXT.enableVertexAttribArray(this._color_attr);

        this._GL_CONTEXT.bindBuffer(this._GL_CONTEXT.ARRAY_BUFFER, this._vbo_tc);
        this._GL_CONTEXT.vertexAttribPointer(this._texturecoord_attr, 2, this._GL_CONTEXT.FLOAT, false, 0, 0);
        this._GL_CONTEXT.enableVertexAttribArray(this._texturecoord_attr);

        if (this._texture.loaded) {
            this._GL_CONTEXT.activeTexture(this._GL_CONTEXT.TEXTURE0);
            this._GL_CONTEXT.bindTexture(this._GL_CONTEXT.TEXTURE_2D, this._texture);
            this._GL_CONTEXT.uniform1i(this._texture_attr, 0);
        } else {
            this._GL_CONTEXT.bindTexture(this._GL_CONTEXT.TEXTURE_2D, null);
        }

        this._GL_CONTEXT.uniformMatrix4fv(this._projmatrix_attr, false, projection_matrix);
        this._GL_CONTEXT.uniformMatrix4fv(this._viewmatrix_attr, false, view_matrix);
        this._GL_CONTEXT.uniformMatrix4fv(this._modelmatrix_attr, false, this._model_matrix);

        this._GL_CONTEXT.bindBuffer(this._GL_CONTEXT.ELEMENT_ARRAY_BUFFER, this._ibo);

        if (this._render_mode == "LINES")
            this._GL_CONTEXT.drawElements(this._GL_CONTEXT.LINES, this._ibo.numberOfElements, this._GL_CONTEXT.UNSIGNED_SHORT, 0);
        if (this._render_mode == "TRIANGLES")
            this._GL_CONTEXT.drawElements(this._GL_CONTEXT.TRIANGLES, this._ibo.numberOfElements, this._GL_CONTEXT.UNSIGNED_SHORT, 0);
    }

    update(dt, t) {

        var quat = glMatrix.quat.create();
        glMatrix.quat.fromEuler(quat, this._rotation[0], this._rotation[1], this._rotation[2]);
        this._model_matrix = glMatrix.mat4.fromRotationTranslationScale(this._model_matrix, quat, this._position, this._scale);

        this.on_update(dt, t);
    }
};

class Camera {
    constructor() {
        this._angle = 90;
        this._ratio = 1;
        this._zmin = 0.1;
        this._zmax = 500;

        this._position = glMatrix.vec3.create();
        this._target = glMatrix.vec3.create();

        this._projection_matrix = glMatrix.mat4.create();
        this._view_matrix = glMatrix.mat4.create();
    }

    set position(vec3) {
        this._position = vec3;
    }

    set target(vec3) {
        this._target = vec3;
    }

    set angle(angle_) {
        this._angle = angle_;
    }

    set ratio(ratio_) {
        this._ratio = ratio_;
    }

    set zmin(zmin_) {
        this._zmin = zmin_;
    }

    set zmax(zmax_) {
        this._zmax = zmax_;
    }

    get projection_matrix() { return this._projection_matrix; }
    get view_matrix() { return this._view_matrix; }

    update() {

        // Perspective
        glMatrix.mat4.perspective(this._projection_matrix, this._angle * Math.PI / 180, this._ratio, this._zmin, this._zmax);

        // View
        this._view_matrix = glMatrix.mat4.create();
        glMatrix.mat4.lookAt(this._view_matrix, this._position, this._target, glMatrix.vec3.fromValues(0, 0, 1));
    }
};

class App {
    constructor(canvas) {
        this._CANVAS = canvas;
        this._models = [];
        this._last_timestamp = 0;
        this._background_color = [0.0, 0.0, 0.0, 1.0];

        this.on_update = (dt, t) => { };

        this._camera = new Camera();

        this._init_canvas();
        this._init_gl();
    }

    get camera() { return this._camera; }

    _init_canvas() {
        this._CANVAS.width = 800; // set the canvas resolution
        this._CANVAS.height = 800;
        this._CANVAS.style.width = "800px"; // set the display size.
        this._CANVAS.style.height = "800px";
    }

    _init_gl() {
        this._GL_CONTEXT = this._CANVAS.getContext('experimental-webgl');
        this._GL_CONTEXT.disable(this._GL_CONTEXT.CULL_FACE);
        this._GL_CONTEXT.enable(this._GL_CONTEXT.DEPTH_TEST);
        this._GL_CONTEXT.depthFunc(this._GL_CONTEXT.LESS);
    }

    set background_color(data) { this._background_color = data; }

    add_model(model) {
        model.init_context(this._GL_CONTEXT);
        this._models.push(model);
    }

    render(dt, t) {
        // Clear
        this._GL_CONTEXT.clearColor(this._background_color[0], this._background_color[1], this._background_color[2], this._background_color[3]);
        this._GL_CONTEXT.clear(this._GL_CONTEXT.COLOR_BUFFER_BIT | this._GL_CONTEXT.DEPTH_BUFFER_BIT);
        this._GL_CONTEXT.viewport(0, 0, this._CANVAS.width, this._CANVAS.height);

        var camera = this.camera;
        this._models.forEach(model => model.render(camera.projection_matrix, camera.view_matrix))
    }

    update(dt, t) {
        this._camera.update();
        this.on_update(dt, t);
        this._models.forEach(model => model.update(dt, t))
    }


    _loop(timestamp) {
        var dt = (timestamp - this._last_timestamp) / 1000; // In seconds
        this._last_timestamp = timestamp;
        this.update(dt, timestamp / 1000);
        this.render(dt, timestamp / 1000);
        window.requestAnimationFrame(this._loop.bind(this));
    }

    run() {
        window.requestAnimationFrame(this._loop.bind(this));
    }
}
//END EA9
