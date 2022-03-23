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

    const [cameraRotationYTo, setCameraRotationYTo] = useState<number>(0);

    const spaceBg = useLoader(TextureLoader, "/textures/crab_nebula.png");
    const controlUi = useControls({
        cameraRotationY: {
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
        scene.add(gridHelper);
        scene.add(axesHelper);
    }, []);

    // useFrame(({ clock }) => {
    //     orbitRef.current.rotation.y = clock.elapsedTime / 3;
    //     // cameraCenterRef.current.rotation.x = clock.elapsedTime / 10;
    //     cameraCenterRef.current.rotation.z = clock.elapsedTime / 10;
    //     cameraCenterRef.current.position.y = Math.sin(clock.elapsedTime) * 2;
    // });

    const foo = useCallback(() => {}, []);

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
