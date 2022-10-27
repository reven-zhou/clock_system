import create from 'zustand'
import { persist } from "zustand/middleware";

const baseInfo = (set) => ({
    baseInfo: {
        curWeek: 0,
        dayOfWeek: 0,
        notify: "",
        isClean: false,
        online: 0,
        extra: "",
        names: "",
    },
    addBaseInfo: (info) => set({ baseInfo: info }),
})

const useBaseInfo = create(
    persist(baseInfo, {
        name: "info",
    })
);

export default useBaseInfo;