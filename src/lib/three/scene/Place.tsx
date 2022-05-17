import react, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { CameraShake, PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import { useSpring } from "@react-spring/three";
import { OrbitChildGroup } from "../model/OrbitChildGroup";
import Space from "./Space";
import Ether from "./Ether";
import Sea from "./Sea";
import Bubble from "../model/Bubble";
import PostProcessing from "../effects/PostProcessing";
import {
    skyFragmentShader,
    skyVertexShader,
} from "../../shader/SkyShaderMaterial";
import { useObjectStore } from "../../zustand/useObjectStore";

class PlaceProps {}

const Place = (props: PlaceProps) => {
    const set = useThree((state) => state.set);

    // const { addSelectedLight, removeSelectedLight } = useBloomStore();

    const orbitChild = useRef<JSX.Element[]>(
        new Array(Object.keys(useObjectStore.getState().orbitObjects).length)
            .fill(0)
            .map((v, i) => {
                const distanceOffset = 30;
                const distanceRange = 10;
                const distance =
                    distanceOffset + (Math.random() - 0.5) * distanceRange;

                const angle = Math.random() * Math.PI * 2;

                const x = Math.cos(angle) * distance;
                const y = (Math.random() - 0.5) * 20;
                const z = Math.sin(angle) * distance;

                const key = Object.keys(useObjectStore.getState().orbitObjects)[
                    i %
                        Object.keys(useObjectStore.getState().orbitObjects)
                            .length
                ];
                const { path, numParticles, opacity } =
                    useObjectStore.getState().orbitObjects[key];

                if (opacity > 0.01) {
                    return (
                        <group name={`${key}_group`}>
                            <mesh
                                key={`mesh_${i}`}
                                name="visualOrbit"
                                position={[0, y, 0]}
                                rotation={[Math.PI / 2, 0, 0]}
                            >
                                <torusGeometry
                                    key={`geometry_${i}`}
                                    args={[distance, 0.05, 8, 36]}
                                />
                                <meshStandardMaterial
                                    key={`material_${i}`}
                                    transparent
                                    opacity={1}
                                    side={THREE.FrontSide}
                                    blending={THREE.AdditiveBlending}
                                    depthTest={true}
                                    depthWrite={false}
                                />
                            </mesh>

                            <OrbitChildGroup
                                path={path}
                                objName={`${key}`}
                                key={i}
                                numParticles={numParticles}
                                position={new THREE.Vector3(x, y, z)}
                                colorType={"therapeuticColor"}
                            />
                        </group>
                    );
                }
            })
    );

    const ambientLightRef = useRef<THREE.Light>();
    const cameraCenterRef = useRef<THREE.PerspectiveCamera>();
    const etherBackgroundRef = useRef<THREE.Mesh>();

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
            cameraCenterRef.current.rotation.y = cameraRotationY.get();
        },
    });

    useEffect(() => {
        useObjectStore.setState((state) => ({
            etherBackground: etherBackgroundRef.current,
            orbitGroup: orbitRef.current,
        }));
    }, []);

    useFrame(({ clock }) => {
        orbitRef.current.rotation.y = clock.elapsedTime / 20;
        // cameraCenterRef.current.rotation.x = clock.elapsedTime / 10;
        // cameraCenterRef.current.rotation.z = clock.elapsedTime / 20;
        groupRef.current.position.y = Math.sin(clock.elapsedTime / 5) * 1;
        // groupRef.current.rotation.y = clock.elapsedTime / 20;

        orbitRef.current.children.forEach((group) => {
            if (group.name !== "orbitChildGroup") return;
            group.rotation.y =
                (clock.elapsedTime / 9) * group.userData.orbitSpeed;
        });

        // useObjectStore.setState((state) => ({ orbitGroup: orbitRef.current }));
        set({ camera: cameraCenterRef.current });
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
            <group name={"backgroundGroup"}>
                <mesh
                    ref={etherBackgroundRef}
                    scale={[300, 170, 1]}
                    position={[0, 0, -100]}
                >
                    <planeGeometry attach="geometry" />
                    <shaderMaterial
                        attach="material"
                        vertexShader={skyVertexShader}
                        fragmentShader={skyFragmentShader}
                        side={THREE.FrontSide}
                        transparent={true}
                        uniforms={{
                            uColor: {
                                value: new THREE.Color("#3366CC"),
                            },
                            uOpacity: {
                                value: 1,
                            },
                        }}
                    />
                </mesh>
            </group>
            <group name={"mainGroup"} ref={groupRef} position={[0, 0, -30]}>
                <group name={"orbitGroup"} ref={orbitRef}>
                    {orbitChild.current}
                </group>

                {/* {location === "/space" && ( */}
                <Space />
                {/* )}
                {location === "/ether" && ( */}
                <Ether />
                {/* )}
                {location === "/sea" && (
                    <> */}
                <Bubble numParticles={2000} />
                <Sea />
                {/* </>
                )} */}
            </group>
            <PostProcessing />
            {/* {location !== "/ether" && <PostProcessing />} */}
        </>
    );
};

export default Place;
