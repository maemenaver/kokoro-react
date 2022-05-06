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

export function GodRay(props) {
    const uTime = useUniformsStore((state) => state.uTime);

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
    const uniformsStore = useUniformsStore();
    const godRayStore = useGodRayStore();

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
            <mesh
                ref={mesh}
                position={[0, 0, 30]}
                // rotation={[0, 0, 0]}
                scale={[70, 70, 1]}
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
                        uTime: uTime,
                        uNoiseTexture: {
                            value: gradientNoise,
                        },
                        fogNear: uniformsStore.fogNear,
                        fogFar: uniformsStore.fogFar,
                        fogFarColor: uniformsStore.fogFarColor,
                        fogNearColor: uniformsStore.fogNearColor,
                        uDirection: {
                            value: new THREE.Vector2(
                                godRayStore.directionX,
                                godRayStore.directionY
                            ),
                        },
                        uStrength: {
                            value: godRayStore.strength,
                        },
                        uLength: { value: godRayStore.length },
                        uFadeSmoothness: {
                            value: godRayStore.fadeSmoothness,
                        },
                        uScale: { value: godRayStore.scale },
                        uSpeed: { value: godRayStore.speed },
                        uLightColor: {
                            value: new THREE.Color(godRayStore.color),
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
