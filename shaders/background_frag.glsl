#version 300 es 
precision mediump float;
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

uniform vec2 u_worldPos; 
uniform float u_worldRotation;
uniform float u_worldAdjust; 
uniform float u_worldOffset;
uniform float u_lacunarity;
uniform float u_gain; 
uniform float u_alpha; 
uniform float u_fbmx;  
uniform float u_fbmy; 

in vec2 v_position;
out vec4 outColor;


 
float random (in vec2 _st) { 
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123);
}

float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + 
            (c - a)* u.y * (1.0 - u.x) + 
            (d - b) * u.x * u.y;
}


  #define OCTAVES 2
// from https://thebookofshaders.com/13/
float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), 
                    -sin(0.5), cos(0.50));
    for (int i = 0; i < OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * u_lacunarity + shift;
	a *= u_gain;
    }
    return v;
}


void main() {
  vec2 posflip = vec2(v_position.x,-v_position.y);

  vec2 st = posflip + u_worldPos * u_worldAdjust +u_worldOffset;

  float Pixels = 256.0;
        float dx = 6.0 * (1.0 / Pixels);
        float dy = 10.0 * (1.0 / Pixels);
        st = vec2(dx * floor(st.x / dx),
                          dy * floor(st.y / dy));

vec2 q = vec2(0.);
    q.x = fbm( st + 0.00);
    q.y = fbm( st + vec2(1.0));
 
    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2) + u_fbmx);
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8) + u_fbmy);
    float deform = fbm(st + r);

    vec3 colour = vec3(deform);
    if (deform < 0.5) {
	colour.r = 0. + deform * 0.25;
        colour.g = 0. + deform * 0.45;
    }
    if (deform >= 0.5) {
//	colour.b = 0.;
    }
  outColor = vec4(colour , u_alpha);
}
