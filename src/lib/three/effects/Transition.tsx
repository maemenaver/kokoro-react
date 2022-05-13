import * as THREE from "three";
import React, { useRef, useEffect, useState, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import {
    BlendFunction,
    BloomEffect,
    EffectComposer,
    EffectPass,
    KernelSize,
    RenderPass,
} from "postprocessing";
import { useLocation } from "wouter";
import { useSpring } from "@react-spring/three";
import { useColorStore } from "../../zustand/useColorStore";
import { useObjectStore } from "../../zustand/useObjectStore";

export default function Transition() {
    const scene = useThree((state) => state.scene);
    const [location] = useLocation();

    const transitionDelay = useColorStore((state) => state.transitionDelay);
    const etherGroup = useObjectStore((state) => state.etherGroup);

    const [etherCenterOpacityTo, setEtherCenterOpacityTo] = useState(0);

    const etherCenter = useMemo(
        () =>
            etherGroup &&
            etherGroup
                .getObjectByName("center")
                .getObjectByProperty("type", "Points"),
        [etherGroup]
    );

    const { etherCenterOpacity } = useSpring({
        etherCenterOpacity: etherCenterOpacityTo,
        config: {
            duration: transitionDelay,
        },
    });

    useEffect(() => {
        if (location === "/sea") {
            scene.fog = new THREE.Fog(206145, 0.1, 70);
            scene.background = new THREE.Color("#203455");
        } else {
            scene.fog = null;
            scene.background = null;
        }

        if (location === "/ether") {
            setEtherCenterOpacityTo(1);
        } else {
            setEtherCenterOpacityTo(0);
        }
    }, [location]);

    useFrame(() => {
        console.log(etherCenter);

        if (etherCenter) {
            etherCenter["material"]["uniforms"].uOpacity.value =
                etherCenterOpacity.get();
        }
    });

    return null;
}
