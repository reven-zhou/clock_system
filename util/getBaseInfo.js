import axios from "axios"

export const GetBaseInfo = async (token,addBaseInfo)=>{
    const res = await axios.get(`http://101.43.184.218:9527/user/getBaseInfo`,{
        headers:{
            token:token,
        }
    });

    const {curWeek,dayOfWeek,notify,isClean,online,extra,names} = res.data.data;
    const baseInfo = {
        curWeek,dayOfWeek,notify,isClean,online,extra,names
    }
    addBaseInfo(baseInfo);
}