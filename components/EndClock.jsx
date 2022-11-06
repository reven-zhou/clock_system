import React, { useState, useRef } from "react";
import { GetAllGradesClock } from "../util/manageClock";
import useAllGradesClockStore from "../store/clockStore";
import axios from "axios";
import { reqAdminEndClock } from "../api";

const EndClock = ({ allGradesClock }) => {
  const [stateId, setStateId] = useState(new Set([]));
  const { addAllGradesClock } = useAllGradesClockStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = Array.from(stateId);
    const userId = params[0];
    reqAdminEndClock(userId).then(()=>{
      alert('修改成功');
        GetAllGradesClock(
          JSON.parse(localStorage.getItem("token")),
          addAllGradesClock
        );
    })
  };

  return (
    <div className="mt-8 h-screen">
      {/* 帮用户下卡，注意这里虽然能选很多个但是要修改只能选一个 */}
      <div className="mb-8 flex flex-row text-center items-center">
        <div className="mb-4 mr-8 text-2xl">请选择用户(单人): </div>
        {/* <form className="flex flex-row"> */}
        <div>
          <button
            onClick={handleSubmit}
            type="button"
            className="btn text-white border-0 transition duration-500 ease transform hover:-translate-y-1"
            style={{"backgroundColor":"rgb(81, 140, 180)"}}
          >
            提交
          </button>
        </div>
        {/* </form> */}
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
              <th className="text-lg">打卡状态</th>
            </tr>
          </thead>
          <tbody>
            {allGradesClock.map((clock) => {
              return (
                <Table
                  clock={clock}
                  stateId={stateId}
                  setStateId={setStateId}
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

function Table({ clock, stateId, setStateId }) {
  const inputref = useRef();
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const newCheck = !checked;
    setChecked(newCheck);
    if (inputref.current.value === "on") {
      const arr = stateId;
      arr.add(clock.userId);
      setStateId(stateId);
      inputref.current.value = "";
    } else {
      const arr = stateId;
      arr.delete(clock.userId);
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
      <td className="flex items-center text-center justify-center">
        {clock.online === 1 ? (
          <div className="w-4 h-4 rounded-full bg-green-400"></div>
        ) : (
          <div className="w-4 h-4 rounded-full bg-red-400"></div>
        )}
      </td>
    </tr>
  );
}

export default EndClock;
