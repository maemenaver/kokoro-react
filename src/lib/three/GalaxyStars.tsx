import * as THREE from "three";
import React, {
    Suspense,
    useRef,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import { useControls, folder } from "leva";
import { useSpring } from "@react-spring/three";
import { useColorStore } from "../zustand/useColorStore";

interface GalaxyStarsProps {
    insideColor: THREE.ColorRepresentation;
    outsideColor: THREE.ColorRepresentation;
    dof: any;
    galaxyControl: any;
}

export function GalaxyStars({
    dof,
    galaxyControl,
    ...props
}: GalaxyStarsProps) {
    const { transitionDelay } = useColorStore();

    const parameters = useControls({
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

    const randomSeed = useMemo(
        () =>
            new Array(galaxyControl.count).fill(0).map(() => ({
                radius: Math.random() * galaxyControl.radius,
                randomX:
                    Math.pow(Math.random(), galaxyControl.randomnessPower) *
                    (Math.random() < 0.5 ? 1 : -1) *
                    galaxyControl.randomness,
                randomY:
                    Math.pow(Math.random(), galaxyControl.randomnessPower) *
                    (Math.random() < 0.5 ? 1 : -1) *
                    galaxyControl.randomness,
                randomZ:
                    Math.pow(Math.random(), galaxyControl.randomnessPower) *
                    (Math.random() < 0.5 ? 1 : -1) *
                    galaxyControl.randomness,
            })),
        [galaxyControl.count]
    );

    const { insideColor, outsideColor } = useSpring({
        insideColor: props.insideColor,
        outsideColor: props.outsideColor,
        config: {
            duration: transitionDelay,
        },
        onChange: () => {
            const colors = new Float32Array(galaxyControl.count * 3);
            const colorInside = new THREE.Color(insideColor.get());
            const colorOutside = new THREE.Color(outsideColor.get());

            for (let i = 0; i < galaxyControl.count; i++) {
                const i3 = i * 3;

                const radius = randomSeed[i].radius;

                const mixedColor = colorInside.clone();
                mixedColor.lerp(colorOutside, radius / galaxyControl.radius);

                colors[i3] = mixedColor.r;
                colors[i3 + 1] = mixedColor.g;
                colors[i3 + 2] = mixedColor.b;
            }
            particles.current.geometry.setAttribute(
                "color",
                new THREE.BufferAttribute(colors, 3)
            );
        },
    });

    useEffect(() => {
        console.log("Color changed");

        const positions = new Float32Array(galaxyControl.count * 3);
        const colors = new Float32Array(galaxyControl.count * 3);
        const colorInside = new THREE.Color(insideColor.get());
        const colorOutside = new THREE.Color(outsideColor.get());

        for (let i = 0; i < galaxyControl.count; i++) {
            const i3 = i * 3;

            const radius = randomSeed[i].radius;
            const spinAngle = radius * galaxyControl.spin;
            const branchAngle =
                ((i % galaxyControl.branches) / galaxyControl.branches) *
                Math.PI *
                2;

            const randomX = randomSeed[i].randomX * radius;
            const randomY = randomSeed[i].randomY * radius;
            const randomZ = randomSeed[i].randomZ * radius;

            positions[i3] =
                Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] =
                Math.sin(branchAngle + spinAngle) * radius + randomZ;

            const mixedColor = colorInside.clone();
            mixedColor.lerp(colorOutside, radius / galaxyControl.radius);

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
    }, [props.insideColor, props.outsideColor]);

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

    return (
        <points ref={particles}>
            <bufferGeometry />
            <pointsMaterial
                size={galaxyControl.size}
                sizeAttenuation={true}
                depthTest={false}
                depthWrite={true}
                transparent={true}
                vertexColors={true}
                // blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
