import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

const vertexShader = glsl`
    // attribute vec3 position;
    attribute vec3 aRandom;

    varying vec3 vPosition;

    uniform float uTime;
    uniform float uScale;

    void main() {
        vPosition = position;

        float time = uTime + 4.;

        vec3 pos = position;
        pos.x += sin(time + aRandom.x) * 0.01;
        pos.y += cos(time + aRandom.y) * 0.01;
        pos.z += cos(time + aRandom.z) * 0.01;

        pos.x *= uScale + (sin(pos.y * 4.0 + time) * (1.0 - uScale));
        pos.y *= uScale + (sin(pos.z * 4.0 + time) * (1.0 - uScale));
        pos.z *= uScale + (sin(pos.x * 4.0 + time) * (1.0 - uScale));

        pos *= uScale;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = 8.0 / -mvPosition.z;
    }
`;

const fragmentShader = glsl`
varying vec3 vPosition;

uniform vec3 uColor1;
uniform vec3 uColor2;

void main() {
    vec3 color = vec3(1.0, 0.0, 0.0);
    // color = vec3(1.0, 1.0, 0.0);
    // color.r = 0.0;

    // vec3 color1 = vec3(10.0/255.0, 30.0/255.0, 100.0/255.0); // rgb(10, 30, 100)
    // vec3 color2 = vec3(1.0, 1.0, 0.0);

    float depth = vPosition.z * 0.5 + 0.5;
    color = mix(uColor1, uColor2, depth);
    // color = vec3(vPosition.x, vPosition.y, vPosition.z);
    gl_FragColor = vec4(color, 1.0);
}
`;

// const PointShaderMaterial = shaderMaterial(
//     {
//         uColor1: new THREE.Color("red"),
//         uColor2: new THREE.Color("blue"),
//         uTime: 0,
//         uScale: 0,
//     },
//     vertexShader,
//     fragmentShader
// );

const PointShaderMaterialRaw = (
    color1: THREE.ColorRepresentation,
    color2: THREE.ColorRepresentation,
    blending?: THREE.Blending
) =>
    new THREE.ShaderMaterial({
        uniforms: {
            uColor1: {
                value: new THREE.Color(color1),
            },
            uColor2: {
                value: new THREE.Color(color2),
            },
            uTime: {
                value: 0,
            },
            uScale: {
                value: 1,
            },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: blending ?? THREE.AdditiveBlending,
    });

export { PointShaderMaterialRaw };
