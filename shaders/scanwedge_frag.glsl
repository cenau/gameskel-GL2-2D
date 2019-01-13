#version 300 es

precision mediump float;

in vec2 v_texcoord;

uniform vec3 u_colour;
out vec4 outColor;

#define PI 3.14159265358979323846


vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}


void main() {
  vec2 st = v_texcoord;
  float alpha = st.y;
  st.y -= 1.;
  st.y = st.y * .5;
  st.y +=1.;
  st = rotate2D(st,PI*0.25);
  alpha *= box(st,vec2(0.7),0.00);
  outColor = vec4(u_colour,alpha);
}
