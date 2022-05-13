import react, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import PointModel from "../model/PointModel";
import { Environment, Sky } from "@react-three/drei";
import { useControls } from "leva";
import {
    skyFragmentShader,
    skyVertexShader,
} from "../../shader/SkyShaderMaterial";
import { Butterfly } from "../model/Butterfly";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useColorStore } from "../../zustand/useColorStore";
import { useObjectStore } from "../../zustand/useObjectStore";

class EtherProps {}

const Ether = (props: EtherProps) => {
    const { primaryColor } = useColorStore();

    const etherGroupRef = useRef();

    const clouds = useLoader(TextureLoader, "/textures/clouds.png");

    const butterflyPosition = useMemo(
        () =>
            new Array(1000).fill(0).map((v) => {
                const distanceOffset = 25;
                const distanceRange = 5;
                const distance =
                    distanceOffset + (Math.random() - 0.5) * distanceRange;

                const angle = Math.random() * Math.PI * 2;

                const x = Math.cos(angle) * distance;
                const y = (Math.random() - 0.5) * 5;
                const z = Math.sin(angle) * distance;

                return new THREE.Vector3(x, y, z);
            }),
        []
    );

    const [saturnControl, setSaturnControl] = useControls("Saturn", () => ({
        color1: {
            value: primaryColor,
            label: "Color1",
        },
        color2: {
            value: primaryColor,
            label: "Color2",
        },
    }));

    useEffect(() => {
        useObjectStore.setState((state) => ({
            etherGroup: etherGroupRef.current,
        }));
    }, []);

    useEffect(() => {
        console.log(primaryColor);
        setSaturnControl({
            color1:
                primaryColor === "orange"
                    ? "#e2b972"
                    : primaryColor === "yellow"
                    ? "#c2dae8"
                    : primaryColor === "black"
                    ? "#1d1d1d"
                    : primaryColor === "red"
                    ? "#db5a7d"
                    : primaryColor === "purple"
                    ? "#6883be"
                    : primaryColor === "green"
                    ? "#40a73a"
                    : primaryColor === "blue"
                    ? "#98c5e5"
                    : primaryColor === "grey"
                    ? "#767e80"
                    : primaryColor,
            color2:
                primaryColor === "orange"
                    ? "#d86d58"
                    : primaryColor === "yellow"
                    ? "#dbc458"
                    : primaryColor === "black"
                    ? "#000000"
                    : primaryColor === "red"
                    ? "#efceba"
                    : primaryColor === "purple"
                    ? "#b4a3d5"
                    : primaryColor === "green"
                    ? "#92d1a7"
                    : primaryColor === "blue"
                    ? "#528dd9"
                    : primaryColor === "grey"
                    ? "#695f5f"
                    : primaryColor,
        });
    }, [primaryColor]);

    return (
        <group ref={etherGroupRef} name="ether">
            <PointModel
                key="center"
                path={"/models/saturn.glb"}
                position={[0, 0, 0]}
                scale={[10, 11, 10]}
                numParticles={400000}
                color1={saturnControl.color1}
                color2={saturnControl.color2}
                blending={THREE.NormalBlending}
            />

            <group key="ButterflyGroup" name={"ButterflyGroup"}>
                {butterflyPosition.map((position, i) => (
                    <Butterfly key={i} position={position} scale={1} />
                ))}
            </group>

            {/* <mesh scale={80} position={[0, 0, -40]}>
                <planeGeometry  attach="geometry" />
                <shaderMaterial
                    vertexShader={skyVertexShader}
                    fragmentShader={skyFragmentShader}
                    side={THREE.DoubleSide}
                    transparent={true}
                    opacity={1}
                    depthTest={false}
                    depthWrite={true}
                    
                    uniforms={{
                        uColor: {
                            value: new THREE.Color("#3366CC"),
                        },
                    }}
                />
            </mesh> */}
            <mesh scale={39}>
                <sphereGeometry attach="geometry" />
                <meshBasicMaterial
                    attach="material"
                    side={THREE.BackSide}
                    map={clouds}
                    transparent={true}
                    opacity={1.0}
                    // blendSrc={THREE.SrcAlphaSaturateFactor}
                    depthTest={false}
                    depthWrite={true}
                />
            </mesh>
            <Sky />
            {/* <Environment preset="sunset" /> */}
        </group>
    );
};

export default Ether;
