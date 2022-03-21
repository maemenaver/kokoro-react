import react, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import SaturnModel from "../model/SaturnModel";
import { TextureLoader } from "three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import { useSpring, animated } from "@react-spring/three";
import PointModel from "../PointModel";

const Space = (props) => {
    const { scene, gl } = useThree();

    const cameraRef = useRef<any>(null);

    const [cameraRotationYTo, setCameraRotationYTo] = useState<number>(0);
    const [saturn, setSaturn] = useState<PointModel>(null);

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
            console.log(cameraRotationY.get());
            cameraRef.current.rotation.y = Math.PI - cameraRotationY.get();
        },
    });

    useEffect(() => {
        const gridHelper = new THREE.GridHelper(20, 20);
        const axesHelper = new THREE.AxesHelper(5);
        scene.add(gridHelper);
        scene.add(axesHelper);

        // setSaturn(
        //     new PointModel({
        //         file: "./models/saturn.glb",
        //         scene: scene,
        //         color1: "red",
        //         color2: "yellow",
        //         placeOnLoad: true,
        //     })
        // );
    }, []);

    useFrame(({ clock }) => {
        if (saturn?.particlesMaterial?.uniforms) {
            saturn.particlesMaterial.uniforms.uTime.value =
                clock.getElapsedTime();
        }
    });

    // useEffect(() => {
    //     scene.background = spaceBg;
    //     scene.environment = spaceBg;
    //     scene.environment.encoding = THREE.sRGBEncoding;
    // }, [spaceBg]);

    return (
        <>
            <PerspectiveCamera
                makeDefault
                position={[0, 1, 0]}
                rotation={[0, 0, 0]}
                fov={58.5}
                near={0.1}
                far={20000}
                ref={cameraRef}
            />
            <ambientLight />
            <SaturnModel position={[3, 1, 3]} />
            <mesh scale={399}>
                <sphereGeometry attach="geometry" />
                <meshBasicMaterial
                    attach="material"
                    side={THREE.BackSide}
                    map={spaceBg}
                />
            </mesh>
            {/* <mesh>
                <boxGeometry attach="geometry" args={[1, 1, 1]} />
                <meshStandardMaterial
                    attach="material"
                    side={THREE.DoubleSide}
                />
            </mesh> */}
            {/* <OrbitControls
                target={new THREE.Vector3(0.01, 1, 0)}
                rotation={[120, 0, 0]}
            /> */}
        </>
    );
};

export default Space;
