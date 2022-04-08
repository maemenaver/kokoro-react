import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useLocation } from "wouter";
import { Camera } from "@belivvr/aframe-react";
import { useQuery } from "@apollo/client";
import { getBoard, subBoard } from "../lib/apollo/gql";
import { Intro } from "../components/Intro";
import { Music } from "../components/Music";
import AframeProvider from "../lib/aframe/AframeProvider";
import Root from "../lib/aframe/scene/Root";
import SeaBox from "../lib/aframe/scene/SeaBox";
import SkyBox from "../lib/aframe/scene/SkyBox";
import { Color } from "../components/Color";
import { Shape } from "../components/Shape";
import Space from "../lib/three/scene/Space";
import colorTranslate from "../lib/colorTranslate";

function Main() {
    const [location] = useLocation();

    const [primaryColor, setPrimaryColor] = useState<string>(null);
    const [secondaryColor, setSecondaryColor] = useState<string>(null);
    const [therapeuticColor, setTherapeuticColor] = useState<string>(null);

    const board = useQuery(getBoard, {
        onCompleted: (data) => {
            console.log(data);
            setPrimaryColor(
                colorTranslate(data["getBoard"][0]["primaryColor"])
            );
            setSecondaryColor(
                colorTranslate(data["getBoard"][0]["secondaryColor"])
            );
            setTherapeuticColor(
                colorTranslate(data["getBoard"][0]["therapeuticColor"])
            );
        },
    });

    useEffect(() => {
        const unsubBoard = board.subscribeToMore({
            document: subBoard,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                console.log(subscriptionData);
                setPrimaryColor(
                    colorTranslate(
                        subscriptionData.data["subBoard"]["primaryColor"]
                    )
                );
                setSecondaryColor(
                    colorTranslate(
                        subscriptionData.data["subBoard"]["secondaryColor"]
                    )
                );
                setTherapeuticColor(
                    colorTranslate(
                        subscriptionData.data["subBoard"]["therapeuticColor"]
                    )
                );
            },
        });

        return () => {
            if (unsubBoard) unsubBoard();
        };
    }, []);

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            {/* <Text />
    <CharacterCounter />
    <TodoList />
    <CurrentUserInfo />
    <Scratches /> */}
            {location === "/" && <Intro />}
            {location === "/color" && <Color />}
            {location === "/shape" && <Shape />}
            {location === "/music" && <Music />}
            {location === "/space" ? (
                <Suspense fallback={null}>
                    <Canvas
                        gl={{
                            logarithmicDepthBuffer: true,
                        }}
                    >
                        <Space
                            objCount={10}
                            primaryColor={primaryColor}
                            secondaryColor={secondaryColor}
                            therapeuticColor={therapeuticColor}
                        />
                    </Canvas>
                </Suspense>
            ) : (
                <AframeProvider>
                    <Camera />
                    {location === "/sea" ? (
                        <SeaBox />
                    ) : location === "/sky" ? (
                        <SkyBox />
                    ) : (
                        <Root />
                    )}
                </AframeProvider>
            )}
        </div>
    );
}

export default Main;
