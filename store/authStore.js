import create from 'zustand'
import { persist } from "zustand/middleware";
import axios from "axios";
import { reqGetAllTitle, reqGetGradeClock } from '../api';

const authStore = (set) => ({
    userProfile: null,
    myIntegral: 0,
    totalTime: 0,
    dayProblem: {},
    allClock: [],
    allTitle: [],
    allHistory: [],
    status: false,
    addmyIntegral: (integral) => set({ myIntegral: integral }),
    addHistory: (history) => set({ allHistory: history }),
    addProblem: (problem) => set({ dayProblem: problem }),
    addTotalTime: (time) => set({ totalTime: time }),
    changeStutas: (online) => set({ status: online }),
    removeUser: () => set({ userProfile: null }),
    addUser: (user) => set({ userProfile: user }),
    removeTitle: () => set({ allTitle: [] }),
    catchAllClock: (grade) => {
        reqGetGradeClock(grade).then((data) => {
            set({ allClock: data.data });
        })
    },
    getAllTitle: () => {
        reqGetAllTitle().then((data) => {
            set({ allTitle: data.data });
        })
    },
})

const useAuthStore = create(
    persist(authStore, {
        name: "auth",
    })
);

export default useAuthStore;