define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ShaderProgram = /** @class */ (function () {
        function ShaderProgram(canvasName) {
            this._gl = null;
            this._program = null;
            this._vertexShaderSource = " \n    attribute vec2 a_Position;\n    attribute vec2 a_TexCoord;\n    uniform mat4 u_ModelMatrix;\n    varying vec2 v_TexCoord;\n \n    void main()\n    {\n        gl_Position = u_ModelMatrix * vec4(a_Position, 0.0, 1.0);\n        v_TexCoord = a_TexCoord;\n    }";
            this._fragmentShaderSource = " \n    precision mediump float;\n\n    uniform sampler2D u_Sampler;\n    varying vec2 v_TexCoord;\n \n    void main()\n    {\n        gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n    }";
            var canvas = document.getElementById(canvasName);
            this._gl = canvas.getContext("webgl");
            var gl = this._gl;
            var vShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vShader, this._vertexShaderSource);
            gl.compileShader(vShader);
            if (this.ShowErrorMessage(vShader))
                return;
            var fShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fShader, this._fragmentShaderSource);
            gl.compileShader(fShader);
            if (this.ShowErrorMessage(fShader))
                return;
            this._program = gl.createProgram();
            gl.attachShader(this._program, vShader);
            gl.attachShader(this._program, fShader);
            gl.linkProgram(this._program);
            gl.useProgram(this._program);
        }
        ShaderProgram.prototype.GetGL = function () {
            return this._gl;
        };
        ShaderProgram.prototype.GetProgram = function () {
            return this._program;
        };
        ShaderProgram.prototype.ShowErrorMessage = function (shader) {
            var ok = this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS);
            if (!ok) {
                console.log(this._gl.getShaderInfoLog(shader));
            }
            return false;
        };
        return ShaderProgram;
    }());
    exports.default = ShaderProgram;
});
//# sourceMappingURL=ShaderProgram.js.map