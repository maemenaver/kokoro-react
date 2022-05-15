import * as THREE from "three";
import React, { useEffect } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Route, Switch } from "wouter";
import { useQuery } from "@apollo/client";
import { getMusicPath } from "../lib/apollo/gql";
import { Music } from "./Music";
import { Color } from "./Color";
import { Shape } from "./Shape";
import Place from "../lib/three/scene/Place";
import { Loader, Stats } from "@react-three/drei";
import { Subscription } from "../lib/apollo/Subscription";
import { ColorControl } from "../components/ColorControl";

function Main() {
    const musicPath = useQuery(getMusicPath, {
        onCompleted: (data) => {
            console.log(data);
            const result = JSON.parse(data.getMusicPath);
            console.log(result);
        },
    });

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                backgroundColor: "#000000",
            }}
        >
            <Subscription />
            <Switch>
                <Route path="/color">
                    <Color />
                </Route>
                <Route path="/shape">
                    <Shape />
                </Route>
                <Route path="/music">
                    <Music />
                </Route>
                <Route>
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
                            <Place key="place" objCount={10} />
                        </Suspense>
                    </Canvas>
                    <Stats />
                    <Loader />
                    <ColorControl />
                </Route>
            </Switch>
        </div>
    );
}

export default Main;
