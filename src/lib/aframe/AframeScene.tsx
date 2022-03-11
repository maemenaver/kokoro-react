import { Scene } from "@belivvr/aframe-react";
import AframeAssets from "./AframeAssets";

export default function AframeScene({ children }) {
    return (
        <>
            <Scene
                vrModeUI={{ enabled: false }}
                render-order="bg, fg"
                renderer={{
                    logarithmicDepthBuffer: true,
                }}
                embedded
            >
                <AframeAssets />
                {children}
            </Scene>
        </>
    );
}
