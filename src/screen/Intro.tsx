import { Button } from "@mui/material";
import { useSubscriptionStore } from "../lib/apollo/useSubscriptionStore";
import VideoBg from "reactjs-videobg";
import { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useLocation } from "wouter";

const Intro = (props) => {
    const divRef = useRef();

    const isStarted = useSubscriptionStore((state) => state.isStarted);
    const [location] = useLocation();

    const { opacity } = useSpring({
        opacity: +!isStarted,
        config: {
            duration: 3000,
        },
    });

    useEffect(() => {
        console.log(divRef);
    }, []);

    return (
        <>
            <animated.div
                style={{
                    backgroundColor: "#000000",
                    zIndex: -9,
                    width: "100%",
                    height: "100%",
                    opacity: 0.6,
                    position: "fixed",
                }}
            />
            <animated.div
                ref={divRef}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "fixed",
                    color: "white",
                    fontSize: 60,
                    width: "100%",
                    height: "100%",
                    opacity,
                    zIndex:
                        (location !== "/space" &&
                            location !== "/sea" &&
                            location !== "/ether" &&
                            -10) ||
                        10,
                    pointerEvents: isStarted ? "none" : "initial",
                }}
                onClick={() => {
                    useSubscriptionStore.setState((state) => ({
                        isStarted: true,
                    }));
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#000000",
                        opacity: 0.3,
                    }}
                >
                    {/* <p style={{}}>Space for U</p> */}
                </div>
                <VideoBg>
                    <VideoBg.Source src={"/bg.mp4"} type="video/mp4" />
                </VideoBg>
            </animated.div>
        </>
    );
};

export { Intro };
