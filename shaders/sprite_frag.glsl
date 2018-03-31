#version 300 es
precision mediump float;
 
in vec2 v_texcoord;
 
uniform sampler2D u_diffuse;
 
out vec4 outColor;
 
void main() {
   outColor = texture(u_diffuse, v_texcoord);
}
