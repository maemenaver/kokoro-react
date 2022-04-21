import react, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import PointModel from "../model/PointModel";
import { TextureLoader } from "three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { folder, useControls } from "leva";
import { useSpring, animated } from "@react-spring/three";
import Effects from "../Effects";
import { GalaxyStars } from "../GalaxyStars";
import {
    skyFragmentShader,
    skyVertexShader,
} from "../../shader/SkyShaderMaterial";

class SpaceProps {
    objCount: number;
    primaryColor: string;
    secondaryColor: string;
    therapeuticColor: string;
}

const Space = (props: SpaceProps) => {
    const { scene, gl, size } = useThree();

    const cameraLeftRef = useRef<THREE.PerspectiveCamera>(null);
    const cameraCenterRef = useRef<THREE.PerspectiveCamera>(null);
    const cameraRightRef = useRef<THREE.PerspectiveCamera>(null);

    const camerasRef = useRef<THREE.Group>(null);
    const orbitRef = useRef<THREE.Group>(null);
    const galaxyRef = useRef(null);

    const [cameraRotationXTo, setCameraRotationXTo] = useState<number>(0);
    const [cameraRotationYTo, setCameraRotationYTo] = useState<number>(0);
    const [orbitChildGroup, setOrbitChildGroup] = useState<JSX.Element[]>([]);

    const spaceBg = useLoader(TextureLoader, "/textures/crab_nebula.png");
    useControls("camera", {
        position: {
            value: {
                x: 0,
                y: 0,
                z: -30,
            },
            onChange: (v) => {
                console.log("position", v);
                const { x, y, z } = v;
                camerasRef.current.position.set(x, y, z);
            },
        },
        rotationX: {
            value: 0,
            min: -Math.PI / 2,
            max: Math.PI / 2,
            step: 0.1,
            // step: Math.PI / 2,
            onChange: (v) => {
                setCameraRotationXTo(v);
            },
        },
        rotationY: {
            value: 0,
            min: -Math.PI / 2,
            max: Math.PI / 2,
            step: 0.1,
            // step: Math.PI / 2,
            onChange: (v) => {
                setCameraRotationYTo(v);
            },
        },
    });

    const saturnControl = useControls("Saturn", {
        color1: {
            value:
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
            label: "Color1",
        },
        color2: {
            value:
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
            label: "Color2",
        },
    });

    const galaxyControl = useControls({
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
                value:
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
                label: "Inside Color",
            },
            outsideColor: {
                value:
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
                label: "Outside Color",
            },
        }),
    });

    const { cameraRotationX } = useSpring({
        cameraRotationX: cameraRotationXTo,
        onChange: () => {
            cameraCenterRef.current.rotation.x = cameraRotationX.get();
        },
    });

    const { cameraRotationY } = useSpring({
        cameraRotationY: cameraRotationYTo,
        onChange: () => {
            cameraCenterRef.current.rotation.y =
                Math.PI - cameraRotationY.get();
        },
    });

    useEffect(() => {
        const gridHelper = new THREE.GridHelper(50, 50);
        const axesHelper = new THREE.AxesHelper(5);
        // scene.add(gridHelper);
        // scene.add(axesHelper);

        console.log(props);

        const orbitChildGroups = [];
        for (let i = 0; i < props.objCount; i++) {
            const [x, y, z] = foo();
            let path: string;
            let numParticles: number;
            switch (Math.floor(Math.random() * 10)) {
                case 0:
                    path = "/models/cherry.glb";
                    numParticles = 1500;
                    break;
                case 1:
                    path = "/models/skull.glb";
                    numParticles = 7500;
                    break;
                case 2:
                    path = "/models/horse.glb";
                    numParticles = 3000;
                    break;
                case 3:
                    path = "/models/elephant.glb";
                    numParticles = 3000;
                    break;
                case 4:
                    path = "/models/marble_bust.glb";
                    numParticles = 1500;
                    break;
                case 5:
                    path = "/models/megaphone.glb";
                    numParticles = 2000;
                    break;
                case 6:
                    path = "/models/sofa.glb";
                    numParticles = 3000;
                    break;
                case 7:
                    path = "/models/ukulele.glb";
                    numParticles = 1000;
                    break;
                case 8:
                    path = "/models/aircraft.glb";
                    numParticles = 2000;
                    break;
                case 9:
                    path = "/models/mushroom.glb";
                    numParticles = 1500;
                    break;
            }
            orbitChildGroups.push(
                <group
                    key={`orbitChildGroup_${i}`}
                    name={"orbitChildGroup"}
                    position={[0, 0, 0]}
                    userData={{
                        orbitSpeed: Math.random() * 1.2,
                    }}
                >
                    <PointModel
                        path={path}
                        numParticles={numParticles}
                        position={[x, y, z]}
                        scale={[5, 5, 5]}
                        color1={
                            props.therapeuticColor === "orange"
                                ? "#ff0a00"
                                : props.therapeuticColor === "yellow"
                                ? "orange"
                                : props.therapeuticColor === "black"
                                ? "#1d1d1d"
                                : props.therapeuticColor === "red"
                                ? "#b4274d"
                                : props.therapeuticColor === "purple"
                                ? "#231462"
                                : props.therapeuticColor === "green"
                                ? "#2c8624"
                                : props.therapeuticColor === "blue"
                                ? "#0019ff"
                                : props.therapeuticColor === "grey"
                                ? "#1a1821"
                                : props.therapeuticColor
                        }
                        color2={
                            props.therapeuticColor === "orange"
                                ? "#ff3000"
                                : props.therapeuticColor === "yellow"
                                ? "orange"
                                : props.therapeuticColor === "black"
                                ? "#000000"
                                : props.therapeuticColor === "red"
                                ? "#0b0b0d"
                                : props.therapeuticColor === "purple"
                                ? "#10021d"
                                : props.therapeuticColor === "green"
                                ? "#022706"
                                : props.therapeuticColor === "blue"
                                ? "#0053ff"
                                : props.therapeuticColor === "grey"
                                ? "#000000"
                                : props.therapeuticColor
                        }
                    ></PointModel>
                </group>
            );
        }

        setOrbitChildGroup(orbitChildGroups);
    }, []);

    useFrame(({ clock }) => {
        orbitRef.current.rotation.y = clock.elapsedTime / 20;
        // cameraCenterRef.current.rotation.x = clock.elapsedTime / 10;
        cameraCenterRef.current.rotation.z = clock.elapsedTime / 20;
        cameraCenterRef.current.position.y =
            Math.sin(clock.elapsedTime / 5) * 2;

        orbitRef.current.children.forEach((group) => {
            if (group.name !== "orbitChildGroup") return;
            group.rotation.y =
                (clock.elapsedTime / 9) * group.userData.orbitSpeed;
        });
    });

    const foo = useCallback(() => {
        const distanceOffset = 30;
        const distanceRange = 10;
        const distance = distanceOffset + (Math.random() - 0.5) * distanceRange;

        const angle = Math.random() * Math.PI * 2;

        const x = Math.cos(angle) * distance;
        const y = (Math.random() - 0.5) * 20;
        const z = Math.sin(angle) * distance;

        return [x, y, z];
    }, []);

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
            <group ref={orbitRef}>
                <GalaxyStars dof={galaxyRef} galaxyControl={galaxyControl} />
                <group ref={camerasRef} position={[0, 0, -30]}>
                    <PerspectiveCamera
                        position={[0, 0, 0]}
                        rotation={[0, Math.PI + Math.PI / 2, 0]}
                        fov={58.5}
                        near={0.1}
                        far={20000}
                        ref={cameraLeftRef}
                    />
                    <PerspectiveCamera
                        makeDefault
                        position={[0, 0, 0]}
                        rotation={[0, Math.PI, 0]}
                        fov={58.5}
                        near={0.1}
                        far={20000}
                        ref={cameraCenterRef}
                    />
                    <PerspectiveCamera
                        position={[0, 0, 0]}
                        rotation={[0, Math.PI - Math.PI / 2, 0]}
                        fov={58.5}
                        near={0.1}
                        far={20000}
                        ref={cameraRightRef}
                    />
                </group>
                {orbitChildGroup.length > 0 && orbitChildGroup}
            </group>
            {/* <Effects /> */}
            {/* <mesh scale={400}>
                <sphereGeometry attach="geometry" />
                <meshBasicMaterial
                    attach="material"
                    side={THREE.BackSide}
                    map={spaceBg}
                />
            </mesh> */}
            <mesh scale={40}>
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
            </mesh>
        </>
    );
};

export default Space;
