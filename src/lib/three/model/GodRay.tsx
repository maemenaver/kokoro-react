import * as THREE from "three";
import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Vector2 } from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";
import { MathUtils } from "three";
import { useUniformsStore } from "../../zustand/useUniformsStore";
import { useGodRayStore } from "../../zustand/useGodRayStore";

export function GodRay(props) {
    const group = useRef<THREE.Group>();
    const { scene, animations } = useGLTF("/models/butterfly.glb");
    const gradientNoise = useTexture("/textures/gradient-noise.png");

    useEffect(() => {
        // gradientNoise;
    }, []);

    // useFrame(({ clock }, dt) => {
    //     vec.set(clock.elapsedTime, clock.elapsedTime);
    //     group.current.position.set(0, fbm.get2(vec), 0);
    //     group.current.rotation.y -= dt;
    // });

    return (
        <group>
            <mesh>
                <bufferGeometry></bufferGeometry>
                <shaderMaterial
                    uniforms={{
                        uTime: useUniformsStore.getState().uTime,
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
                            value: useGodRayStore.getState().strength,
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
                ></shaderMaterial>
            </mesh>
        </group>
    );
}
