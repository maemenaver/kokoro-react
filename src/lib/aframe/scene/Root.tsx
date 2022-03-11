import { Entity, Light, Mixin, Sky, Sphere } from "@belivvr/aframe-react";
import React, { useEffect } from "react";

export default function Root() {
    return (
        <>
            <Sky src={"textures/crab_nebula.png"} />
            <Light type="ambient" intensity={0.5} />
            <Sphere
                radius={5}
                position={{
                    x: 0,
                    y: 2,
                    z: -10,
                }}
                animation={{
                    easing: "linear",
                    property: "rotation",
                    loop: 3600,
                    from: "0 0 0",
                    to: "0 360 0",
                    dur: 50000,
                }}
                material={{
                    side: "double",
                    src: "textures/1_earth_8k.jpeg",
                }}
            />
        </>
    );
}
