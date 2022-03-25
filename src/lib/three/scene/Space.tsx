import react, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import PointModel from "../model/PointModel";
import { TextureLoader } from "three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import { useSpring, animated } from "@react-spring/three";

const Space = (props) => {
    const { scene, gl } = useThree();

    const cameraLeftRef = useRef<THREE.PerspectiveCamera>(null);
    const cameraCenterRef = useRef<THREE.PerspectiveCamera>(null);
    const cameraRightRef = useRef<THREE.PerspectiveCamera>(null);

    const camerasRef = useRef<THREE.Group>(null);
    const orbitRef = useRef<THREE.Group>(null);
    const orbitChildRef = useRef<THREE.Group[]>([]);

    const [cameraRotationXTo, setCameraRotationXTo] = useState<number>(0);
    const [cameraRotationYTo, setCameraRotationYTo] = useState<number>(0);

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

        for (let i = 0; i < 500; i++) {
            console.log(foo());
            const obj = new THREE.Mesh(
                new THREE.SphereGeometry(0.5),
                new THREE.MeshBasicMaterial({
                    color: new THREE.Color("red"),
                })
            );
            const [x, y, z] = foo();
            obj.position.set(x, y, z);

            const orbitChildGroup = new THREE.Group();
            orbitChildGroup.name = "orbitChild";
            orbitChildGroup.position.set(0, 0, 0);
            orbitChildGroup.add(obj);
            orbitChildGroup.userData = {
                orbitSpeed: Math.random() * 3,
            };

            orbitRef.current.add(orbitChildGroup);
            orbitChildRef.current.push(orbitChildGroup);
        }
    }, []);

    useFrame(({ clock }) => {
        orbitRef.current.rotation.y = clock.elapsedTime / 3;
        // cameraCenterRef.current.rotation.x = clock.elapsedTime / 10;
        cameraCenterRef.current.rotation.z = clock.elapsedTime / 10;
        cameraCenterRef.current.position.y = Math.sin(clock.elapsedTime) * 2;

        orbitChildRef.current.forEach((v) => {
            v.rotation.y = (clock.elapsedTime / 9) * v.userData.orbitSpeed;
        });
    });

    const foo = useCallback(() => {
        const distanceOffset = 30;
        const distanceRange = 10;
        const distance = distanceOffset + (Math.random() - 0.5) * distanceRange;

        const angle = Math.random() * Math.PI * 2;

        const x = Math.cos(angle) * distance;
        const y = (Math.random() - 0.5) * 10;
        const z = Math.sin(angle) * distance;

        return [x, y, z];
    }, []);

    return (
        <>
            <ambientLight />
            <PointModel
                path={"/models/saturn.glb"}
                position={[0, 0, 0]}
                scale={[10, 10, 10]}
                numParticles={200000}
            />
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
                </group>
            </group>
            <mesh scale={399}>
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
