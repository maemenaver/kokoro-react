import * as THREE from "three";
import React, { useRef, useMemo, useEffect } from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
import { EffectComposer, Vignette } from "@react-three/postprocessing";

export default function SeaEffects() {
    return (
        <EffectComposer>
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
    );
}
