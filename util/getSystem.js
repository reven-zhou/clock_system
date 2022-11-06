import axios from "axios";
import { reqGetSystem } from "../api";

export const GetSystem = async (token, addSystem) => {
    reqGetSystem().then((data) => {
        addSystem(data.data)
    });
}