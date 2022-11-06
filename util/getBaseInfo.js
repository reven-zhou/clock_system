import axios from "axios"
import { reqGetBaseInfo } from "../api";

export const GetBaseInfo = async (token,addBaseInfo)=>{
    reqGetBaseInfo().then((data)=>{
        addBaseInfo(data.data)
    })
}