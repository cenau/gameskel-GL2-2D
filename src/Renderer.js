import  * as twgl from 'twgl.js';
import {m4} from 'twgl.js';
import {primitives} from 'twgl.js';
const glslify = require('glslify');
// needed for bug https://github.com/stackgl/glslify/issues/49 - if you try using fixes like glslify babel plugin, then shaders wont live reload!!

class Renderer {
  constructor(gl) {
    this.gl = gl;
    twgl.setDefaults({attribPrefix: "a_"});
    this.programs = [];
    this.programs = this.createPrograms();
    console.log("Renderer:", this.programs.length, "shaders linked");
  this.bufferInfo = primitives.createXYQuadBufferInfo(this.gl);
  }

    createPrograms(){
    const progs = [];
    progs.push({"name" : "test", "progInfo": twgl.createProgramInfo(this.gl, [glslify('../shaders/vert.glsl'), glslify('../shaders/frag.glsl')])});
    return progs;
    } 
    render(thingsToRender) {
      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  
    thingsToRender.forEach((each) => {
    //pixel to clip space 
    let matrix = m4.ortho(0, this.gl.canvas.width, this.gl.canvas.height, 0, -1, 1);
   
      matrix = m4.translate(matrix,[each.position.x,each.position.y,0]) 
      matrix = m4.scale(matrix,[10,10,1]) 
      const uniforms = {
      u_resolution: [this.gl.canvas.width, this.gl.canvas.height],
      u_matrix: matrix
      };
 
    this.gl.useProgram(this.programs[0].progInfo.program);
    twgl.setBuffersAndAttributes(this.gl, this.programs[0].progInfo, this.bufferInfo);
    twgl.setUniforms(this.programs[0].progInfo, uniforms);
    twgl.drawBufferInfo(this.gl, this.bufferInfo);
    
    }) 
    }

}

export default Renderer;


