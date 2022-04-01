import react, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import PointModel from "../model/PointModel";
import { TextureLoader } from "three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import { useSpring, animated } from "@react-spring/three";
import Effects from "../Effects";
import { GalaxyStars } from "../GalaxyStars";

class SpaceProps {
    objCount: number;
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

        const orbitChildGroups = [];
        for (let i = 0; i < props.objCount; i++) {
            const [x, y, z] = foo();
            let path: string;
            let numParticles: number;
            switch (Math.floor(Math.random() * 2)) {
                case 0:
                    path = "/models/horse.glb";
                    numParticles = 500;
                    break;
                case 1:
                    path = "/models/skull.glb";
                    numParticles = 1000;
                    break;
            }
            orbitChildGroups.push(
                <group
                    key={`orbitChildGroup_${i}`}
                    name={"orbitChildGroup"}
                    position={[0, 0, 0]}
                    userData={{
                        orbitSpeed: Math.random() * 3,
                    }}
                >
                    <PointModel
                        path={path}
                        numParticles={numParticles}
                        position={[x, y, z]}
                        color1={"blue"}
                        color2={"purple"}
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
        const y = (Math.random() - 0.5) * 10;
        const z = Math.sin(angle) * distance;

        return [x, y, z];
    }, []);

    return (
        <>
            {/* <ambientLight /> */}
            <PointModel
                path={"/models/saturn.glb"}
                position={[0, 0, 0]}
                scale={[10, 10, 10]}
                numParticles={200000}
                color1={"red"}
                color2={"yellow"}
            />
            <GalaxyStars dof={galaxyRef} />
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
                {orbitChildGroup.length > 0 && orbitChildGroup}
            </group>
            <Effects />
            {/* <mesh scale={399}>
                <sphereGeometry attach="geometry" />
                <meshStandardMaterial
                    attach="material"
                    side={THREE.BackSide}
                    transparent
                    opacity={0.2}
                    color={"green"}
                />
            </mesh> */}
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
