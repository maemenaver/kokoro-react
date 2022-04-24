import create from "zustand";
import { devtools } from "zustand/middleware";

export interface IGodRay {
    directionX: number;
    directionY: number;
    strength: number;
    length: number;
    fadeSmoothness: number;
    scale: number;
    speed: number;
    color: string;
}

export const useGodRayStore = create<IGodRay>(
    devtools((set, get) => ({
        directionX: 0.92,
        directionY: -5,
        strength: 0.75,
        length: 0.44,
        fadeSmoothness: 0.27,
        scale: 0.26,
        speed: 0.45,
        color: "#28c9fc",
    }))
);
