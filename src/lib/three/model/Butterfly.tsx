import React, { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector2 } from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";
import { MathUtils } from "three";
import { FBM } from "three-noise";
import { useSpring } from "@react-spring/three";

const vec = new Vector2();
export function Butterfly(props) {
    const group = useRef<THREE.Group>();
    const { scene, animations } = useGLTF("/models/butterfly.glb");
    const cloneScene = useMemo(
        () =>
            // @ts-ignore
            SkeletonUtils.clone(scene),
        [scene]
    );
    const { actions } = useAnimations(animations, group);
    const fbm = useMemo(() => new FBM({ seed: Math.random() }), []);
    const offset = useMemo(() => Math.random() * Math.PI * 2, []);

    // const { posX, posY, posZ } = useSpring({
    //     posX: group?.current?.position.x || 0,
    //     posY: group?.current?.position.y || 0,
    //     posZ: group?.current?.position.z || 0,
    //     onChange: () => {
    //         group.current.position.set(posX.get(), posY.get(), posZ.get());
    //     },
    // });

    useEffect(() => {
        for (const key in actions) {
            actions[key].setEffectiveTimeScale(6);
            setTimeout(() => {
                actions[key].play();
            }, Math.random() * 1000);
        }
        group.current.rotation.y = offset;
    }, []);

    useFrame(({ clock }, dt) => {
        vec.set(clock.elapsedTime, clock.elapsedTime);
        group.current.position.set(0, fbm.get2(vec), 0);
        // group.current.rotation.y -= dt;
    });

    return (
        <group ref={group} dispose={null}>
            <group {...props}>
                <group
                    scale={0.15}
                    rotation-y={Math.PI / 4}
                    position-y={MathUtils.randFloat(-3, 1)}
                >
                    <primitive object={cloneScene} />
                </group>
            </group>
        </group>
    );
}
