import React from "react";
import create from "zustand";
import { devtools } from "zustand/middleware";

export interface IObject {
    etherGroup: THREE.Group;
}

export const useObjectStore = create<IObject>(
    devtools((set, get) => ({
        etherGroup: null,
    }))
);
