import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

const skyVertexShader = glsl`
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const skyFragmentShader = glsl`
    uniform vec3 uColor;
    uniform float uOpacity;

    varying vec2 vUv;

    void main() {
        float atmosphere = sqrt(1.0-vUv.y);
        vec3 skyColor = uColor;
        vec3 scatterColor = mix(vec3(1.0),vec3(1.0,0.3,0.0) * 1.5,0.0);
        vec3 sky = mix(skyColor, vec3(scatterColor), atmosphere / 0.9);
        gl_FragColor = vec4(sky , uOpacity);
    }
`;

const SkyShaderMaterialRaw = (
    color1: THREE.ColorRepresentation,
    blending?: THREE.Blending
) =>
    new THREE.ShaderMaterial({
        uniforms: {
            uColor: {
                value: new THREE.Color(color1),
            },
        },
        vertexShader: skyVertexShader,
        fragmentShader: skyFragmentShader,
        // transparent: true,
        depthTest: false,
        depthWrite: true,
        blending: blending ?? THREE.AdditiveBlending,
    });

export { skyVertexShader, skyFragmentShader, SkyShaderMaterialRaw };
