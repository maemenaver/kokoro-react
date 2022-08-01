import * as THREE from "three";
import React, { useEffect } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Route, Switch } from "wouter";
import { Music } from "./Music";
import { Color } from "./Color";
import { Shape } from "./Shape";
import Place from "../lib/three/scene/Place";
import { Loader, Preload, Stats } from "@react-three/drei";
import { Subscription } from "../lib/apollo/Subscription";
import { ColorControl } from "../components/ColorControl";
import { Intro } from "./Intro";
import { Fellow } from "./Fellow";
import { Name } from "./Name";
import { Emote } from "./Emote";
import { Last } from "./Last";

function Main() {
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <Subscription />

            <Canvas
                key="canvas"
                mode="concurrent"
                gl={{
                    outputEncoding: THREE.LinearEncoding,
                    autoClear: false,
                    logarithmicDepthBuffer: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    antialias: false,
                    stencil: false,
                    depth: false,
                }}
            >
                <Suspense fallback={null}>
                    <Place key="place" />
                    <Preload all />
                </Suspense>
            </Canvas>
            <Stats />
            <Loader />
            <ColorControl />
        </div>
    );
}

export default Main;
