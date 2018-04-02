#version 300 es
 
in vec4 a_position;
out vec2 v_position;
uniform mat4 u_matrix;

 
void main() {
  v_position = a_position.xy;
  gl_Position = u_matrix * a_position;
}
