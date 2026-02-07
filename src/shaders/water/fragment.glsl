uniform float uTime;
uniform vec3 uColorOut;
uniform vec3 uColorIn;

varying float vRandom;

void main()
{
vec3 color = mix(uColorOut, uColorIn, vRandom * 1.25);

    gl_FragColor = vec4(color, 1.0);

    #include <colorspace_fragment>
}