import React from "react";
import create from "zustand";
import { devtools } from "zustand/middleware";

export interface IObject {
    etherGroup: THREE.Group;
    spaceGroup: THREE.Group;
    seaGroup: THREE.Group;

    etherBackground: THREE.Mesh;

    spaceParticles: THREE.Points;

    seaGodray: THREE.Mesh;
}

export const useObjectStore = create<IObject>(
    devtools((set, get) => ({
        etherGroup: null,
        spaceGroup: null,
        seaGroup: null,

        etherBackground: null,

        spaceParticles: null,

        seaGodray: null,
    }))
);
