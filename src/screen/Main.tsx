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
import { useMIDI } from "@react-midi/hooks";
import { useControls } from "leva";

function Main() {
    const [location] = useLocation();

    const { inputs, outputs, hasMIDI } = useMIDI();

    const [primaryColor, setPrimaryColor] = useState<string>(null);
    const [secondaryColor, setSecondaryColor] = useState<string>(null);
    const [therapeuticColor, setTherapeuticColor] = useState<string>(null);

    useControls("props", {
        primaryColor: {
            value: primaryColor,
            onChange: (v) => {
                setPrimaryColor(v);
            },
        },
        secondaryColor: {
            value: secondaryColor,
            onChange: (v) => {
                setSecondaryColor(v);
            },
        },
        therapeuticColor: {
            value: therapeuticColor,
            onChange: (v) => {
                setTherapeuticColor(v);
            },
        },
    });

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
            {location === "/music" && inputs[1] && <Music input={inputs[1]} />}
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
