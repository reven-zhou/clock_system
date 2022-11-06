import React, { useState, useEffect, useRef } from "react";
import { GetClean } from "../util/getClean";
import { GetBaseInfo } from "../util/getBaseInfo";
import useCleanStore from "../store/cleanStore";
import useBaseInfo from "../store/baseInfoStore";
import { reqAddClean, reqModifyClean } from "../api";

import axios from "axios";

const CleanTable = ({ cleanInfo }) => {
  const { addCleanInfo } = useCleanStore();
  const { addBaseInfo } = useBaseInfo();
  const [cleanId, setCleanId] = useState();
  const [userId, setUserId] = useState("");
  const [realName, setRealName] = useState("");
  const [ruleWeek, setRuleWeek] = useState("");

  const handleAddClean = (e) => {
    e.preventDefault();
    const params = {
      userId,
      realName,
      ruleWeek,
    };
    reqAddClean(params).then(() => {
      alert("添加成功");
      setUserId("");
      setRealName("");
      setRuleWeek("");
      GetClean(JSON.parse(localStorage.getItem("token")), addCleanInfo);
    });
  };

  const handleModifyClean = (e) => {
    e.preventDefault();
    const params = {
      cleanId,
      userId,
      realName,
      ruleWeek,
    };
    reqModifyClean(params).then(() => {
      alert("修改成功");
      setCleanId("");
      setUserId("");
      setRealName("");
      setRuleWeek("");
      GetClean(JSON.parse(localStorage.getItem("token")), addCleanInfo);
    });
  };

  return (
    <div className="mt-10 h-screen">
      {/* 添加值日人员信息 */}
      <div className="flex flex-col mb-4 border border-gray-200 p-2 rounded-lg">
        <div className="mb-4 pb-2 text-2xl font-semibold">添加值日人员</div>
        <form className="flex justify-between">
          <div className="flex flex-row items-center">
            <span className="mr-2">用户ID</span>
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              type="text"
              placeholder="用户ID"
              className="input input-bordered  input-accent  w-full max-w-xs"
            />
          </div>
          <div className="flex flex-row items-center">
            <span className="mr-2">姓名</span>
            <input
              value={realName}
              onChange={(e) => setRealName(e.target.value)}
              type="text"
              placeholder="姓名"
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>
          <div className="flex flex-row">
            <span className="mr-2">周数</span>
            <input
              value={ruleWeek}
              onChange={(e) => setRuleWeek(e.target.value)}
              type="text"
              placeholder="周数"
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>
          <div>
            <button
              type="submit"
              onClick={handleAddClean}
              className="btn text-white border-0 transition duration-500 ease transform hover:-translate-y-1"
              style={{ backgroundColor: "rgb(81, 140, 180)" }}
            >
              提交
            </button>
          </div>
        </form>
      </div>

      {/* 修改值日人员信息 */}
      <div className="flex flex-col mb-4 border border-gray-200 p-2 rounded-lg">
        <div className="mb-4 pb-2 text-2xl font-semibold">修改值日人员信息</div>
        <form className="flex justify-between">
          <div className="flex flex-row items-center">
            <span className="mr-2">表ID</span>
            <input
              value={cleanId}
              onChange={(e) => setCleanId(e.target.value)}
              type="text"
              placeholder="表ID"
              className="input input-bordered input-info w-full max-w-xs"
            />
          </div>
          <div className="flex flex-row items-center">
            <span className="mr-2">用户ID</span>
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              type="text"
              placeholder="用户ID"
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>
          <div className="flex flex-row items-center">
            <span className="mr-2">姓名</span>
            <input
              value={realName}
              onChange={(e) => setRealName(e.target.value)}
              type="text"
              placeholder="姓名"
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>
          <div className="flex flex-row">
            <span className="mr-2">周数</span>
            <input
              value={ruleWeek}
              onChange={(e) => setRuleWeek(e.target.value)}
              type="text"
              placeholder="周数"
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>
          <div>
            <button
              onClick={handleModifyClean}
              className="btn text-white border-0 transition duration-500 ease transform hover:-translate-y-1"
              style={{ backgroundColor: "rgb(81, 140, 180)" }}
            >
              提交
            </button>
          </div>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-xl text-center">
              <th className="text-lg">#</th>
              <th className="text-lg">表ID</th>
              <th className="text-lg">用户ID</th>
              <th className="text-lg">真实姓名</th>
              <th className="text-lg">值日周</th>
            </tr>
          </thead>
          <tbody>
            {cleanInfo?.map((item, index) => {
              return (
                <Table
                  key={index}
                  clean={item}
                  setCleanId={setCleanId}
                  setRuleWeek={setRuleWeek}
                  setRealName={setRealName}
                  setUserId={setUserId}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function Table({ clean, setCleanId, setUserId, setRealName, setRuleWeek }) {
  const inputref = useRef();
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    const newCheck = !checked;
    setChecked(newCheck);
    if (inputref.current.value === "on") {
      setCleanId(clean.cleanId);
      setUserId(clean.userId);
      setRealName(clean.realName);
      setRuleWeek(clean.ruleWeek);
      inputref.current.value = "";
    } else {
      setCleanId("");
      setUserId("");
      setRealName("");
      setRuleWeek("");
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
      <td>{clean.cleanId}</td>
      <td>{clean.userId}</td>
      <td>{clean.realName}</td>
      <td>{clean.ruleWeek}</td>
    </tr>
  );
}

export default CleanTable;
