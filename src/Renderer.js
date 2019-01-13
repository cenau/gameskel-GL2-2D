import  * as twgl from 'twgl.js';
import {m4} from 'twgl.js';
import {primitives} from 'twgl.js';
import dat from 'dat.gui'
const glslify = require('glslify');
// needed for bug https://github.com/stackgl/glslify/issues/49 - if you try using fixes like glslify babel plugin, then shaders wont live reload!!

class Renderer {
  constructor(gl) {
    this.gui = new dat.GUI()
    document.getElementsByClassName('dg')[0].style.zIndex = 1;
    //make sure datgui goes on top
    
      this.backgroundUniforms = {
        u_worldPos : [0,0],
        u_worldRotation : 0,
        u_worldAdjust : 0.001,
        u_worldOffset : 0,
        u_lacunarity : 1.7,
        u_gain: 3.5,
        u_alpha: 1,
        u_fbmx: 0,
        u_fbmy: 0,
      };
      this.cloudUniforms = {
        u_worldPos : [0,0],
        u_worldRotation : 0,
        u_worldAdjust : 0.01,
        u_worldOffset : 100,
        u_lacunarity : 2.0,
        u_gain: 0.1,
        u_alpha: 0.15,
        u_fbmx: 0,
        u_fbmy: 0
      };
    var terrainGui = this.gui.addFolder("Terrain")
terrainGui.add(this.backgroundUniforms, 'u_lacunarity', -5, 5)
    .name('lacunarity');
terrainGui.add(this.backgroundUniforms, 'u_gain', -5, 5)
    .name('gain');

    this.gl = gl;


    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    twgl.setDefaults({attribPrefix: "a_"});
    this.programs = {};
    this.programs = this.createPrograms();
    this.bufferInfo = primitives.createXYQuadBufferInfo(this.gl) //unit quad
    //this.bufferInfo = primitives.createXYQuadBufferInfo(this.gl,1,0,0.5) //unit quad
    this.cameraPosition = {"x":0,"y":0};
    this.cameraRotation = 0;
    this.textures = twgl.createTextures(gl, 
      
      {
        ship: { src: "../assets/ship1.png", mag: gl.NEAREST },
        missing: { src: "../assets/missing.png", mag: gl.NEAREST },
        pad: { src: "../assets/pad.png", mag: gl.NEAREST },
        enemy: { src: "../assets/enemy.png", mag: gl.NEAREST }
        
      
      
      })
  }

    createPrograms(){
    const progs = {
      test : {"progInfo": twgl.createProgramInfo(this.gl, [glslify('../shaders/vert.glsl'), glslify('../shaders/frag.glsl')])},
      waymarker : {"progInfo": twgl.createProgramInfo(this.gl, [glslify('../shaders/vert.glsl'), glslify('../shaders/waymarker_frag.glsl')])},
      scanwedge : {"progInfo": twgl.createProgramInfo(this.gl, [glslify('../shaders/sprite_vert.glsl'), glslify('../shaders/scanwedge_frag.glsl')])},
      sprite : {"progInfo": twgl.createProgramInfo(this.gl, [glslify('../shaders/sprite_vert.glsl'), glslify('../shaders/sprite_frag.glsl')])},
      background : {"progInfo": twgl.createProgramInfo(this.gl, [glslify('../shaders/fullscreen_vert.glsl'), glslify('../shaders/background_frag.glsl')])},
      exploding : {"progInfo": twgl.createProgramInfo(this.gl, [glslify('../shaders/exploding_sprite_vert.glsl'), glslify('../shaders/exploding_sprite_frag.glsl')])}
     }
    return progs;
    } 
    render(time,thingsToRender) {

      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
 
    let prog = this.programs.background;

      let uniforms = this.backgroundUniforms;
      
      uniforms.u_worldPos = [this.cameraPosition.x,this.cameraPosition.y],
      uniforms.u_worldRotation = this.cameraRotation,
    
        this.gl.useProgram(prog.progInfo.program);
    twgl.setBuffersAndAttributes(this.gl, prog.progInfo, this.bufferInfo);
    twgl.setUniforms(prog.progInfo, uniforms);
    twgl.drawBufferInfo(this.gl, this.bufferInfo, this.gl.TRIANGLES);

      uniforms = this.cloudUniforms;
        this.cloudUniforms.u_worldPos = [this.cameraPosition.x + time * 0.05,this.cameraPosition.y + time * 0.1 ]
        this.cloudUniforms.u_worldRotation = this.cameraRotation
        this.cloudUniforms.u_fbmx = Math.sin(time * 0.0005)
        this.cloudUniforms.u_fbmy = Math.sin(time * 0.0005) 
    this.gl.useProgram(prog.progInfo.program);
    twgl.setBuffersAndAttributes(this.gl, prog.progInfo, this.bufferInfo);
    twgl.setUniforms(prog.progInfo, uniforms);
    twgl.drawBufferInfo(this.gl, this.bufferInfo, this.gl.TRIANGLES);
      
    thingsToRender.forEach((each) => {
    //pixel to clip space 
    let matrix = m4.ortho(0, this.gl.canvas.width, this.gl.canvas.height, 0, -1, 1);
    let cameraMatrix = m4.identity();
    const camTranslationCentre = [-this.gl.canvas.width/2 ,-this.gl.canvas.height/2,0]
    const camTranslationTarget = [this.cameraPosition.x ,this.cameraPosition.y,0]
      cameraMatrix = m4.translate(cameraMatrix,camTranslationTarget)
      cameraMatrix = m4.rotateZ(cameraMatrix, this.cameraRotation);
      cameraMatrix = m4.translate(cameraMatrix,camTranslationCentre)
    let viewMatrix = m4.inverse(cameraMatrix);
    matrix = m4.multiply(matrix,viewMatrix);
    const translation = [each.position.x,each.position.y,0]
      matrix = m4.translate(matrix,translation)
      matrix = m4.rotateZ(matrix,Object.is(undefined,each.rotation) ? 0 : each.rotation.heading);
      matrix = m4.scale(matrix,[each.position.xsize,each.position.ysize,1]) 
      let uniforms = {
        u_diffuse: this.textures[Object.is(undefined,each.sprite) ? "missing" : each.sprite.texture],
      u_resolution: [this.gl.canvas.width, this.gl.canvas.height],
      u_time : time,
        u_matrix: matrix
      };


        if (!Object.is(undefined,each.colour)){
          uniforms.u_colour = each.colour.rgb;
        }
   // Object.assign(uniforms, each.uniforms.uniforms);
      let prog = this.programs.test;
      if (each.sprite) {
      prog = this.programs.sprite

      if (each.exploding){
      prog = this.programs.exploding

      }
    }
    if (each.scanwedge) {
      prog = this.programs.scanwedge

    }

    if (each.waymarker) {
      if (each.waymarker.onscreen==true){
        prog = this.programs.waymarker
      }
      else {
        prog = this.programs.test
      }

    }

    this.gl.useProgram(prog.progInfo.program);
    twgl.setBuffersAndAttributes(this.gl, prog.progInfo, this.bufferInfo);
    twgl.setUniforms(prog.progInfo, uniforms);
    twgl.drawBufferInfo(this.gl, this.bufferInfo, this.gl.TRIANGLES);
    
    }) 
    }
}

export default Renderer;


