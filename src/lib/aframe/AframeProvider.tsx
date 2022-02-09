import { Scene } from "@belivvr/aframe-react";
import { useEffect, useState } from "react";
import ColorizeSky from "./shader/ColorizeSky";

export default function AframeProvider({ children }) {
    return (
        <>
            {/* Shaders */}
            <ColorizeSky />

            {/* Scene */}
            <Scene>{children}</Scene>
        </>
    );
}
