import create from 'zustand'
import { persist } from "zustand/middleware";

const allGradesClock = (set) => ({
    allGradesClock: [],
    addAllGradesClock: (clock) => set({ allGradesClock: clock }),
})

const useAllGradesClockStore = create(
    persist(allGradesClock, {
        name: "allGradesClock",
    })
);

export default useAllGradesClockStore;