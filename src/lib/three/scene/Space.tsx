import react, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import PointModel from "../model/PointModel";
import { TextureLoader } from "three";
import { folder, useControls } from "leva";
import { Butterfly } from "../model/Butterfly";
import { GalaxyStars } from "../GalaxyStars";
import Effects from "../Effects";
import { useColorStore } from "../../zustand/useColorStore";
import { useSpring } from "@react-spring/three";

class SpaceProps {
    primaryColor: string;
    secondaryColor: string;
}

const Space = (props: SpaceProps) => {
    // const { transitionDelay } = useColorStore();

    const galaxyRef = useRef(null);

    const spaceBg = useLoader(TextureLoader, "/textures/crab_nebula.png");

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

    const [galaxyControl, setGalaxyControl] = useControls(() => ({
        Galaxy: folder({
            count: { min: 100, max: 1000000, value: 100000, step: 100 },
            size: { min: 0.001, max: 0.1, value: 0.01, step: 0.001 },
            radius: { min: 0.01, max: 50, value: 31, step: 0.01 },
            branches: { min: 2, max: 20, value: 2, step: 1 },
            spin: { min: -5, max: 5, value: 0.78, step: 0.001 },
            randomness: { min: 0, max: 2, value: 0.09, step: 0.001 },
            randomnessPower: { min: 1, max: 10, value: 3, step: 0.001 },
            // insideColor: { value: "#ff6030", label: "Inside Color" },
            // outsideColor: { value: "#1b3984", label: "Outside Color" },
            insideColor: {
                value: props.secondaryColor,
                label: "Inside Color",
            },
            outsideColor: {
                value: props.secondaryColor,

                label: "Outside Color",
            },
        }),
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

    useEffect(() => {
        setGalaxyControl({
            ...galaxyControl,
            insideColor:
                props.secondaryColor === "orange"
                    ? "#ff3000"
                    : props.secondaryColor === "yellow"
                    ? "orange"
                    : props.secondaryColor === "black"
                    ? "#000000"
                    : props.secondaryColor === "red"
                    ? "#ff00c9"
                    : props.secondaryColor === "purple"
                    ? "#1d0c30"
                    : props.secondaryColor === "green"
                    ? "#001c0c"
                    : props.secondaryColor === "blue"
                    ? "#0053ff"
                    : props.secondaryColor === "grey"
                    ? "#000000"
                    : props.secondaryColor,
            outsideColor:
                props.secondaryColor === "orange"
                    ? "#ff0a00"
                    : props.secondaryColor === "yellow"
                    ? "orange"
                    : props.secondaryColor === "black"
                    ? "#1d1d1d"
                    : props.secondaryColor === "red"
                    ? "#f830eb"
                    : props.secondaryColor === "purple"
                    ? "#291240"
                    : props.secondaryColor === "green"
                    ? "#002e14"
                    : props.secondaryColor === "blue"
                    ? "#0019ff"
                    : props.secondaryColor === "grey"
                    ? "#1a1821"
                    : props.secondaryColor,
        });
    }, [props.secondaryColor]);

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
            <GalaxyStars
                dof={galaxyRef}
                galaxyControl={galaxyControl}
                insideColor={galaxyControl.insideColor}
                outsideColor={galaxyControl.outsideColor}
            />
            <Effects />
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
