import axios from "axios"
import { reqGetAllClean } from "../api";

export const GetClean = async (token, addCleanInfo) => {
    reqGetAllClean().then((data) => {
        addCleanInfo(data.data);
    })
}