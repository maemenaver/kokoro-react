import * as THREE from "three";
import { Sphere } from "@belivvr/aframe-react";

export default function SkyBox() {
    return (
        <>
            <Sphere
                scale={{ x: 400, y: 400, z: 400 }}
                material={{
                    shader: "colorize-sky",
                    side: "back",
                    uColor: "#3366CC",
                }}
            />
        </>
    );
}
