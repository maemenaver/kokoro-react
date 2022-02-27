import { Scene } from "@belivvr/aframe-react";
import RegisterComponent from "./component";
import ColorizeSea from "./shader/ColorizeSea";
import ColorizeSky from "./shader/ColorizeSky";

export default function AframeProvider({ children }) {
    return (
        <>
            <RegisterComponent />

            {/* Shaders */}
            <ColorizeSky />
            <ColorizeSea />

            {/* Scene */}
            <Scene
                vrModeUI={{ enabled: false }}
                render-order="bg, fg"
                renderer={{
                    logarithmicDepthBuffer: true,
                }}
            >
                {children}
            </Scene>
        </>
    );
}
