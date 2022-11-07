import axios from "axios";
import React, { useEffect, useState } from "react";
import { CrateUser } from "../util";
import useAuthStore from "../store/authStore";
import { useAlert } from "react-alert";
import { reqCurTime, reqOnClock, reqEndClock } from "../api";

const UserProfile = ({ user }) => {
  const alert = useAlert();
  const { status, totalTime, changeStutas, addTotalTime, addUser } =
    useAuthStore();
  const [currentTime, setCurrentTime] = useState(user.curTime);

  /* 在这里重新调用getUser,保证当状态值改变时，保证后台和前台能同步更新（刷新更新把） */
  useEffect(() => {
    setCurrentTime(parseInt(user.curTime / 60));
    const newuser = { ...user, ["curTime"]: totalTime };
  }, [currentTime]);

  const handleCurTime = () => {
    reqCurTime().then((data) => {
      alert.info(data.msg);
    });
  };

  const handleClock = () => {
    if (status) {
      reqEndClock().then((data) => {
        setCurrentTime(parseInt(data.data / 60));
        alert.info(data.msg);
        addTotalTime(data.data);
        changeStutas(!status);
      });
    } else {
      reqOnClock().then((data) => {
        alert.info(data.msg);
        changeStutas(!status);
      });
    }
  };

  return (
    <div className="grid items-center text-xl lg:grid-col-6 grid-flow-col gap-4 text-center bg-gray-100 rounded-full flex-col shadow-md">
      <div className="block lg:flex text-center items-center justify-center w-full">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
          {/* 插个眼，之后增加没有头像的表现效果 */}
          <img
            alt="头像"
            className="rounded-full w-20 h-20 object-cover"
            src={user.userImage}
          />
          <p className="inline text-gray-700 ml-4 font-medium text-xl" style={{ color: "rgb(107, 136, 181)" }}>
            {user.username}
          </p>
        </div>
      </div>

      <div className="text-center">
        {/* <Link href={`/post/${post.slug}`}> */}
        <span
          className="transition duration-500 ease transform hover:-translate-y-1 inline-block text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
          style={{ backgroundColor: "rgb(81, 140, 180)" }}
        >
          已完成: {(totalTime / 60).toFixed(2)}h
        </span>
        {/* </Link> */}
      </div>

      <div className="text-center">
        {/* <Link href={`/post/${post.slug}`}> */}
        <span
          className="transition duration-500 ease transform hover:-translate-y-1 inline-block text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
          style={{ backgroundColor: "rgb(81, 140, 180)" }}
        >
          要求: {parseInt(user.tempTime / 60)}h
        </span>
        {/* </Link> */}
      </div>

      <div className="text-center">
        <span
          onClick={handleCurTime}
          className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-accent text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
          style={{ backgroundColor: "rgb(81, 140, 180)" }}
        >
          当前打卡
        </span>
      </div>

      <div className="text-center">
        {status ? (
          <span
            onClick={handleClock}
            className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-red-400 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
          >
            结束打卡
          </span>
        ) : (
          <span
            onClick={handleClock}
            className="transition duration-500 ease transform hover:-translate-y-1 inline-block text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
            style={{ backgroundColor: "rgb(81, 140, 180)" }}
          >
            开始打卡
          </span>
        )}
      </div>

      <div className="text-center">
        <div
          className="radial-progress text-primary-content border-4"
          style={{
            "--value": ((totalTime / user.tempTime)* 100).toFixed(2) ,
            backgroundColor: "rgb(81, 140, 180)",
            borderColor: "rgb(157, 198, 218)",
          }}
        >
          {((totalTime / user.tempTime)* 100).toFixed(2) + "%"}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
