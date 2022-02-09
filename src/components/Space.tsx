import { Light, Sphere, GLTFModel } from "@belivvr/aframe-react";
import { useEffect } from "react";
import Clouds from "./Clouds";

export default function Space() {
    useEffect(() => {
        const sceneEl = document.querySelector("a-scene");
        const sceneThree = sceneEl.object3D;

        console.log("sceneThree", sceneThree);
    }, []);

    return (
        <>
            <Light type="ambient" />
            <Light
                type="directional"
                position={{ x: 0, y: 1.6, z: 1.6 }}
                color={"#f94848"}
            />
            <Light
                type="point"
                position={{ x: 6, y: 3, z: -10 }}
                intensity={3}
                distance={100}
            />
            <Light
                type="point"
                position={{ x: -6, y: 3, z: -10 }}
                intensity={3}
                distance={100}
            />
            {/* <Sphere
                scale={{ x: 400, y: 400, z: 400 }}
                material={{
                    shader: "colorize-sky",
                    side: "back",
                    uColor: "#000000",
                }}
            /> */}
            <Sphere
                scale={{ x: 400, y: 400, z: 400 }}
                material={{
                    side: "back",
                    color: "#000000",
                }}
            />
            {/* <Sphere
                scale={{ x: 399, y: 399, z: 399 }}
                material={{
                    transparent: true,
                    depthTest: false,
                    side: "back",
                    src: "clouds.png",
                }}
            /> */}
            <GLTFModel
                src="#ground_grey"
                position={{ x: -5, y: -2, z: -10 }}
                scale={{ x: 6, y: 6, z: 6 }}
            />
            <GLTFModel
                src="#ground_grey"
                position={{ x: -1, y: -0.5, z: -9 }}
                scale={{ x: 3, y: 3, z: 3 }}
            />
            <GLTFModel
                src="#ground_grey"
                position={{ x: 4, y: -2, z: -8 }}
                scale={{ x: 6, y: 6, z: 6 }}
            />
            <Clouds />
        </>
    );
}
