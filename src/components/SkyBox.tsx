import { GLTFModel, Light, Sphere } from "@belivvr/aframe-react";

export default function SkyBox() {
    return (
        <>
            <Light type="ambient" />
            <Sphere
                scale={{ x: 400, y: 400, z: 400 }}
                material={{
                    shader: "colorize-sky",
                    side: "back",
                    uColor: "#3366CC",
                }}
            />
            <Sphere
                scale={{ x: 399, y: 399, z: 399 }}
                material={{
                    transparent: true,
                    depthTest: false,
                    side: "back",
                    src: "clouds.png",
                }}
                render-order={{
                    order: 2,
                }}
            />
            <GLTFModel
                src="#vintage_pocket_watch"
                position={{ x: 4, y: 4, z: -12 }}
                scale={{ x: 46, y: 46, z: 46 }}
                model-material={{
                    opacity: 0.5,
                    transparent: true,
                    needsUpdate: true,
                }}
            />
        </>
    );
}
