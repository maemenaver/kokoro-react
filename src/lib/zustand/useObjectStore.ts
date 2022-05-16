import create from "zustand";
import { devtools } from "zustand/middleware";
import { initialOrbitObjects } from "../../config";

export interface IObject {
    etherGroup: THREE.Group;
    spaceGroup: THREE.Group;
    seaGroup: THREE.Group;

    etherBackground: THREE.Mesh;

    spaceParticles: THREE.Points;

    seaGodray: THREE.Mesh;

    // orbitGroup: THREE.Group;
    orbitObjects: orbitObjectsType;
    setOrbitObjectsOpacity: (name: string, opacity: number) => void;
}

export const useObjectStore = create<IObject>(
    devtools((set, get) => ({
        etherGroup: null,
        spaceGroup: null,
        seaGroup: null,

        etherBackground: null,

        spaceParticles: null,

        seaGodray: null,

        // orbitGroup: null,
        orbitObjects: { ...initialOrbitObjects },
        setOrbitObjectsOpacity: (name, opacity) => {
            const result = { ...get().orbitObjects };
            result[name].opacity = opacity;
            set((state) => ({
                orbitObjects: result,
            }));
        },
    }))
);

interface orbitObjectsType {
    [key: string]: {
        path: string;
        numParticles: number;
        opacity: number;
    };
}
