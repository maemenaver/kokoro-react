import * as THREE from "three";
import React, {
    useRef,
    useEffect,
    useMemo,
    useCallback,
    useState,
} from "react";
import {
    useGLTF,
    useAnimations,
    useTexture,
    useHelper,
    ComputedAttribute,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { BoxHelper, BufferGeometry, MeshBasicMaterial, Vector2 } from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";
import { MathUtils } from "three";
import { useUniformsStore } from "../../zustand/useUniformsStore";
import { useGodRayStore } from "../../zustand/useGodRayStore";
import {
    godRayFragmentShader,
    godRayVertexShader,
} from "../../shader/GodRayMaterial";

export function BubbleFlow(props) {
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

    // useHelper(mesh, BoxHelper, "green");

    useEffect(() => {
        console.log("useEffect");

        const random = Math.random();
        aOffset.set([random, random, random, random], 0);

        gradientNoise.wrapS = THREE.RepeatWrapping;
        gradientNoise.wrapT = THREE.RepeatWrapping;

        setAOffset(aOffset);
        setLoading(false);
    }, []);

    useFrame(({ clock }) => {
        if (mesh?.current) {
            // mesh.current.rotation.x += clock.getElapsedTime() * 0.01;
            // mesh.current.rotation.y += clock.getElapsedTime() * 0.01;
            // mesh.current.rotation.z += clock.getElapsedTime() * 0.01;
        }
    });

    return (
        <group>
            <instancedMesh count={21000}>
                <instancedBufferAttribute
                    attach={"curveArray"}
                    array={
                        [
                            // new THREE.CatmullRomCurve3()
                        ]
                    }
                />
            </instancedMesh>
            <mesh
                ref={mesh}
                position={[0, 0, 0]}
                // rotation={[0, 0, 0]}
                scale={[80, 80, 1]}
                renderOrder={-1}
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
                    side={THREE.DoubleSide}
                    transparent={true}
                    depthTest={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
}
