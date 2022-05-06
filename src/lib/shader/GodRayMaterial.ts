import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import { useUniformsStore } from "../zustand/useUniformsStore";
import { useGodRayStore } from "../zustand/useGodRayStore";

const godRayVertexShader = glsl`
    attribute float aOffset;
                                    
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    varying float vOffset;

    void main () {
        vUv = uv;
        vOffset = aOffset;
        vWorldPosition = (modelMatrix * vec4( position, 1 )).xyz;
        vec4 mvPosition = projectionMatrix * modelViewMatrix * vec4( position, 1 );
        gl_Position = mvPosition;
    }
`;

const godRayFragmentShader = glsl`
    vec4 fog(float fogNear, float fogFar, float fogDepth, vec3 fogNearColor, vec3 fogFarColor) {
        float fogFactor = smoothstep(fogNear, fogFar, fogDepth);
        return vec4(mix( gl_FragColor.rgb, mix(fogNearColor, fogFarColor, fogFactor), fogFactor ), gl_FragColor.a);
    }

    varying vec2 vUv;
    varying vec3 vWorldPosition;
    varying float vOffset;

    uniform sampler2D uNoiseTexture;
    uniform float uTime;
    uniform vec2 uDirection;
    uniform float uStrength;
    uniform float uLength;
    uniform float uFadeSmoothness;
    uniform float uScale;
    uniform float uSpeed;
    uniform vec3 uLightColor;
    uniform float fogNear;
    uniform float fogFar;

    const vec2 lengthDirection = vec2(0., -1.);
    const vec2 center = vec2(0.5);

    void main() {
        vec2 worldPos = vWorldPosition.xy * 0.1;
        vec2 godRayOrigin = worldPos + uDirection;
        float uvDirection = atan(godRayOrigin.y, godRayOrigin.x);
        uvDirection *= uScale * clamp(0.75, 1., (0.5 + vOffset));

        float noise1 = texture2D(uNoiseTexture, vec2(uvDirection - uTime * 0.01)).r;
        float noise2 = texture2D(uNoiseTexture, vec2(uvDirection + vOffset * 5.2734 + uTime * 0.05 * uSpeed, uvDirection) * 1.5).g;
        float alpha = min(noise1, noise2);

        vec2 v2 = normalize(lengthDirection);
        float d = v2.x * center.x + v2.y * center.y;
        float length = uLength - cameraPosition.y * 0.005;
        alpha *= (1.0 - smoothstep(-uFadeSmoothness, 0.0, v2.x * vUv.x + v2.y * vUv.y - (d - 0.5 + length * (1. + uFadeSmoothness))));

        alpha *= uStrength;

        gl_FragColor = vec4(uLightColor, alpha);

        // gl_FragColor.a *= smoothstep(0., 5., cameraPosition.z - 2.5 - vWorldPosition.z);

        // float fogDepth = gl_FragCoord.z / gl_FragCoord.w;
        // float fogFactor = smoothstep(fogNear, fogFar, fogDepth);
        // gl_FragColor.a = mix(gl_FragColor.a, 0., fogFactor);

    }
`;

const GodRayShaderMaterialRaw = (gradientNoiseTexture) =>
    new THREE.ShaderMaterial({
        uniforms: {
            uTime: useUniformsStore.getState().uTime,
            uNoiseTexture: gradientNoiseTexture,
            fogNear: useUniformsStore.getState().fogNear,
            fogFar: useUniformsStore.getState().fogFar,
            fogFarColor: useUniformsStore.getState().fogFarColor,
            fogNearColor: useUniformsStore.getState().fogNearColor,
            uDirection: {
                value: new THREE.Vector2(
                    useGodRayStore.getState().directionX,
                    useGodRayStore.getState().directionY
                ),
            },
            uStrength: {
                value: useGodRayStore.getState().strength,
            },
            uLength: { value: useGodRayStore.getState().length },
            uFadeSmoothness: {
                value: useGodRayStore.getState().fadeSmoothness,
            },
            uScale: { value: useGodRayStore.getState().scale },
            uSpeed: { value: useGodRayStore.getState().speed },
            uLightColor: {
                value: new THREE.Color(useGodRayStore.getState().color),
            },
        },
        vertexShader: godRayVertexShader,
        fragmentShader: godRayFragmentShader,
        transparent: true,
        depthTest: false,
        blending: THREE.AdditiveBlending,
    });

export { godRayVertexShader, godRayFragmentShader, GodRayShaderMaterialRaw };
