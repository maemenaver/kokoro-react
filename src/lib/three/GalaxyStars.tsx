import * as THREE from "three";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import { useControls, folder } from "leva";

export function GalaxyStars({ dof }) {
    const parameters = useControls({
        Galaxy: folder({
            count: { min: 100, max: 1000000, value: 100000, step: 100 },
            size: { min: 0.001, max: 0.1, value: 0.01, step: 0.001 },
            radius: { min: 0.01, max: 50, value: 31, step: 0.01 },
            branches: { min: 2, max: 20, value: 2, step: 1 },
            spin: { min: -5, max: 5, value: 0.78, step: 0.001 },
            randomness: { min: 0, max: 2, value: 0.09, step: 0.001 },
            randomnessPower: { min: 1, max: 10, value: 3, step: 0.001 },
            insideColor: { value: "#ff6030", label: "Inside Color" },
            outsideColor: { value: "#1b3984", label: "Outside Color" },
        }),
        Animation: folder({
            animate: true,
            mouse: false,
            //speed: { value: 0.3, min: 0, max: 2, render: (get) => get('animation.animate') },
        }),
        DoF: folder({
            opacity: {
                min: 0,
                max: 1,
                value: 1,
                steps: 0.01,
            },
            focusDistance: {
                min: 0,
                max: 1.0,
                value: 0.05,
                steps: 0.001,
            },
            focalLength: {
                min: 0,
                max: 0.1,
                value: 0.05,
                steps: 0.0001,
            },
            width: {
                min: 0,
                max: 1280,
                value: 480,
            },
            height: {
                min: 0,
                max: 1280,
                value: 480,
            },
            focusX: {
                min: -1,
                max: 1,
                value: 0,
            },
            focusY: {
                min: -1,
                max: 1,
                value: 0,
            },
            focusZ: {
                min: -1,
                max: 1,
                value: 0,
            },
        }),
    });
    const particles = useRef<THREE.Points>();
    //const [movement] = useState(() => new THREE.Vector3())
    const [temp] = useState(() => new THREE.Vector3());
    const [focus] = useState(() => new THREE.Vector3());

    useEffect(() => {
        generateGalaxy();
    });

    useFrame((state, delta) => {
        //dof.current.target = focus.lerp(particles.current.position, 0.05)
        //movement.lerp(temp.set(state.mouse.x, state.mouse.y * 0.2, 0), 0.2)
        if (dof.current) {
            dof.current.circleOfConfusionMaterial.uniforms.focusDistance.value =
                parameters.focusDistance;
            dof.current.circleOfConfusionMaterial.uniforms.focalLength.value =
                parameters.focalLength;
            dof.current.resolution.height = parameters.height;
            dof.current.resolution.width = parameters.width;
            dof.current.target = new THREE.Vector3(
                parameters.focusX,
                parameters.focusY,
                parameters.focusZ
            );
            dof.current.blendMode.opacity.value = parameters.opacity;
        }

        if (parameters.mouse) {
            //particles.current.position.x = THREE.MathUtils.lerp(particles.current.position.x, state.mouse.x * 20, 0.2)
            particles.current.rotation.x = THREE.MathUtils.lerp(
                particles.current.rotation.x,
                state.mouse.y / 10,
                0.2
            );
            particles.current.rotation.y = THREE.MathUtils.lerp(
                particles.current.rotation.y,
                -state.mouse.x / 2,
                0.2
            );
        }

        // TODO use delta instead
        if (parameters.animate) {
            const elapsedTime = state.clock.getElapsedTime();
            particles.current.rotation.y = 0.05 * elapsedTime;
        }
    });

    const generateGalaxy = () => {
        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 3);
        const colorInside = new THREE.Color(parameters.insideColor);
        const colorOutside = new THREE.Color(parameters.outsideColor);
        // const colorInside = new THREE.Color(1.0, 0.3765, 0.1882);
        // const colorOutside = new THREE.Color(0.10588, 0.22353, 0.51765);

        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3;

            const radius = Math.random() * parameters.radius;
            const spinAngle = radius * parameters.spin;
            const branchAngle =
                ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

            const randomX =
                Math.pow(Math.random(), parameters.randomnessPower) *
                (Math.random() < 0.5 ? 1 : -1) *
                parameters.randomness *
                radius;
            const randomY =
                Math.pow(Math.random(), parameters.randomnessPower) *
                (Math.random() < 0.5 ? 1 : -1) *
                parameters.randomness *
                radius;
            const randomZ =
                Math.pow(Math.random(), parameters.randomnessPower) *
                (Math.random() < 0.5 ? 1 : -1) *
                parameters.randomness *
                radius;

            positions[i3] =
                Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] =
                Math.sin(branchAngle + spinAngle) * radius + randomZ;

            const mixedColor = colorInside.clone();
            mixedColor.lerp(colorOutside, radius / parameters.radius);

            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;
        }

        particles.current.geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );
        particles.current.geometry.setAttribute(
            "color",
            new THREE.BufferAttribute(colors, 3)
        );
    };

    return (
        <points ref={particles}>
            <bufferGeometry />
            <pointsMaterial
                size={parameters.size}
                sizeAttenuation={true}
                depthWrite={true}
                vertexColors={true}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
