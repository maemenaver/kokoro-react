import * as THREE from "three";
import { IUniform } from "three";
import create, { GetState, SetState } from "zustand";
import { devtools } from "zustand/middleware";

export interface IGlobalUniforms {
    // uTime: IUniform<number>;
    // setUTime: (v: number) => void;
    uResolution: IUniform;
    fogNear: IUniform<number>;
    fogFar: IUniform<number>;
    fogFarColor: IUniform<THREE.Color>;
    fogNearColor: IUniform<THREE.Color>;
    uShadowColor: IUniform<THREE.Color>;
    uShadowIntensity: IUniform<number>;
}

export const useUniformsStore = create<IGlobalUniforms>(
    devtools((set, get) => ({
        // uTime: {
        //     value: 0,
        // },
        // setUTime: (v) => set((state) => ({ uTime: { value: v } })),
        uResolution: {
            value: undefined,
        },
        fogNear: {
            value: 0.1,
        },
        fogFar: {
            value: 70,
        },
        fogFarColor: {
            value: new THREE.Color(206145),
        },
        fogNearColor: {
            value: new THREE.Color(2127011),
        },
        uShadowColor: {
            value: new THREE.Color("#1e1e1e"),
        },
        uShadowIntensity: {
            value: 0.7,
        },
    }))
);
