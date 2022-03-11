import { Assets, Entity, Light, Sphere } from "@belivvr/aframe-react";

export default function SeaBox() {
    return (
        <>
            <Light type="ambient" />
            <Sphere
                scale={{ x: 400, y: 400, z: 400 }}
                material={{
                    shader: "colorize-sea",
                    side: "back",
                    uColor: "#3366CC",
                }}
            />
            <Sphere
                scale={{ x: 399, y: 399, z: 399 }}
                material={{
                    color: "#3366CC",
                    side: "double",
                    transparent: true,
                    opacity: 0.5,
                    blending: "additive",
                }}
            />
            {/* <Sphere
                position={{ x: 0, y: 1.5, z: 0 }}
                scale={{ x: 10, y: 10, z: 10 }}
                material={{
                    shader: "colorize-sea",
                    side: "back",
                    uColor: "#3366CC",
                    transparent: true,
                    opacity: 0.1,
                }}
            />
            <Sphere
                scale={{ x: 400, y: 400, z: 400 }}
                material={{
                    color: "#ff0000",
                    side: "double",
                    transparent: true,
                    opacity: 1,
                }}
            /> */}
            <Entity point />
        </>
    );
}
