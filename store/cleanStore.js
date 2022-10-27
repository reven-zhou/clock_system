import create from 'zustand'
import { persist } from "zustand/middleware";

const cleanTable = (set) => ({
    cleanInfo: [],
    addCleanInfo: (info) => set({ cleanInfo: info }),
})

const useCleanStore = create(
    persist(cleanTable, {
        name: "clean",
    })
);

export default useCleanStore;