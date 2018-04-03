#version 300 es
#define PI 3.14159265359
 
precision mediump float;

uniform vec3 u_colour; 
uniform float u_time; 
in vec4 a_position;
in vec2 v_position;
out vec4 outColor;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float reticule(float theta, float length, float segments){
    float f = smoothstep(.0, -.2, cos(theta*segments + u_time*0.0075))*(PI*0.1);

 	float g = 1.0-smoothstep(0.0, 1., length*2.0);

    f = f-g;
    f = 1.0-smoothstep(f, f+0.008, 0.1);
    return f;
}

 
void main() {
vec2 st = v_position; 

float theta = atan(st.y,st.x);
    float len = length(st) - 0.5;

float alpha = reticule(theta, len,3.);  
outColor = vec4(u_colour, alpha * 1.2 - (len + 0.5) );

}

