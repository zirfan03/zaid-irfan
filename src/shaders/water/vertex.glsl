attribute float aRandom;

uniform float uTime;
uniform vec2 uFrequency;

varying float vRandom;

void main()
{


    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    modelPosition.y += sin(aRandom * modelPosition.x * uFrequency.y - uTime) * 0.025;
    modelPosition.y += sin(aRandom * modelPosition.z * uFrequency.y - uTime) * 0.025;

    modelPosition.x += cos(modelPosition.z * uFrequency.x - uTime) * 0.12;
    modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.125;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vRandom = aRandom;
}