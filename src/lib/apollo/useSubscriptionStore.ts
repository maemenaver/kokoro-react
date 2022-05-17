import create from "zustand";
import { devtools } from "zustand/middleware";
import { initialOrbitObjects } from "../../config";

export interface ISubscription {
    music: string;
    setMusic: (v: string) => void;
    musicReceived: boolean;
    musicPath: any;
    isMuted: boolean;
    isStarted: boolean;
    place: string;
    setPlace: (v: string) => void;
    shape: string[];
}

export const useSubscriptionStore = create<ISubscription>(
    devtools((set, get) => ({
        music: "Happy",
        setMusic: (v) => set((state) => ({ music: v })),
        musicReceived: false,
        musicPath: null,
        isMuted: false,
        isStarted: false,
        place: "space",
        setPlace: (v) => set((state) => ({ place: v })),
        shape: Object.keys(initialOrbitObjects),
    }))
);
