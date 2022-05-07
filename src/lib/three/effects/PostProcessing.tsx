import * as THREE from "three";
import React, { useRef, useMemo, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import {
    BlendFunction,
    BloomEffect,
    ClearPass,
    EffectComposer,
    EffectPass,
    KernelSize,
    RenderPass,
} from "postprocessing";
import { Box, Sky } from "@react-three/drei";

export default function PostProcessing() {
    const { scene, gl, size } = useThree();
    const camera = useThree((state) => state.camera);
    const composer = useRef<EffectComposer>(new EffectComposer(gl));
    const sceneRef = useRef<THREE.Scene>();

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

        gl.setClearColor("#00000000", 0);
        gl.autoClear = false;

        composer.current.reset();
        // composer.current.addPass(new ClearPass(true, true, true));
        composer.current.addPass(new RenderPass(sceneRef.current, camera));
        composer.current.addPass(new RenderPass(scene, camera));
        const effectPassA = new EffectPass(camera, bloomEffect.current);

        // effectPassA.renderToScreen = true;

        composer.current.addPass(effectPassA);

        // composer.current.
    }, [camera]);

    // useEffect(
    //     () => void composer.current.setSize(size.width, size.height),
    //     [size]
    // );
    // useFrame(() => composer.current.render(), 1);

    useFrame(() => {
        composer.current.render();
    }, 1);

    return (
        <>
            <scene ref={sceneRef}>
                {/* <mesh scale={39}>
                    <sphereGeometry attach="geometry" />
                    <meshBasicMaterial
                        attach="material"
                        side={THREE.BackSide}
                        map={clouds}
                        transparent={true}
                        opacity={1.0}
                        // blendSrc={THREE.SrcAlphaSaturateFactor}
                        depthTest={false}
                        depthWrite={true}
                    />
                </mesh> */}
                <Sky />
            </scene>
        </>
    );
}
