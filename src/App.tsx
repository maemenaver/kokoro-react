import "aframe";
import "./App.css";
import { Scene } from "@belivvr/aframe-react";

function App() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Scene
                inspector={{
                    url: new URL(
                        "http://localhost:3000/aframe-inspector.min.js"
                    ),
                }}
            ></Scene>
        </div>
    );
}

export default App;
