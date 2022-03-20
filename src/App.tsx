import "aframe";
import * as THREE from "three";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useLocation } from "wouter";
import { Camera } from "@belivvr/aframe-react";
import AframeProvider from "./lib/aframe/AframeProvider";
import Text from "./components/ZustandExample/Text";
import CharacterCounter from "./components/ZustandExample/CharacterCounter";
import TodoList from "./components/ZustandExample/Todo/TodoList";
import CurrentUserInfo from "./components/ZustandExample/Todo/CurrentUserInfo";
import Scratches from "./components/ZustandExample/Scratches";
import SeaBox from "./lib/aframe/scene/SeaBox";
import SkyBox from "./lib/aframe/scene/SkyBox";
// import Space from "./lib/aframe/scene/Space";
import Space from "./lib/three/scene/Space";
import Root from "./lib/aframe/scene/Root";
import { Intro } from "./components/Intro";

function App() {
    const [location] = useLocation();

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            {/* <Text />
            <CharacterCounter />
            <TodoList />
            <CurrentUserInfo />
            <Scratches /> */}
            {location === "/space" ? (
                <Suspense fallback={null}>
                    <Canvas
                        gl={{
                            logarithmicDepthBuffer: true,
                        }}
                    >
                        <Space />
                    </Canvas>
                </Suspense>
            ) : location === "/" ? (
                <Intro />
            ) : (
                <AframeProvider>
                    <Camera />
                    {location === "/sea" ? (
                        <SeaBox />
                    ) : location === "/sky" ? (
                        <SkyBox />
                    ) : location === "/space" ? (
                        <Space />
                    ) : (
                        <Root />
                    )}
                </AframeProvider>
            )}
        </div>
    );
}

export default App;
