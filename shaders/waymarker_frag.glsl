#version 300 es
 
precision mediump float;

uniform vec3 u_colour; 
in vec4 a_position;
in vec2 v_position;
out vec4 outColor;
 
void main() {

vec2 bl = step(vec2(-0.9),v_position);       // bottom-left
vec2 tr = step(vec2(-0.9),-v_position);   // top-right
float alpha = bl.x * bl.y * tr.x * tr.y;
  outColor = vec4(u_colour, 0.5 -alpha);

}
