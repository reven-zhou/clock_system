import React, { useState, useRef } from "react";
import { GetAllGradesClock } from "../util/manageClock";
import useAllGradesClockStore from "../store/clockStore";
import { reqModifySomeClock, reqModifyPersonClock } from "../api";
import { useAlert } from "react-alert";

const ManageAllGradesClock = ({ allGradesClock }) => {
  const alert = useAlert();
  const [stateId, setStateId] = useState(new Set([]));
  const [userId, setUserId] = useState("");
  const [curTime, setCurTime] = useState("");
  const [tempTime, setTempTime] = useState("");
  const [allTime, setallTime] = useState("");
  const [time, setTime] = useState("");
  const { addAllGradesClock } = useAllGradesClockStore();

  // 批量修改
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = Array.from(stateId);
    reqModifySomeClock(time, params).then((data) => {
      alert.success(data.msg);
      GetAllGradesClock(
        JSON.parse(localStorage.getItem("token")),
        addAllGradesClock
      );
      setTime("");
    });
  };

  // 修改个人打卡信息
  const handlePersonSubmit = (e) => {
    e.preventDefault();
    const params = {
      userId,
      curTime,
      tempTime,
      allTime,
    };
    reqModifyPersonClock(params).then((data) => {
      alert(data.msg);
      GetAllGradesClock(
        JSON.parse(localStorage.getItem("token")),
        addAllGradesClock
      );
      setUserId("");
      setCurTime("");
      setTempTime("");
      setallTime("");
    });
  };

  return (
    <div className="mt-8 h-screen">
      {/* 单个修改用户的打卡信息 */}
      <div className="mb-8 flex flex-row text-center items-center">
        <div className="mb-4 mr-8 text-2xl">个人修改:</div>
        <form className="flex flex-row">
          <div className="mr-8">
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              type="text"
              placeholder="请输入用户id"
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>
          <div className="mr-8">
            <input
              value={curTime}
              onChange={(e) => setCurTime(e.target.value)}
              type="text"
              placeholder="请输入用户打卡时长"
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>
          <div className="mr-8">
            <input
              value={tempTime}
              onChange={(e) => setTempTime(e.target.value)}
              type="text"
              placeholder="请输入用户本周目标"
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>
          <div className="mr-8">
            <input
              value={allTime}
              onChange={(e) => setallTime(e.target.value)}
              type="text"
              placeholder="请输入用户年级目标"
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>
          <div>
            <button
              onClick={handlePersonSubmit}
              type="submit"
              className="btn text-white border-0 transition duration-500 ease transform hover:-translate-y-1"
              style={{ backgroundColor: "rgb(81, 140, 180)" }}
            >
              提交
            </button>
          </div>
        </form>
      </div>

      {/* 批量修改用户的打卡信息 */}
      <div className="mb-8 flex flex-row text-center items-center">
        <div className="mb-4 mr-8 text-2xl">批量修改(提交前请选择用户): </div>
        <form className="flex flex-row">
          <div className="mr-8">
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              type="text"
              placeholder="请输入时间（单位/分钟）"
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn text-white border-0 transition duration-500 ease transform hover:-translate-y-1"
              style={{ backgroundColor: "rgb(81, 140, 180)" }}
            >
              提交
            </button>
          </div>
        </form>
      </div>

      {/* 所有用户打卡信息表 */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-center text-xl">
              <th className="text-lg">#</th>
              <th className="text-lg">用户ID</th>
              <th className="text-lg">用户名</th>
              <th className="text-lg">本周打卡时长</th>
              <th className="text-lg">本周目标时长</th>
              <th className="text-lg">年级目标时长</th>
            </tr>
          </thead>
          <tbody>
            {allGradesClock.map((clock) => {
              return (
                <Table
                  clock={clock}
                  stateId={stateId}
                  setStateId={setStateId}
                  setCurTime={setCurTime}
                  setTempTime={setTempTime}
                  setallTime={setallTime}
                  setUserId={setUserId}
                  key={clock.realname}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function Table({
  clock,
  stateId,
  setStateId,
  setCurTime,
  setTempTime,
  setUserId,
  setallTime,
}) {
  const inputref = useRef();
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    const newCheck = !checked;
    setChecked(newCheck);
    if (inputref.current.value === "on") {
      const arr = stateId;
      arr.add(clock.userId);
      setStateId(stateId);
      setCurTime(clock.curTime);
      setTempTime(clock.tempTime);
      setUserId(clock.userId);
      setallTime(clock.allTime);
      inputref.current.value = "";
    } else {
      const arr = stateId;
      arr.delete(clock.userId);
      setCurTime("");
      setTempTime("");
      setUserId("");
      setallTime("");
      inputref.current.value = "on";
    }
  };

  return (
    <tr className="text-center">
      <th>
        <input
          ref={inputref}
          type="checkbox"
          checked={checked}
          className="checkbox checkbox-accent"
          onChange={handleChange}
        />
      </th>
      <td>{clock.userId}</td>
      <td>{clock.realname}</td>
      <td>{clock.curTime}</td>
      <td>{clock.tempTime}</td>
      <td>{clock.allTime}</td>
    </tr>
  );
}

export default ManageAllGradesClock;
