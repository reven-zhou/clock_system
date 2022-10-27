import create from 'zustand'
import { persist } from "zustand/middleware";

const allCard = (set) => ({
    allCard: [],
    addMyCard: (card) => set({ allCard: card }),
})

const useCardStore = create(
    persist(allCard, {
        name: "allCard",
    })
);

export default useCardStore;