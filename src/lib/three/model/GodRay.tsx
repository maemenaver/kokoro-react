import * as THREE from "three";
import React, { useRef, useEffect, useMemo, useState } from "react";
import { useTexture, ComputedAttribute } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useUniformsStore } from "../../zustand/useUniformsStore";
import { useGodRayStore } from "../../zustand/useGodRayStore";
import {
    godRayFragmentShader,
    godRayVertexShader,
} from "../../shader/GodRayMaterial";
import { useObjectStore } from "../../zustand/useObjectStore";

export function GodRay(props) {
    const group = useRef<THREE.Group>();
    const mesh = useRef<THREE.Mesh>();

    const [loading, setLoading] = useState<boolean>(true);
    const [aOffset, setAOffset] = useState<Float32Array>(new Float32Array(4));

    const randomSeed = useMemo(() => {
        const random = 0.15;
        console.log(random);
        const buffer = new Float32Array(4);
        buffer.set([random, random, random, random]);
        return new THREE.BufferAttribute(buffer, 1);
    }, []);

    const gradientNoise = useTexture("/textures/gradient-noise.png");

    useEffect(() => {
        const random = Math.random();
        aOffset.set([random, random, random, random], 0);

        gradientNoise.wrapS = THREE.RepeatWrapping;
        gradientNoise.wrapT = THREE.RepeatWrapping;

        setAOffset(aOffset);
        setLoading(false);
    }, []);

    // useEffect(() => {
    //     console.log(strength);
    //     mesh.current.material["uniforms"].uniformsNeedUpdate = true;
    // }, [strength]);

    useFrame(({ clock }) => {
        if (mesh?.current) {
            // mesh.current.rotation.x += clock.getElapsedTime() * 0.01;
            // mesh.current.rotation.y += clock.getElapsedTime() * 0.01;
            // mesh.current.rotation.z += clock.getElapsedTime() * 0.01;
            if (!useObjectStore.getState().seaGodray) {
                useObjectStore.setState((state) => ({
                    seaGodray: mesh.current,
                }));
            }

            mesh.current.material["uniforms"].uTime.value = Math.sin(
                clock.getElapsedTime() / 5
            );
            // mesh.current.material["uniforms"].uStrength.value = strength;
        }
    });

    return (
        <group>
            <mesh
                ref={mesh}
                position={[0, 0, 0]}
                // rotation={[0, 0, 0]}
                scale={[120, 80, 1]}
            >
                <planeBufferGeometry>
                    {/* <bufferAttribute attachObject={["attributes", "aOffset"]} array={} /> */}
                    <ComputedAttribute
                        name="aOffset"
                        compute={() => randomSeed}
                    />
                </planeBufferGeometry>
                <shaderMaterial
                    vertexShader={godRayVertexShader}
                    fragmentShader={godRayFragmentShader}
                    uniforms={{
                        uTime: {
                            value: 0,
                        },
                        uNoiseTexture: {
                            value: gradientNoise,
                        },
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
                            value: 0.75,
                        },
                        uLength: { value: useGodRayStore.getState().length },
                        uFadeSmoothness: {
                            value: useGodRayStore.getState().fadeSmoothness,
                        },
                        uScale: { value: useGodRayStore.getState().scale },
                        uSpeed: { value: useGodRayStore.getState().speed },
                        uLightColor: {
                            value: new THREE.Color(
                                useGodRayStore.getState().color
                            ),
                        },
                    }}
                    side={THREE.FrontSide}
                    transparent={true}
                    depthTest={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
}
