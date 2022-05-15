import * as THREE from "three";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { GroupProps, useFrame } from "@react-three/fiber";
import { Points, useGLTF } from "@react-three/drei";
import { PointShaderMaterialRaw } from "../../shader/PointShaderMaterial";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";
import { useSpring } from "@react-spring/three";
import { useColorStore } from "../../zustand/useColorStore";

class PointModelProps {
    numParticles: number;
    path: string;
    color1: THREE.ColorRepresentation;
    color2: THREE.ColorRepresentation;
    blending?: THREE.Blending;
    colorType?: "therapeuticColor" | "primaryColor" | "secondaryColor";
}

const PointModel = React.forwardRef<THREE.Group, PointModelProps & GroupProps>(
    (props, ref) => {
        const { transitionDelay, therapeuticColor } = useColorStore(
            (state) => ({
                transitionDelay: state.transitionDelay,
                therapeuticColor: state.therapeuticColor,
            })
        );

        const gltf = useGLTF(props.path);

        const meshRef = useRef<THREE.Mesh>(null);
        const pointsRef = useRef<THREE.Points>(null);
        const sampler = useRef<MeshSurfaceSampler>(null);

        const [particlesPosition, setParticlesPosition] =
            useState<Float32Array>(new Float32Array(props.numParticles * 3));
        const [particlesRandomness, setParticlesRandomness] =
            useState<Float32Array>(new Float32Array(props.numParticles * 3));

        const [loading, setLoading] = useState<boolean>(true);

        const { color1, color2 } = useSpring({
            color1: props.color1,
            color2: props.color2,
            config: {
                duration: transitionDelay,
            },
            onChange: () => {
                pointsRef.current.material["uniforms"]["uColor1"].value =
                    new THREE.Color(color1.get());
                pointsRef.current.material["uniforms"]["uColor2"].value =
                    new THREE.Color(color2.get());
            },
        });

        const particlesGeometry = useCallback(() => {
            if (!loading) {
                const particlesBufferGeometry = new THREE.BufferGeometry();

                particlesBufferGeometry.setAttribute(
                    "position",
                    new THREE.BufferAttribute(particlesPosition, 3)
                );
                particlesBufferGeometry.setAttribute(
                    "aRandom",
                    new THREE.BufferAttribute(particlesRandomness, 3)
                );

                // console.log(particlesBufferGeometry);

                return particlesBufferGeometry;
            }
            return null;
        }, [loading]);

        useEffect(() => {
            sampler.current = new MeshSurfaceSampler(meshRef.current).build();

            for (let i = 0; i < props.numParticles; i++) {
                const newPosition = new THREE.Vector3();
                sampler.current.sample(newPosition);
                particlesPosition.set(
                    [
                        newPosition.x, // 0 - 3
                        newPosition.y, // 1 - 4
                        newPosition.z, // 2 - 5
                    ],
                    i * 3
                );

                particlesRandomness.set(
                    [
                        Math.random() * 2 - 1, // -1 ~ 1
                        Math.random() * 2 - 1, // -1 ~ 1
                        Math.random() * 2 - 1, // -1 ~ 1
                    ],
                    i * 3
                );
            }

            setParticlesPosition(particlesPosition);
            setParticlesRandomness(particlesRandomness);
            setLoading(false);
        }, []);

        useFrame(({ clock }) => {
            if (pointsRef?.current?.material["uniforms"]) {
                pointsRef.current.material["uniforms"].uTime.value =
                    clock.getElapsedTime();
            }
        });

        return (
            <>
                <group name={"center"} ref={ref} {...props} dispose={null}>
                    <mesh
                        ref={meshRef}
                        visible={false}
                        // @ts-ignore
                        geometry={gltf.scene.children[0].geometry}
                    />
                    <Points
                        ref={pointsRef}
                        material={PointShaderMaterialRaw(
                            props.color1,
                            props.color2,
                            {
                                blending:
                                    props.colorType === "therapeuticColor" &&
                                    therapeuticColor === "#000000"
                                        ? THREE.NormalBlending
                                        : props.blending,
                                opacity:
                                    props.colorType === "therapeuticColor"
                                        ? 1
                                        : 0,
                            }
                        )}
                        geometry={particlesGeometry()}
                        renderOrder={999}
                    />
                    {/* {props.colorType === "therapeuticColor" &&
                        therapeuticColor === "#000000" && (
                            <pointLight
                                renderOrder={-1}
                                args={["#000000", 100, 100]}
                            >
                                <mesh>
                                    <sphereGeometry args={[0.5, 16, 8]} />
                                    <meshBasicMaterial
                                        color={"#ffffff"}
                                        transparent
                                        side={THREE.BackSide}
                                    />
                                </mesh>
                            </pointLight>
                        )} */}
                </group>
            </>
        );
    }
);

export default PointModel;

useGLTF.preload("/models/saturn.glb");
useGLTF.preload("/models/Shark.glb");
useGLTF.preload("/models/air_ballon.glb");
