import React from "react";
import create from "zustand";
import { devtools } from "zustand/middleware";

export interface IBloom {
    selectedMesh: (THREE.Mesh | THREE.Points)[];
    addSelectedMesh: (v: THREE.Mesh | THREE.Points) => void;
    removeSelectedMesh: (v: THREE.Mesh | THREE.Points) => void;
    selectedLight: THREE.Light[];
    addSelectedLight: (v: THREE.Light) => void;
    removeSelectedLight: (v: THREE.Light) => void;
}

export const useBloomStore = create<IBloom>(
    devtools((set, get) => ({
        selectedMesh: [],
        addSelectedMesh: (v) =>
            set((state) => ({
                selectedMesh: [...state.selectedMesh, v],
            })),
        removeSelectedMesh: (v) =>
            set((state) => ({
                selectedMesh: state.selectedMesh.filter((k) => k !== v),
            })),
        selectedLight: [],
        addSelectedLight: (v) =>
            set((state) => ({
                selectedLight: [...state.selectedLight, v],
            })),
        removeSelectedLight: (v) =>
            set((state) => ({
                selectedLight: state.selectedLight.filter((k) => k !== v),
            })),
    }))
);
