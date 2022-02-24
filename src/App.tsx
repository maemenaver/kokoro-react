import "aframe";
import "./App.css";
import { AssetItem, Assets, Camera, Image } from "@belivvr/aframe-react";
import SkyBox from "./components/SkyBox";
import AframeProvider from "./lib/aframe/AframeProvider";
import Space from "./components/Space";
import SeaBox from "./components/SeaBox";
import { useLocation } from "wouter";

function App() {
    const [location] = useLocation();

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <AframeProvider>
                <Assets>
                    <AssetItem
                        id="ground_grey"
                        src="models/ground_grey/ground_grey_1k.gltf"
                    />
                    <AssetItem
                        id="marble_bust_01"
                        src="models/marble_bust_01_2k/marble_bust_01_2k.gltf"
                    />
                    <AssetItem
                        id="vintage_pocket_watch"
                        src="models/vintage_pocket_watch_2k/vintage_pocket_watch_2k.gltf"
                    />
                    <AssetItem
                        id="Balloon_Cluster_v1"
                        src="models/Balloon_Cluster_v1/Balloon_Cluster_v1.gltf"
                    />
                    <Image id="smoke" src="textures/smoke.png" />
                </Assets>
                <Camera />
                {location === "/sea" ? (
                    <SeaBox />
                ) : location === "/sky" ? (
                    <SkyBox />
                ) : (
                    <Space />
                )}
            </AframeProvider>
        </div>
    );
}

export default App;
