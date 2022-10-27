import axios from "axios"

export const GetClean = async (token, addCleanInfo) => {
    const res = await axios.get(`http://101.43.184.218:9527/manager/getCleanAll`, {
        headers: {
            token: token,
        }
    });

    addCleanInfo(res.data.data);
}