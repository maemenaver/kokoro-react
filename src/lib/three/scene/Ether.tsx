import react, { useEffect, useMemo, useRef } from "react";
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

class EtherProps {
    primaryColor: string;
    secondaryColor: string;
}

const Ether = (props: EtherProps) => {
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

    const cloudsRef = useRef<THREE.Group>(null);

    const clouds = useLoader(TextureLoader, "/textures/clouds.png");

    const [saturnControl, setSaturnControl] = useControls("Saturn", () => ({
        color1: {
            value: props.primaryColor,
            label: "Color1",
        },
        color2: {
            value: props.primaryColor,
            label: "Color2",
        },
    }));

    useEffect(() => {
        console.log(props.primaryColor);
        setSaturnControl({
            color1:
                props.primaryColor === "orange"
                    ? "#ff0a00"
                    : props.primaryColor === "yellow"
                    ? "orange"
                    : props.primaryColor === "black"
                    ? "#1d1d1d"
                    : props.primaryColor === "red"
                    ? "#b4274d"
                    : props.primaryColor === "purple"
                    ? "#231462"
                    : props.primaryColor === "green"
                    ? "#2c8624"
                    : props.primaryColor === "blue"
                    ? "#0019ff"
                    : props.primaryColor === "grey"
                    ? "#1a1821"
                    : props.primaryColor,
            color2:
                props.primaryColor === "orange"
                    ? "#ff3000"
                    : props.primaryColor === "yellow"
                    ? "orange"
                    : props.primaryColor === "black"
                    ? "#000000"
                    : props.primaryColor === "red"
                    ? "#0b0b0d"
                    : props.primaryColor === "purple"
                    ? "#10021d"
                    : props.primaryColor === "green"
                    ? "#022706"
                    : props.primaryColor === "blue"
                    ? "#0053ff"
                    : props.primaryColor === "grey"
                    ? "#000000"
                    : props.primaryColor,
        });
    }, [props.primaryColor]);

    return (
        <>
            {/* <ambientLight /> */}
            <PointModel
                path={"/models/saturn.glb"}
                position={[0, 0, 0]}
                scale={[10, 11, 10]}
                numParticles={200000}
                color1={saturnControl.color1}
                color2={saturnControl.color2}
            />
            {/* <Effects /> */}
            <group ref={cloudsRef}>
                {/* <Cloud
                    opacity={0.5}
                    speed={0.4} // Rotation speed
                    width={10} // Width of the full cloud
                    depth={1.5} // Z-dir depth
                    segments={20} // Number of particles
                /> */}
            </group>
            {butterflyPosition.map((position, i) => (
                <Butterfly key={i} position={position} scale={1} />
            ))}
            {/* <mesh scale={40}>
                <sphereGeometry attach="geometry" />
                <shaderMaterial
                    vertexShader={skyVertexShader}
                    fragmentShader={skyFragmentShader}
                    side={THREE.DoubleSide}
                    // transparent={true}
                    // opacity={1}
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
                    opacity={1}
                    depthTest={false}
                    depthWrite={true}
                />
            </mesh>
            <Sky />
            <Environment preset="sunset" />
        </>
    );
};

export default Ether;
