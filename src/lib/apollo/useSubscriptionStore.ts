import create from "zustand";
import { devtools } from "zustand/middleware";

export interface ISubscription {
    music: string;
    setMusic: (v: string) => void;
    place: string;
    setPlace: (v: string) => void;
}

export const useSubscriptionStore = create<ISubscription>(
    devtools((set, get) => ({
        music: "happy",
        setMusic: (v) => set((state) => ({ music: v })),
        place: "space",
        setPlace: (v) => set((state) => ({ place: v })),
    }))
);
