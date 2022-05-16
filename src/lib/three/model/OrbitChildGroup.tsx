import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { useColorStore } from "../../zustand/useColorStore";
import PointModel from "./PointModel";

class OrbitChildGroupProps {
    path: string;
    objName: string;
    numParticles: number;
    position: THREE.Vector3;
    colorType?: "therapeuticColor" | "primaryColor" | "secondaryColor";
}

export function OrbitChildGroup(props: OrbitChildGroupProps) {
    const therapeuticColor = useColorStore((state) => state.therapeuticColor);

    const groupRef = useRef<THREE.Group>(null);

    const orbitSpeed = useMemo(() => Math.random() * 1.2, []);
    const position = useMemo(() => props.position, []);

    return (
        <group
            name={"orbitChildGroup"}
            userData={{
                orbitSpeed,
            }}
        >
            <PointModel
                path={props.path}
                objName={props.objName}
                numParticles={props.numParticles}
                scale={[5, 5, 5]}
                position={position}
                color1={
                    therapeuticColor === "orange"
                        ? "#ff0a00"
                        : therapeuticColor === "yellow"
                        ? "orange"
                        : therapeuticColor === "black"
                        ? "#ffffff"
                        : therapeuticColor === "red"
                        ? "#b4274d"
                        : therapeuticColor === "purple"
                        ? "#231462"
                        : therapeuticColor === "green"
                        ? "#2c8624"
                        : therapeuticColor === "blue"
                        ? "#0019ff"
                        : therapeuticColor === "grey"
                        ? "#1a1821"
                        : therapeuticColor
                }
                color2={
                    therapeuticColor === "orange"
                        ? "#ff3000"
                        : therapeuticColor === "yellow"
                        ? "orange"
                        : therapeuticColor === "black"
                        ? "#ffffff"
                        : therapeuticColor === "red"
                        ? "#0b0b0d"
                        : therapeuticColor === "purple"
                        ? "#10021d"
                        : therapeuticColor === "green"
                        ? "#022706"
                        : therapeuticColor === "blue"
                        ? "#0053ff"
                        : therapeuticColor === "grey"
                        ? "#000000"
                        : therapeuticColor
                }
                colorType={"therapeuticColor"}
                blending={THREE.NormalBlending}
                ref={groupRef}
            />
        </group>
    );
}
