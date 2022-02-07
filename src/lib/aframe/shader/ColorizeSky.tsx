import * as THREE from "three";
import * as AFRAME from "aframe";
import React, { useEffect } from "react";
import glsl from "babel-plugin-glsl/macro";

export default function ColorizeSky() {
    useEffect(() => {
        AFRAME.registerShader("colorize-sky", {
            schema: {
                uColor: {
                    type: "color",
                    is: "uniform",
                    default: "#3366CC",
                },
            },
            vertexShader: glsl`
                varying vec2 vUv;

                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: glsl`
                uniform vec3 uColor;

                varying vec2 vUv;
                
                void main() {
                    float atmosphere = sqrt(1.0-vUv.y);
                    vec3 skyColor = uColor;
                    vec3 scatterColor = mix(vec3(1.0),vec3(1.0,0.3,0.0) * 1.5,0.0);
                    vec3 sky = mix(skyColor, vec3(scatterColor), atmosphere / 0.9);
                    gl_FragColor = vec4(sky , 1.0);
            }
            `,
        });
    }, []);

    return <></>;
}
