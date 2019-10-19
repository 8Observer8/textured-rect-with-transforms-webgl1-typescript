
export default class ShaderProgram
{
    private _gl: WebGLRenderingContext = null;
    private _program: WebGLProgram = null;
 
    private _vertexShaderSource =
    ` 
    attribute vec2 a_Position;
    attribute vec2 a_TexCoord;
    uniform mat4 u_ModelMatrix;
    varying vec2 v_TexCoord;
 
    void main()
    {
        gl_Position = u_ModelMatrix * vec4(a_Position, 0.0, 1.0);
        v_TexCoord = a_TexCoord;
    }`;
 
    private _fragmentShaderSource =
    ` 
    precision mediump float;

    uniform sampler2D u_Sampler;
    varying vec2 v_TexCoord;
 
    void main()
    {
        gl_FragColor = texture2D(u_Sampler, v_TexCoord);
    }`;
 
    public constructor(canvasName: string)
    {
        let canvas = document.getElementById(canvasName) as HTMLCanvasElement;
        this._gl = canvas.getContext("webgl") as WebGLRenderingContext;
 
        let gl = this._gl;
 
        let vShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vShader, this._vertexShaderSource);
        gl.compileShader(vShader);
        if (this.ShowErrorMessage(vShader)) return;
 
        let fShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fShader, this._fragmentShaderSource);
        gl.compileShader(fShader);
        if (this.ShowErrorMessage(fShader)) return;
 
        this._program = gl.createProgram();
        gl.attachShader(this._program, vShader);
        gl.attachShader(this._program, fShader);
        gl.linkProgram(this._program);
        gl.useProgram(this._program);
    }
 
    public GetGL(): WebGLRenderingContext
    {
        return this._gl;
    }
 
    public GetProgram(): WebGLProgram
    {
        return this._program;
    }

    private ShowErrorMessage(shader: WebGLShader): boolean
    {
        let ok = this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS) as boolean;
        if (!ok)
        {
            console.log(this._gl.getShaderInfoLog(shader));
        }
        return false;
    }
}