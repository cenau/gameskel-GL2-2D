#version 300 es
precision mediump float;
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

in vec2 v_texcoord;
 
uniform sampler2D u_diffuse;
uniform float u_time;
 
out vec4 outColor;
 
void main() {
	vec4 colour = texture(u_diffuse, v_texcoord);
      	colour.rga += snoise2(v_texcoord * sin(u_time));	
   	outColor = colour;
}
