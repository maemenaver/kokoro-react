import create from "zustand";
import { devtools } from "zustand/middleware";

export interface IColor {
    primaryColor: string;
    secondaryColor: string;
    therapeuticColor: string;
    transitionDelay: number;
    setPrimaryColor: (v: string) => void;
    setSecondaryColor: (v: string) => void;
    setTherapeuticColor: (v: string) => void;
    setTransitionDelay: (v: number) => void;
}

export const useColorStore = create<IColor>(
    devtools((set, get) => ({
        primaryColor: "red",
        setPrimaryColor: (v) => set((state) => ({ primaryColor: v })),
        secondaryColor: "red",
        setSecondaryColor: (v) => set((state) => ({ secondaryColor: v })),
        therapeuticColor: "black",
        setTherapeuticColor: (v) => set((state) => ({ therapeuticColor: v })),
        transitionDelay: 3000,
        setTransitionDelay: (v) => set((state) => ({ transitionDelay: v })),
    }))
);
