import axios from "axios";

export const GetSystem = async (token,addSystem)=>{
    const res = await axios.get(`http://101.43.184.218:9527/manager/listSystemConf`,{
        headers:{
            token:token,
        }
    });
    addSystem(res.data.data);
}