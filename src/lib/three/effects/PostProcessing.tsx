import * as THREE from "three";
import React, { useRef, useMemo, useEffect } from "react";
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
import { useBloomStore } from "../../zustand/useBloomStore";

export default function PostProcessing() {
    const { scene, gl, size } = useThree();
    const camera = useThree((state) => state.camera);
    const composer = useRef<EffectComposer>(
        new EffectComposer(gl, {
            alpha: true,
            stencilBuffer: false,
        })
    );
    const bloomEffect = useRef<BloomEffect>(
        new BloomEffect({
            blendFunction: BlendFunction.SCREEN,
            kernelSize: KernelSize.HUGE,
            luminanceThreshold: 0.0,
            luminanceSmoothing: 0.0,
            height: 480,
            intensity: 3,
        })
    );
    // const selectiveBloomEffect = useMemo<SelectiveBloomEffect>(() => {
    //     console.log("useMemo");

    //     const result = new SelectiveBloomEffect(scene, camera, {
    //         blendFunction: BlendFunction.SCREEN,
    //         kernelSize: KernelSize.HUGE,
    //         luminanceThreshold: 0.0,
    //         luminanceSmoothing: 0.0,
    //         // height: 480,
    //         intensity: 3,
    //     });

    //     gl.setClearColor("#000000", 1);
    //     // result.selection.
    //     // result.ignoreBackground = true;

    //     // const mainGroup = scene.getObjectByName("mainGroup");
    //     // if (mainGroup) {
    //     //     console.log("loaded");
    //     //     result.selection.add(mainGroup);
    //     // }

    //     return result;
    // }, [camera]);

    // const aspect = useMemo(() => new THREE.Vector2(512, 512), []);
    useEffect(() => {
        console.log("camera changed", scene);
        // gl.outputEncoding = THREE.LinearEncoding;
        // composer.current.addPass(new RenderPass(sceneRef.current, camera), 0);
        // composer.current.addPass(new ClearPass(true, true, true), 1);
        // composer.current.addPass(new RenderPass(scene, camera), 1);
        // composer.current.addPass(new RenderPass(scene, camera));
        // composer.current
        // composer.current.addPass(new C)

        scene.children.forEach((v) => {
            if (v.type === "Scene") {
                scene.remove(v);
            }
        });

        gl.autoClear = false;

        // composer.current.autoRenderToScreen = false;

        composer.current.reset();
        // composer.current.autoRenderToScreen = false;

        const renderB = new RenderPass(scene, camera);
        // renderB.clear = false;
        // renderB.ignoreBackground = true;
        // renderB; // renderB.clearPass = new ClearPass(false, false, false); // rendderB

        // .composer.current
        //     .addPass(renderA);
        composer.current.addPass(renderB);
        console.log("not useMemo");

        // const visualOrbits = scene
        //     ?.getObjectByName("mainGroup")
        //     ?.getObjectByName("orbitGroup")
        //     ?.children?.filter((v) => v.name === "visualOrbit");
        // if (visualOrbits) {
        //     console.log(visualOrbits);
        //     selectiveBloomEffect.selection.set(visualOrbits);
        // }

        const selectiveBloomEffect = new SelectiveBloomEffect(scene, camera, {
            blendFunction: BlendFunction.SCREEN,
            kernelSize: KernelSize.HUGE,
            luminanceThreshold: 0.0,
            luminanceSmoothing: 0.0,
            // height: 480,
            intensity: 0.5,
        });

        // selectiveBloomEffect.ignoreBackground = true;
        selectiveBloomEffect.selection.exclusive = false;
        selectiveBloomEffect.selection.set(
            useBloomStore.getState().selectedMesh
        );

        const effectPassA = new EffectPass(camera, bloomEffect.current);
        // const effectPassB = new EffectPass(camera, selectiveBloomEffect);
        // effectPassA.renderToScreen = true;

        composer.current.addPass(effectPassA);

        // composer.current.
    }, [camera]);

    useEffect(
        () => void composer.current.setSize(size.width, size.height),
        [size]
    );

    // useEffect(() => {
    //     // selectiveBloomEffect.selection.clear()
    //     console.log(useBloomStore.getState().selectedMesh);
    //     selectiveBloomEffect.selection.set(
    //         useBloomStore.getState().selectedMesh
    //     );

    // }, [selectiveBloomEffect]);

    useFrame(() => composer.current.render(), 1);

    // useFrame(() => {
    //     console.log(composer);
    //     composer.current.render();
    // }, 1);

    return <></>;
}
