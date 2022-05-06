import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

const seaVertexShader = glsl`
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const seaFragmentShader = glsl`
    uniform vec3 uColor;

    varying vec2 vUv;

    void main() {
        float atmosphere = sqrt(1.0-vUv.y);
        vec3 seaColor = uColor;
        vec3 scatterColor = vec3(0.0,0.0,0.0);
        vec3 sea = mix(seaColor, vec3(scatterColor), atmosphere / 0.9);
        gl_FragColor = vec4(sea , 1.0);
    }
`;

const SeaShaderMaterialRaw = (
    color1: THREE.ColorRepresentation,
    blending?: THREE.Blending
) =>
    new THREE.ShaderMaterial({
        uniforms: {
            uColor: {
                value: new THREE.Color(color1),
            },
        },
        vertexShader: seaVertexShader,
        fragmentShader: seaFragmentShader,
        // transparent: true,
        depthTest: false,
        depthWrite: true,
        blending: blending ?? THREE.AdditiveBlending,
    });

export { seaVertexShader, seaFragmentShader, SeaShaderMaterialRaw };
