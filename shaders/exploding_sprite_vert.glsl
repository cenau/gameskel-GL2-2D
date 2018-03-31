#version 300 es

precision mediump float;
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
 
in vec4 a_position;
in vec2 a_texcoord;
 
uniform mat4 u_matrix;
uniform float u_time; 
out vec2 v_texcoord;
 
void main() {
   vec4 pos = a_position;
   pos.x -=  cos(u_time) * snoise2(a_texcoord) * 2. ;
   pos.y -=  sin(u_time) * snoise2(a_texcoord) * 2.;
   pos.w +=snoise2(a_texcoord * sin(u_time));
   gl_Position = u_matrix * pos;
   v_texcoord = a_texcoord;
}
