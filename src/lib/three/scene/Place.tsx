import react, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { CameraShake, PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import { useSpring, animated } from "@react-spring/three";
import Effects from "../Effects";
import { OrbitChildGroup } from "../model/OrbitChildGroup";
import { useLocation } from "wouter";
import Space from "./Space";
import Ether from "./Ether";
import Sea from "./Sea";
import Bubble from "../model/Bubble";
import { AquariumCastle } from "../model/AquariumCastle";
import { useUniformsStore } from "../../zustand/useUniformsStore";
import { GodRay } from "../model/GodRay";
import { Select, Selection } from "@react-three/postprocessing";
import { useBloomStore } from "../../zustand/useBloomStore";
import { useCameraStore } from "../../zustand/useCameraStore";
import BackgroundEffects from "../effects/backgroundEffects";

class PlaceProps {
    objCount: number;
    primaryColor: string;
    secondaryColor: string;
    therapeuticColor: string;
}

const Place = (props: PlaceProps) => {
    const [location] = useLocation();
    // const gl = useThree((state) => state.gl);

    // const { addSelectedLight, removeSelectedLight } = useBloomStore();

    const orbitChild = useRef<JSX.Element[]>(
        new Array(props.objCount).fill(0).map((v, i) => {
            const distanceOffset = 30;
            const distanceRange = 10;
            const distance =
                distanceOffset + (Math.random() - 0.5) * distanceRange;

            const angle = Math.random() * Math.PI * 2;

            const x = Math.cos(angle) * distance;
            const y = (Math.random() - 0.5) * 20;
            const z = Math.sin(angle) * distance;

            let path = "/models/cherry.glb";
            let numParticles = 1500;

            switch (i) {
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

            return (
                <OrbitChildGroup
                    path={path}
                    key={i}
                    numParticles={numParticles}
                    position={new THREE.Vector3(x, y, z)}
                    therapeuticColor={props.therapeuticColor}
                />
            );
        })
    );

    const ambientLightRef = useRef<THREE.Light>();

    const cameraCenterRef = useRef<THREE.PerspectiveCamera>();

    const groupRef = useRef<THREE.Group>();
    const orbitRef = useRef<THREE.Group>();

    const [cameraRotationXTo, setCameraRotationXTo] = useState<number>(0);
    const [cameraRotationYTo, setCameraRotationYTo] = useState<number>(0);

    useControls("camera", {
        position: {
            value: {
                x: 0,
                y: 0,
                z: 0,
            },
            step: 1,
            onChange: (v) => {
                console.log("position", v);
                const { x, y, z } = v;
                cameraCenterRef.current.position.set(x, y, z);
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

    // useEffect(() => {
    // scene.fog = new THREE.Fog(206145, 0.1, 70);
    // scene.background = new THREE.Color("#072b4a");
    // gl.setClearColor("#000000", 0);
    // gl.setClearAlpha(0);
    // addSelectedLight(ambientLightRef);
    // return () => removeSelectedLight(ambientLightRef);
    // }, []);

    useFrame(({ clock }) => {
        useUniformsStore.getState().setUTime(clock.getElapsedTime());

        orbitRef.current.rotation.y = clock.elapsedTime / 20;
        // cameraCenterRef.current.rotation.x = clock.elapsedTime / 10;
        // cameraCenterRef.current.rotation.z = clock.elapsedTime / 20;
        groupRef.current.position.y = Math.sin(clock.elapsedTime / 5) * 1;

        orbitRef.current.children.forEach((group) => {
            if (group.name !== "orbitChildGroup") return;
            group.rotation.y =
                (clock.elapsedTime / 9) * group.userData.orbitSpeed;
        });
    });

    return (
        <>
            <ambientLight ref={ambientLightRef} />
            <PerspectiveCamera
                makeDefault
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
                fov={58.5}
                near={0.1}
                far={500}
                ref={cameraCenterRef}
            />
            <CameraShake />
            {/* <BackgroundEffects /> */}
            {/* <Effects /> */}

            <group ref={groupRef} position={[0, 0, -30]}>
                <group ref={orbitRef}>{orbitChild.current}</group>

                {location === "/space" && (
                    <Space
                        primaryColor={props.primaryColor}
                        secondaryColor={props.secondaryColor}
                    />
                )}
                {location === "/ether" && (
                    <Ether
                        primaryColor={props.primaryColor}
                        secondaryColor={props.secondaryColor}
                    />
                )}
                {location === "/sea" && (
                    <>
                        <Bubble numParticles={2000} />
                        <Sea
                            primaryColor={props.primaryColor}
                            secondaryColor={props.secondaryColor}
                        />
                    </>
                )}
            </group>
        </>
    );
};

export default Place;
