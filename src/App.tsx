import "aframe";
import "./App.css";
import { Camera, Scene } from "@belivvr/aframe-react";
import SkyBox from "./components/SkyBox";
import AframeProvider from "./lib/aframe/AframeProvider";

function App() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <AframeProvider>
                <Scene
                    inspector={{
                        url: new URL(
                            "http://localhost:3000/aframe-inspector.min.js"
                        ),
                    }}
                >
                    <Camera />
                    <SkyBox />
                </Scene>
            </AframeProvider>
        </div>
    );
}

export default App;
