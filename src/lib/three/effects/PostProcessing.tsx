import * as THREE from "three";
import React, { useRef, useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import {
    BlendFunction,
    BloomEffect,
    EffectComposer,
    EffectPass,
    KernelSize,
    RenderPass,
    SelectiveBloomEffect,
} from "postprocessing";
import Transition from "./Transition";

export default function PostProcessing() {
    const { scene, gl, size } = useThree();

    const [bloomIntensity, setBloomIntensity] = useState(0);

    const camera = useThree((state) => state.camera);
    const composer = useRef<EffectComposer>(
        new EffectComposer(gl, {
            alpha: true,
            stencilBuffer: false,
        })
    );

    useEffect(() => {
        console.log("camera changed", scene);

        scene.children.forEach((v) => {
            if (v.type === "Scene") {
                scene.remove(v);
            }
        });

        gl.autoClear = false;
        composer.current.reset();
        const renderB = new RenderPass(scene, camera);

        composer.current.addPass(renderB);
        console.log("not useMemo");

        const effectPassA = new EffectPass(
            camera,
            new BloomEffect({
                blendFunction: BlendFunction.SCREEN,
                kernelSize: KernelSize.HUGE,
                luminanceThreshold: 0.0,
                luminanceSmoothing: 0.0,
                height: 480,
                intensity: bloomIntensity,
            })
        );
        composer.current.addPass(effectPassA);
    }, [camera, bloomIntensity]);

    useEffect(
        () => void composer.current.setSize(size.width, size.height),
        [size]
    );

    useFrame(() => composer.current.render(), 1);

    return <Transition />;
}
