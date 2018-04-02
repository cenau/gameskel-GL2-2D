#version 300 es
 
precision mediump float;

uniform vec3 u_colour; 
out vec4 outColor;
 
void main() {
  outColor = vec4(u_colour,1.);
}
