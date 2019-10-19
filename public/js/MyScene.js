define(["require", "exports", "./ShaderProgram", "gl-matrix"], function (require, exports, ShaderProgram_1, gl_matrix_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MyScene = /** @class */ (function () {
        function MyScene(canvasName) {
            this._shaderProgram = new ShaderProgram_1.default(canvasName);
            var gl = this._shaderProgram.GetGL();
            this.Init();
        }
        MyScene.prototype.Init = function () {
            var _this = this;
            var verticesAndTexCoords = new Float32Array([
                -0.5, 0.5, 0.0, 1.0,
                -0.5, -0.5, 0.0, 0.0,
                0.5, 0.5, 1.0, 1.0,
                0.5, -0.5, 1.0, 0.0
            ]);
            var gl = this._shaderProgram.GetGL();
            var program = this._shaderProgram.GetProgram();
            if (program === null)
                return;
            var vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, verticesAndTexCoords, gl.STATIC_DRAW);
            var FSIZE = verticesAndTexCoords.BYTES_PER_ELEMENT;
            var a_Position = gl.getAttribLocation(program, "a_Position");
            gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 4 * FSIZE, 0);
            gl.enableVertexAttribArray(a_Position);
            var a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
            gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, 4 * FSIZE, 2 * FSIZE);
            gl.enableVertexAttribArray(a_TexCoord);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            var image = new Image();
            image.onload = function () { _this.OnImageLoaded(image); };
            image.crossOrigin = "";
            image.src = "https://dl.dropboxusercontent.com/s/nxvziah1a7n9txd/256px-WebGL_Logo.svg.png";
        };
        MyScene.prototype.OnImageLoaded = function (image) {
            var gl = this._shaderProgram.GetGL();
            var program = this._shaderProgram.GetProgram();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.activeTexture(gl.TEXTURE0);
            var texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            var u_Sampler = gl.getUniformLocation(program, "u_Sampler");
            gl.uniform1i(u_Sampler, 0);
            var modelMatrix = gl_matrix_1.mat4.create();
            gl_matrix_1.mat4.translate(modelMatrix, modelMatrix, gl_matrix_1.vec3.fromValues(0, 0.5, 0));
            gl_matrix_1.mat4.rotateZ(modelMatrix, modelMatrix, 20.0 * Math.PI / 180.0);
            gl_matrix_1.mat4.scale(modelMatrix, modelMatrix, gl_matrix_1.vec3.fromValues(1 * 2.0, 1, 1));
            var u_ModelMatrix = gl.getUniformLocation(program, "u_ModelMatrix");
            gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix);
            gl.clearColor(0.898, 0.984, 0.905, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };
        return MyScene;
    }());
    exports.default = MyScene;
});
//# sourceMappingURL=MyScene.js.map