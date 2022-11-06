import axios from "axios";
import { reqGetUser, reqGetHistory, reqGetDayProblem } from "../api";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const CrateUser = async (token, adduser, getAllTitle, changeStutas, addTotalTime, addProblem, addHistory, addmyIntegral) => {
  reqGetUser().then((data) => {
    const user = {
      userId: data.data.id,
      username: data.data.realname,
      userGrade: data.data.grade,
      userImage: data.data.avatar,
      userNotify: data.data.notify,
      userIntegral: data.data.integral,
      curTime: data.data.curTime,
      tempTime: data.data.tempTime,
      online: data.data.online,
      integral: data.data.integral,
    }
    adduser(user);
    getAllTitle();
    changeStutas(user.online);
    addTotalTime(user.curTime);
    addmyIntegral(user.integral);
  });

  reqGetDayProblem().then((data)=>{
    addProblem(data.data)
  })

  reqGetHistory().then((data)=>{
    addHistory(data.data);
  })

}