import * as THREE from "three";
import React, { useEffect, useState, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { useLocation } from "wouter";
import { useSpring } from "@react-spring/three";
import { useColorStore } from "../../zustand/useColorStore";
import { useObjectStore } from "../../zustand/useObjectStore";
// import { useGodRayStore } from "../../zustand/useGodRayStore";
import { useSubscriptionStore } from "../../apollo/useSubscriptionStore";

interface TransitionProps {
    setBloomIntensity: any;
}

export default function Transition(props: TransitionProps) {
    const scene = useThree((state) => state.scene);
    const [location] = useLocation();

    const shape = useSubscriptionStore((state) => state.shape);

    const transitionDelay = useColorStore((state) => state.transitionDelay);
    const {
        etherGroup,
        seaGroup,
        spaceGroup,
        spaceParticles,
        etherBackground,
        orbitObjects,
        setOrbitObjectsOpacity,
    } = useObjectStore();
    const seaGodray = useObjectStore((state) => state.seaGodray);

    const [etherCenterOpacityTo, setEtherCenterOpacityTo] = useState(0);
    const [spaceCenterOpacityTo, setSpaceCenterOpacityTo] = useState(0);
    const [seaCenterOpacityTo, setSeaCenterOpacityTo] = useState(0);

    // const [spaceSecondaryOpacityTo, setSpaceSecondaryOpacityTo] = useState(0);

    const [fogNearTo, setFogNearTo] = useState(10);
    const [fogFarTo, setFogFarTo] = useState(60);
    const [backgroundColorTo, setBackgroundColorTo] =
        useState<THREE.ColorRepresentation>("#000000");

    const { etherCenter, etherClouds } = useMemo(
        () => ({
            etherCenter:
                etherGroup &&
                etherGroup
                    .getObjectByName("etherCenter")
                    .getObjectByProperty("type", "Points"),
            etherClouds: etherGroup && etherGroup.getObjectByName("clouds"),
        }),
        [etherGroup]
    );

    const { spaceCenter, spaceBackground } = useMemo(
        () => ({
            spaceCenter:
                spaceGroup &&
                spaceGroup
                    .getObjectByName("spaceCenter")
                    .getObjectByProperty("type", "Points"),
            spaceBackground:
                spaceGroup && spaceGroup.getObjectByName("background"),
        }),
        [spaceGroup]
    );

    const { seaCenter } = useMemo(
        () => ({
            seaCenter:
                seaGroup &&
                seaGroup
                    .getObjectByName("seaCenter")
                    .getObjectByProperty("type", "Points"),
        }),
        [seaGroup]
    );

    const {
        etherCenterOpacity,
        spaceCenterOpacity,
        seaCenterOpacity,
        backgroundColor,
        fogNear,
        fogFar,
    } = useSpring({
        etherCenterOpacity: etherCenterOpacityTo,
        spaceCenterOpacity: spaceCenterOpacityTo,
        seaCenterOpacity: seaCenterOpacityTo,
        backgroundColor: backgroundColorTo,
        fogNear: fogNearTo,
        fogFar: fogFarTo,
        config: {
            duration: transitionDelay,
        },
        onChange: () => {
            // Scene
            if (scene) {
                scene.background = new THREE.Color(backgroundColor.get());
                scene.fog = new THREE.Fog(
                    backgroundColor.get(),
                    fogNear.get(),
                    fogFar.get()
                );
            }
            // if (orbitObjects) {
            //     orbitObjects.forEach((v) => {
            //         console.log(v);
            //         v["material"]["uniforms"].uColor1.value = new THREE.Color(
            //             backgroundColor.get()
            //         );
            //         v["material"]["uniforms"].uColor2.value = new THREE.Color(
            //             backgroundColor.get()
            //         );
            //     });
            // }

            // Ether
            if (etherCenter) {
                etherCenter["material"]["uniforms"].uOpacity.value =
                    etherCenterOpacity.get();
            }
            if (etherClouds) {
                etherClouds["material"]["opacity"] = etherCenterOpacity.get();
            }
            if (etherBackground) {
                etherBackground["material"]["uniforms"].uOpacity.value =
                    etherCenterOpacity.get();
                etherBackground["material"]["uniformsNeedUpdate"] = true;
            }

            // Space
            if (spaceCenter) {
                spaceCenter["material"]["uniforms"].uOpacity.value =
                    spaceCenterOpacity.get();
            }
            if (spaceBackground) {
                spaceBackground["material"]["opacity"] =
                    spaceCenterOpacity.get();
            }
            if (spaceParticles) {
                spaceParticles["material"]["opacity"] =
                    spaceCenterOpacity.get();
            }

            // Sea
            if (seaCenter) {
                seaCenter["material"]["uniforms"].uOpacity.value =
                    seaCenterOpacity.get();
            }
            // if (seaGodray) {
            //     // console.log(seaGodray);
            //     // seaGodray["material"]["uniforms"].uStrength.value =
            //     //     useGodRayStore.getState().strength * seaCenterOpacity.get();
            //     // seaGodray["material"]["uniformsNeedUpdate"] = true;
            //     useGodRayStore.setState((state) => ({
            //         strength: 0.75 * seaCenterOpacity.get(),
            //     }));
            // }
        },
    });

    // useEffect(() => {}, []);

    // useEffect(() => {
    //     Object.keys(orbitObjects).forEach((key) => {
    //         const value = orbitObjects[key];

    //         const opacity = +shape.find((v) => v === key);
    //         if (value.opacity !== opacity) {
    //             setOrbitObjectsOpacity(key, opacity);
    //         }
    //     });
    // }, [shape]);

    useEffect(() => {
        setEtherCenterOpacityTo(0);
        setSpaceCenterOpacityTo(0);
        setSeaCenterOpacityTo(0);

        switch (location) {
            case "/ether":
                setEtherCenterOpacityTo(1);
                setBackgroundColorTo("#ffffff");
                setFogNearTo(70);
                setFogFarTo(90);
                break;

            case "/space":
                setSpaceCenterOpacityTo(1);
                setBackgroundColorTo("#000000");
                setFogNearTo(10);
                setFogFarTo(60);
                break;

            case "/sea":
                setSeaCenterOpacityTo(1);
                setBackgroundColorTo("#203455");
                setFogNearTo(10);
                setFogFarTo(60);
                break;
        }
    }, [location, seaGodray]);

    return null;
}
