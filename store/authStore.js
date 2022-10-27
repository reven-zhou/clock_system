import create from 'zustand'
import { persist } from "zustand/middleware";
import axios from "axios";

const authStore = (set) => ({
    userProfile: {
        userId: "",
        username: "",
        userGrade: "",
        userImage: "",
        userNotify: "",
        userIntegral: "",
        curTime: "",
        tempTime:"",
        online: "",
        integral:""
    },
    myIntegral:0,
    totalTime: 0,
    dayProblem: {},
    allClock: [],
    allTitle: [],
    allHistory: [],
    status: false,
    addmyIntegral:(integral)=>set({myIntegral:integral}),
    addHistory: (history) => set({ allHistory: history }),
    addProblem: (problem) => set({ dayProblem: problem }),
    addTotalTime: (time) => set({ totalTime: time }),
    changeStutas: (online) => set({ status: online }),
    removeUser: () => set({ userProfile: null }),
    addUser: (user) => set({ userProfile: user }),
    removeTitle: () => set({ allTitle: [] }),
    catchAllClock: async (grade, token) => {
        const response = await axios.get(`http://101.43.184.218:9527/user/getAllClockByGrade?grade=${grade}`, {
            headers: {
                token: token,
            }
        });
        set({ allClock: response.data.data });
    },
    getAllTitle: async (token) => {
        const response = await axios.get(`http://101.43.184.218:9527/user/getMenus`, {
            headers: {
                token: token,
            }
        });
        set({ allTitle: response.data.data });
    },
})

const useAuthStore = create(
    persist(authStore, {
        name: "auth",
    })
);

export default useAuthStore;