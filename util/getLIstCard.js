import axios from "axios"
import { reqGetAllCard } from "../api";

export const GetLiatCard = async (token, addMyCard) => {
    reqGetAllCard().then((data) => {
        addMyCard(data.data);
    })
}