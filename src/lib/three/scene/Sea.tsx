import react, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import PointModel from "../model/PointModel";
import { useControls } from "leva";
import {
    seaFragmentShader,
    seaVertexShader,
} from "../../shader/SeaShaderMaterial";
import { useGLTF, useTexture } from "@react-three/drei";
import Bubble from "../model/Bubble";
import { GodRay } from "../model/GodRay";
import { useThree } from "@react-three/fiber";

class SeaProps {
    primaryColor: string;
    secondaryColor: string;
}

const Sea = (props: SeaProps) => {
    const castleRef = useRef();
    const scene = useThree((v) => v.scene);

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
        // scene.fog = new THREE.Fog(new THREE.Color("#203455"), 0.1, 40);

        console.log(castleRef);
    }, []);

    useEffect(() => {
        console.log(props.primaryColor);
        setSaturnControl({
            color1:
                props.primaryColor === "orange"
                    ? "#ff0a00"
                    : props.primaryColor === "yellow"
                    ? "orange"
                    : props.primaryColor === "black"
                    ? "#aaa7a7"
                    : props.primaryColor === "red"
                    ? "#0d0104"
                    : props.primaryColor === "purple"
                    ? "#2a1c4e"
                    : props.primaryColor === "green"
                    ? "#095802"
                    : props.primaryColor === "blue"
                    ? "#0019ff"
                    : props.primaryColor === "grey"
                    ? "#81478d"
                    : props.primaryColor,
            color2:
                props.primaryColor === "orange"
                    ? "#ff3000"
                    : props.primaryColor === "yellow"
                    ? "orange"
                    : props.primaryColor === "black"
                    ? "#4b3e3e"
                    : props.primaryColor === "red"
                    ? "#a01414"
                    : props.primaryColor === "purple"
                    ? "#5f1652"
                    : props.primaryColor === "green"
                    ? "#022706"
                    : props.primaryColor === "blue"
                    ? "#0053ff"
                    : props.primaryColor === "grey"
                    ? "#495476"
                    : props.primaryColor,
        });
    }, [props.primaryColor]);

    return (
        <>
            <ambientLight />
            <PointModel
                path={"/models/shark.glb"}
                position={[0, 0, 0]}
                scale={[25, 25, 25]}
                numParticles={50000}
                color1={saturnControl.color1}
                color2={saturnControl.color2}
            />
            {/* <Effects /> */}
            {/* <mesh scale={100}>
                <sphereGeometry attach="geometry" />
                <shaderMaterial
                    attach="material"
                    vertexShader={seaVertexShader}
                    fragmentShader={seaFragmentShader}
                    side={THREE.DoubleSide}
                    blending={THREE.NormalBlending}
                    // transparent={true}
                    // opacity={1}
                    // depthTest={false}
                    depthWrite={true}
                    uniforms={{
                        uColor: {
                            value: new THREE.Color("#3366CC"),
                        },
                    }}
                />
            </mesh> */}
            <GodRay />
            {/* <AquariumCastle
                position={[150, -100, 100]}
                rotation={[-Math.PI / 2, 0, Math.PI]}
                scale={[10, 10, 10]}
            />
            <AquariumCastle
                position={[-150, -100, 100]}
                rotation={[-Math.PI / 2, 0, Math.PI]}
                scale={[10, 10, 10]}
            />
            <AquariumCastle
                position={[150, -100, -100]}
                rotation={[-Math.PI / 2, 0, Math.PI]}
                scale={[10, 10, 10]}
            />
            <AquariumCastle
                position={[-150, -100, -100]}
                rotation={[-Math.PI / 2, 0, Math.PI]}
                scale={[10, 10, 10]}
            /> */}
            {/* <SeaEffects /> */}
        </>
    );
};

export default Sea;
