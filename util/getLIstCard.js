import axios from "axios"

export const GetLiatCard = async (token, addMyCard) => {
    const res = await axios.get(`http://101.43.184.218:9527/user/listCards`, {
        headers: {
            token: token,
        }
    });

    addMyCard(res.data.data);
}