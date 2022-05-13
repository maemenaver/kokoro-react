import react, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { folder, useControls } from "leva";
import { GalaxyStars } from "../GalaxyStars";
import { useColorStore } from "../../zustand/useColorStore";

class SpaceProps {}

const Space = (props: SpaceProps) => {
    const { primaryColor, secondaryColor } = useColorStore();

    const galaxyRef = useRef(null);

    const spaceBg = useLoader(TextureLoader, "/textures/crab_nebula.png");

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

    const [galaxyControl, setGalaxyControl] = useControls(() => ({
        Galaxy: folder({
            count: { min: 100, max: 1000000, value: 100000, step: 100 },
            size: { min: 0.001, max: 0.1, value: 0.01, step: 0.001 },
            radius: { min: 0.01, max: 50, value: 31, step: 0.01 },
            branches: { min: 2, max: 20, value: 2, step: 1 },
            spin: { min: -5, max: 5, value: 0.78, step: 0.001 },
            randomness: { min: 0, max: 2, value: 0.09, step: 0.001 },
            randomnessPower: { min: 1, max: 10, value: 3, step: 0.001 },
            insideColor: {
                value: secondaryColor,
                label: "Inside Color",
            },
            outsideColor: {
                value: secondaryColor,

                label: "Outside Color",
            },
        }),
    }));

    useEffect(() => {
        setSaturnControl({
            color1:
                primaryColor === "orange"
                    ? "#ff0a00"
                    : primaryColor === "yellow"
                    ? "orange"
                    : primaryColor === "black"
                    ? "#1d1d1d"
                    : primaryColor === "red"
                    ? "#b4274d"
                    : primaryColor === "purple"
                    ? "#231462"
                    : primaryColor === "green"
                    ? "#2c8624"
                    : primaryColor === "blue"
                    ? "#0019ff"
                    : primaryColor === "grey"
                    ? "#1a1821"
                    : primaryColor,
            color2:
                primaryColor === "orange"
                    ? "#ff3000"
                    : primaryColor === "yellow"
                    ? "orange"
                    : primaryColor === "black"
                    ? "#000000"
                    : primaryColor === "red"
                    ? "#0b0b0d"
                    : primaryColor === "purple"
                    ? "#10021d"
                    : primaryColor === "green"
                    ? "#022706"
                    : primaryColor === "blue"
                    ? "#0053ff"
                    : primaryColor === "grey"
                    ? "#000000"
                    : primaryColor,
        });
    }, [primaryColor]);

    useEffect(() => {
        setGalaxyControl({
            ...galaxyControl,
            insideColor:
                secondaryColor === "orange"
                    ? "#ff3000"
                    : secondaryColor === "yellow"
                    ? "orange"
                    : secondaryColor === "black"
                    ? "#000000"
                    : secondaryColor === "red"
                    ? "#ff00c9"
                    : secondaryColor === "purple"
                    ? "#1d0c30"
                    : secondaryColor === "green"
                    ? "#001c0c"
                    : secondaryColor === "blue"
                    ? "#0053ff"
                    : secondaryColor === "grey"
                    ? "#000000"
                    : secondaryColor,
            outsideColor:
                secondaryColor === "orange"
                    ? "#ff0a00"
                    : secondaryColor === "yellow"
                    ? "orange"
                    : secondaryColor === "black"
                    ? "#1d1d1d"
                    : secondaryColor === "red"
                    ? "#f830eb"
                    : secondaryColor === "purple"
                    ? "#291240"
                    : secondaryColor === "green"
                    ? "#002e14"
                    : secondaryColor === "blue"
                    ? "#0019ff"
                    : secondaryColor === "grey"
                    ? "#1a1821"
                    : secondaryColor,
        });
    }, [secondaryColor]);

    return (
        <>
            {/* <ambientLight /> */}
            {/* <PointModel
                path={"/models/saturn.glb"}
                position={[0, 0, 0]}
                scale={[10, 11, 10]}
                numParticles={200000}
                color1={saturnControl.color1}
                color2={saturnControl.color2}
            /> */}
            <GalaxyStars
                dof={galaxyRef}
                galaxyControl={galaxyControl}
                insideColor={galaxyControl.insideColor}
                outsideColor={galaxyControl.outsideColor}
            />
            {/* <Effects /> */}
            <mesh scale={400}>
                <sphereGeometry attach="geometry" />
                <meshBasicMaterial
                    attach="material"
                    side={THREE.BackSide}
                    map={spaceBg}
                />
            </mesh>
        </>
    );
};

export default Space;
