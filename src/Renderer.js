import  * as twgl from 'twgl.js';
const glslify = require('glslify');
// needed for bug https://github.com/stackgl/glslify/issues/49 - if you try using fixes like glslify babel plugin, then shaders wont live reload!!

class Renderer {
  constructor(gl) {
    this.gl = gl;
    twgl.setDefaults({attribPrefix: "a_"});
    this.programs = [];
    this.programs = this.createPrograms();
    console.log("Renderer:", this.programs.length, "shaders linked");
  const arrays = {
    position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
  };
    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays);
  }

    createPrograms(){
    const progs = [];
    progs.push({"name" : "test", "progInfo": twgl.createProgramInfo(this.gl, [glslify('../shaders/vert.glsl'), glslify('../shaders/frag.glsl')])});
    return progs;
    } 
    render() {
      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    
    const uniforms = {
      resolution: [this.gl.canvas.width, this.gl.canvas.height],
    };
 
    this.gl.useProgram(this.programs[0].progInfo.program);
    twgl.setBuffersAndAttributes(this.gl, this.programs[0].progInfo, this.bufferInfo);
    twgl.setUniforms(this.programs[0].progInfo, uniforms);
    twgl.drawBufferInfo(this.gl, this.bufferInfo);
    
    } 
   

}

export default Renderer;


