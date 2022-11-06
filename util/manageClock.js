import axios from "axios"
import { reqGetAllClock } from "../api";

export const GetAllGradesClock = async (token, addAllGradesClock) => {
    reqGetAllClock().then((data) => {
        addAllGradesClock(data.data)
    })
}