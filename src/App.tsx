import "aframe";
import { Camera } from "@belivvr/aframe-react";
import AframeProvider from "./lib/aframe/AframeProvider";
import { useLocation } from "wouter";
import Text from "./components/ZustandExample/Text";
import CharacterCounter from "./components/ZustandExample/CharacterCounter";
import TodoList from "./components/ZustandExample/Todo/TodoList";
import CurrentUserInfo from "./components/ZustandExample/Todo/CurrentUserInfo";
import Scratches from "./components/ZustandExample/Scratches";
import SeaBox from "./lib/aframe/scene/SeaBox";
import SkyBox from "./lib/aframe/scene/SkyBox";
// import Space from "./lib/aframe/scene/Space";
import Root from "./lib/aframe/scene/Root";
import { Intro } from "./components/Intro";
import { Space } from "./lib/three/scene/Space";

function App() {
    const [location] = useLocation();

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            {/* <Text />
            <CharacterCounter />
            <TodoList />
            <CurrentUserInfo />
            <Scratches /> */}
            {location === "/" && <Intro />}
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
        </div>
    );
}

export default App;
