import "aframe";
import React, { useEffect } from "react";

export default function Clouds() {
    useEffect(() => {
        const sceneEl = document.querySelector("a-scene");
        for (let p = 0; p < 20; p++) {
            let cloud = document.createElement("a-entity");
            cloud.setAttribute("geometry", {
                primitive: "plane",
                width: 10,
                height: 10,
            });
            cloud.setAttribute("material", {
                src: "#smoke",
                transparent: true,
                depthTest: false,
                depthWrite: true,
                // alphaTest: 0.2
                opacity: 0.55,
            });
            cloud.setAttribute("position", {
                x: Math.random() * 20 - 10,
                y: -1.5,
                z: Math.random() * 10 - 12,
            });
            cloud.setAttribute("rotation", {
                x: 1.16,
                //   y: -0.12,
                z: Math.random() * 360,
            });
            // cloud.object3D.rotation.set(1.16, -0.12, Math.random() * 360);
            console.log(cloud.object3D);
            sceneEl.appendChild(cloud);
        }
    }, []);

    return <></>;
}
