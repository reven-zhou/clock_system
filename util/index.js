import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const CrateUser = async (token, adduser, getAllTitle,changeStutas,addTotalTime,addProblem,addHistory,addmyIntegral) => {
  const res = await axios.get('http://101.43.184.218:9527/user/getUser', {
    headers: {
      token: token,
    },
  });

  const dayProblem = await axios.get(`http://101.43.184.218:9527/user/getProblem`,{
    headers:{
      token: token,
    },
  })

  const history = await axios.get(`http://101.43.184.218:9527/user/getHistory`,{
    headers:{
      token: token,
    }
  })
  
  const { id, realname, grade, avatar, notify, integral,curTime,tempTime,online } = res.data.data;
  const user = {
    userId: id,
    username: realname,
    userGrade: grade,
    userImage: avatar,
    userNotify: notify,
    userIntegral: integral,
    curTime:curTime,
    tempTime:tempTime,
    online:online,
    integral:integral,
  }
  adduser(user);
  getAllTitle(token);
  changeStutas(user.online);
  addTotalTime(user.curTime);
  addProblem(dayProblem.data.data);
  addHistory(history.data.data);
  addmyIntegral(user.integral);
}