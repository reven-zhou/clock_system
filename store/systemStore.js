import create from 'zustand'
import { persist } from "zustand/middleware";

const allSystem = (set) => ({
    allSystem: [],
    addSystem: (clock) => set({ allSystem: clock }),
})

const useSystemStore = create(
    persist(allSystem, {
        name: "allSystem",
    })
);

export default useSystemStore;