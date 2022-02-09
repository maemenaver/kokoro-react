import "aframe";
import "./App.css";
import { AssetItem, Assets, Camera, Image } from "@belivvr/aframe-react";
import SkyBox from "./components/SkyBox";
import AframeProvider from "./lib/aframe/AframeProvider";
import Space from "./components/Space";

function App() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <AframeProvider>
                <Assets>
                    <AssetItem
                        id="ground_grey"
                        src="models/ground_grey/ground_grey_1k.gltf"
                    />
                    <Image id="smoke" src="textures/smoke.png" />
                </Assets>
                <Camera />
                <Space />
            </AframeProvider>
        </div>
    );
}

export default App;
