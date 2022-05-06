import react, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
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

class PlaceProps {
    objCount: number;
    primaryColor: string;
    secondaryColor: string;
    therapeuticColor: string;
}

const Place = (props: PlaceProps) => {
    const [location] = useLocation();
    const scene = useThree((state) => state.scene);

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
                    colorType={"therapeuticColor"}
                />
            );
        })
    );

    const cameraLeftRef = useRef<THREE.PerspectiveCamera>(null);
    const cameraCenterRef = useRef<THREE.PerspectiveCamera>(null);
    const cameraRightRef = useRef<THREE.PerspectiveCamera>(null);

    const camerasRef = useRef<THREE.Group>(null);
    const orbitRef = useRef<THREE.Group>(null);

    const [cameraRotationXTo, setCameraRotationXTo] = useState<number>(0);
    const [cameraRotationYTo, setCameraRotationYTo] = useState<number>(0);

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
        if (location === "/sea") {
            scene.fog = new THREE.Fog(206145, 0.1, 70);
            scene.background = new THREE.Color("#203455");
        }
    }, []);

    useFrame(({ clock }) => {
        useUniformsStore.getState().setUTime(clock.getElapsedTime());

        orbitRef.current.rotation.y = clock.elapsedTime / 20;
        // cameraCenterRef.current.rotation.x = clock.elapsedTime / 10;
        // cameraCenterRef.current.rotation.z = clock.elapsedTime / 20;
        camerasRef.current.position.y = Math.sin(clock.elapsedTime / 5) * 2;

        orbitRef.current.children.forEach((group) => {
            if (group.name !== "orbitChildGroup") return;
            group.rotation.y =
                (clock.elapsedTime / 9) * group.userData.orbitSpeed;
        });
    });

    return (
        <>
            <group ref={orbitRef}>
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
                    {location === "/sea" && <GodRay />}
                </group>

                {orbitChild.current}
            </group>

            {location === "/space" && (
                <>
                    <Effects />
                    <Space
                        primaryColor={props.primaryColor}
                        secondaryColor={props.secondaryColor}
                    />
                </>
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
            {/* {location === "/sea" && <Shape />} */}
        </>
    );
};

export default Place;
