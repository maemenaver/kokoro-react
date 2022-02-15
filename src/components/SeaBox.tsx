import { Assets, Light, Sphere } from "@belivvr/aframe-react";

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
        </>
    );
}
