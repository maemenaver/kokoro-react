import React, { useRef, useEffect, useMemo, useState } from "react";
import PointModel from "./PointModel";

class OrbitChildGroupProps {
    path: string;
    numParticles: number;
    position: THREE.Vector3;
    therapeuticColor: string;
}

export function OrbitChildGroup(props: OrbitChildGroupProps) {
    return (
        <group
            name={"orbitChildGroup"}
            position={[0, 0, 0]}
            userData={{
                orbitSpeed: Math.random() * 1.2,
            }}
        >
            <PointModel
                path={props.path}
                numParticles={props.numParticles}
                position={props.position}
                scale={[5, 5, 5]}
                color1={
                    props.therapeuticColor === "orange"
                        ? "#ff0a00"
                        : props.therapeuticColor === "yellow"
                        ? "orange"
                        : props.therapeuticColor === "black"
                        ? "#1d1d1d"
                        : props.therapeuticColor === "red"
                        ? "#b4274d"
                        : props.therapeuticColor === "purple"
                        ? "#231462"
                        : props.therapeuticColor === "green"
                        ? "#2c8624"
                        : props.therapeuticColor === "blue"
                        ? "#0019ff"
                        : props.therapeuticColor === "grey"
                        ? "#1a1821"
                        : props.therapeuticColor
                }
                color2={
                    props.therapeuticColor === "orange"
                        ? "#ff3000"
                        : props.therapeuticColor === "yellow"
                        ? "orange"
                        : props.therapeuticColor === "black"
                        ? "#000000"
                        : props.therapeuticColor === "red"
                        ? "#0b0b0d"
                        : props.therapeuticColor === "purple"
                        ? "#10021d"
                        : props.therapeuticColor === "green"
                        ? "#022706"
                        : props.therapeuticColor === "blue"
                        ? "#0053ff"
                        : props.therapeuticColor === "grey"
                        ? "#000000"
                        : props.therapeuticColor
                }
            />
        </group>
    );
}
