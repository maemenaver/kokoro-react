import react, { useEffect, useRef } from "react";
import PointModel from "../model/PointModel";
import { useControls } from "leva";
import {
    seaFragmentShader,
    seaVertexShader,
} from "../../shader/SeaShaderMaterial";
import { GodRay } from "../model/GodRay";
import { useColorStore } from "../../zustand/useColorStore";

class SeaProps {}

const Sea = (props: SeaProps) => {
    const castleRef = useRef();

    const { primaryColor } = useColorStore();

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
        console.log(primaryColor);
        setSaturnControl({
            color1:
                primaryColor === "orange"
                    ? "#ff0a00"
                    : primaryColor === "yellow"
                    ? "orange"
                    : primaryColor === "black"
                    ? "#aaa7a7"
                    : primaryColor === "red"
                    ? "#0d0104"
                    : primaryColor === "purple"
                    ? "#2a1c4e"
                    : primaryColor === "green"
                    ? "#095802"
                    : primaryColor === "blue"
                    ? "#0019ff"
                    : primaryColor === "grey"
                    ? "#81478d"
                    : primaryColor,
            color2:
                primaryColor === "orange"
                    ? "#ff3000"
                    : primaryColor === "yellow"
                    ? "orange"
                    : primaryColor === "black"
                    ? "#4b3e3e"
                    : primaryColor === "red"
                    ? "#a01414"
                    : primaryColor === "purple"
                    ? "#5f1652"
                    : primaryColor === "green"
                    ? "#022706"
                    : primaryColor === "blue"
                    ? "#0053ff"
                    : primaryColor === "grey"
                    ? "#495476"
                    : primaryColor,
        });
    }, [primaryColor]);

    return (
        <>
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
