import "aframe";
import { Camera } from "@belivvr/aframe-react";
import SkyBox from "./components/SkyBox";
import AframeProvider from "./lib/aframe/AframeProvider";
import Space from "./components/Space";
import SeaBox from "./components/SeaBox";
import { useLocation } from "wouter";
import Text from "./components/ZustandExample/Text";
import CharacterCounter from "./components/ZustandExample/CharacterCounter";
import TodoList from "./components/ZustandExample/Todo/TodoList";
import CurrentUserInfo from "./components/ZustandExample/Todo/CurrentUserInfo";
import Scratches from "./components/ZustandExample/Scratches";

function App() {
    const [location] = useLocation();

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            {/* <Text />
            <CharacterCounter />
            <TodoList />
            <CurrentUserInfo />
            <Scratches /> */}
            <AframeProvider>
                <Camera />
                {location === "/sea" ? (
                    <SeaBox />
                ) : location === "/sky" ? (
                    <SkyBox />
                ) : location === "/space" ? (
                    <Space />
                ) : (
                    <Space />
                )}
            </AframeProvider>
        </div>
    );
}

export default App;
