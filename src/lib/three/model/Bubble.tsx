import * as THREE from "three";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { GroupProps, useFrame, useThree } from "@react-three/fiber";
import { Points, useGLTF, useTexture } from "@react-three/drei";
import { PointShaderMaterialRaw } from "../../shader/PointShaderMaterial";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";
import { useSpring } from "@react-spring/three";
import { useColorStore } from "../../zustand/useColorStore";

class BubbleProps {
    numParticles: number;
    color1?: THREE.ColorRepresentation;
    color2?: THREE.ColorRepresentation;
    blending?: THREE.Blending;
}

const Bubble = React.forwardRef<THREE.Group, BubbleProps & GroupProps>(
    (props, ref) => {
        const { transitionDelay } = useColorStore();

        const pointsRef = useRef<THREE.Points>(null);

        const particleTexture = useTexture("/textures/particles/1.png");

        const [particlesPosition, setParticlesPosition] =
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

                // console.log(particlesBufferGeometry);

                return particlesBufferGeometry;
            }
            return null;
        }, [loading]);

        useEffect(() => {
            for (let i = 0; i < props.numParticles; i++) {
                const newPosition = new THREE.Vector3(
                    (Math.random() - 0.5) * 40,
                    (Math.random() - 0.5) * 40,
                    (Math.random() - 0.5) * 40
                );
                particlesPosition.set(
                    [
                        newPosition.x, // 0 - 3
                        newPosition.y, // 1 - 4
                        newPosition.z, // 2 - 5
                    ],
                    i * 3
                );
            }

            setParticlesPosition(particlesPosition);
            setLoading(false);
        }, []);

        useFrame(({ clock }) => {
            for (let i = 0; i < props.numParticles; i++) {
                const y = i * 3 + 1;

                // @ts-ignore
                pointsRef.current.geometry.attributes.position.array[y] +=
                    clock.getElapsedTime() * 0.00002;

                if (
                    pointsRef.current.geometry.attributes.position.array[y] > 20
                ) {
                    // @ts-ignore
                    pointsRef.current.geometry.attributes.position.array[y] =
                        -20;
                }

                pointsRef.current.geometry.attributes.position.needsUpdate =
                    true;
            }
        });

        return (
            <>
                <group ref={ref} name={"Bubble"} {...props}>
                    <Points ref={pointsRef} geometry={particlesGeometry()}>
                        <pointsMaterial
                            attach="material"
                            color={"#FFFFFF"}
                            size={0.1}
                            sizeAttenuation={true}
                            transparent={true}
                            alphaMap={particleTexture}
                            depthWrite={false}
                            opacity={0.5}
                        />
                    </Points>
                </group>
            </>
        );
    }
);

export default Bubble;

// useGLTF.preload("/models/saturn.glb");
