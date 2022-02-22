import { Scene } from "@belivvr/aframe-react";
import { useEffect, useState } from "react";
import ColorizeSea from "./shader/ColorizeSea";
import ColorizeSky from "./shader/ColorizeSky";

export default function AframeProvider({ children }) {
    return (
        <>
            {/* Shaders */}
            <ColorizeSky />
            <ColorizeSea />

            {/* Scene */}
            <Scene vrModeUI={{ enabled: false }}>{children}</Scene>
        </>
    );
}
