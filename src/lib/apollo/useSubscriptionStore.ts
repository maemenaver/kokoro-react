import create from "zustand";
import { devtools } from "zustand/middleware";
import { initialOrbitObjects } from "../../config";

export interface ISubscription {
    music: string;
    setMusic: (v: string) => void;
    place: string;
    setPlace: (v: string) => void;
    shape: string[];
}

export const useSubscriptionStore = create<ISubscription>(
    devtools((set, get) => ({
        music: "happy",
        setMusic: (v) => set((state) => ({ music: v })),
        place: "space",
        setPlace: (v) => set((state) => ({ place: v })),
        shape: Object.keys(initialOrbitObjects),
    }))
);
