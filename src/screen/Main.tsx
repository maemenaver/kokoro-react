import React, { useEffect } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useLocation } from "wouter";
import { useQuery } from "@apollo/client";
import { getBoard, subBoard } from "../lib/apollo/gql";
import { Intro } from "../components/Intro";
import { Music } from "../components/Music";
import { Color } from "../components/Color";
import { Shape } from "../components/Shape";
import colorTranslate from "../lib/colorTranslate";
import { useMIDI } from "@react-midi/hooks";
import { useControls } from "leva";
import Place from "../lib/three/scene/Place";
import { useColorStore } from "../lib/zustand/useColorStore";

function Main() {
    const [location] = useLocation();

    const { inputs } = useMIDI();

    const {
        primaryColor,
        secondaryColor,
        therapeuticColor,
        transitionDelay,
        setPrimaryColor,
        setSecondaryColor,
        setTherapeuticColor,
        setTransitionDelay,
    } = useColorStore();

    const [, setColors] = useControls("colors", () => ({
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
        delay: {
            value: transitionDelay,
            onChange: (v) => {
                setTransitionDelay(v);
            },
        },
    }));

    const board = useQuery(getBoard, {
        onCompleted: (data) => {
            console.log(data);
            const primary = colorTranslate(data["getBoard"][0]["primaryColor"]);
            const secondary = colorTranslate(
                data["getBoard"][0]["secondaryColor"]
            );
            const therapeutic = colorTranslate(
                data["getBoard"][0]["therapeuticColor"]
            );
            setColors({
                primaryColor: primary,
                secondaryColor: secondary,
                therapeuticColor: therapeutic,
            });
            setPrimaryColor(primary);
            setSecondaryColor(secondary);
            setTherapeuticColor(therapeuticColor);
        },
    });

    useEffect(() => {
        const unsubBoard = board.subscribeToMore({
            document: subBoard,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                console.log(subscriptionData);
                const primary = colorTranslate(
                    subscriptionData.data["subBoard"]["primaryColor"]
                );
                const secondary = colorTranslate(
                    subscriptionData.data["subBoard"]["secondaryColor"]
                );
                const therapeutic = colorTranslate(
                    subscriptionData.data["subBoard"]["therapeuticColor"]
                );
                setColors({
                    primaryColor: primary,
                    secondaryColor: secondary,
                    therapeuticColor: therapeutic,
                });
                setPrimaryColor(primary);
                setSecondaryColor(secondary);
                setTherapeuticColor(therapeuticColor);
            },
        });

        return () => {
            if (unsubBoard) unsubBoard();
        };
    }, []);

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            {location === "/" && <Intro />}
            {location === "/color" && <Color />}
            {location === "/shape" && <Shape />}
            {location === "/music" && inputs[1] && <Music input={inputs[1]} />}
            {(location === "/space" ||
                location === "/sea" ||
                location === "/ether") && (
                <Suspense fallback={null}>
                    <Canvas
                        gl={{
                            logarithmicDepthBuffer: true,
                            alpha: true,
                            powerPreference: "high-performance",
                            antialias: false,
                            stencil: false,
                            depth: false,
                        }}
                    >
                        <Place
                            objCount={10}
                            primaryColor={primaryColor}
                            secondaryColor={secondaryColor}
                            therapeuticColor={therapeuticColor}
                        />
                    </Canvas>
                </Suspense>
            )}
        </div>
    );
}

export default Main;
