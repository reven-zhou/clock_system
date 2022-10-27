import axios from "axios"

export const GetAllGradesClock = async (token,addAllGradesClock)=>{
    const res = await axios.get(`http://101.43.184.218:9527/user/getAllClock`,{
        headers:{
            token:token,
        }
    });
    addAllGradesClock(res.data.data);
}