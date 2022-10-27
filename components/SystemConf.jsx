import React, { useState, useRef } from "react";
import { GetSystem } from "../util/getSystem";
import useSystemStore from "../store/systemStore";
import axios from "axios";

const SystemConf = ({ allSystem }) => {
  const { addSystem } = useSystemStore();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = { id, name, status, value, description };
    axios
      .post(
        `http://101.43.184.218:9527/manager/modifySystemConf`,
        JSON.stringify(params),
        {
          headers: {
            token: JSON.parse(localStorage.getItem("token")),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        alert(res.data.msg);
        GetSystem(JSON.parse(localStorage.getItem("token")), addSystem);
        setId("");
        setName("");
        setStatus("");
        setValue("");
        setDescription("");
      });
  };

  return (
    <div className="mt-8">
      {/* 管理员设置系统配置  */}
      <div className="mb-8 flex flex-row text-center items-center">
        <div className="mb-4 mr-8 text-2xl">系统配置:</div>
        <form className="flex flex-row">
          <div className="mr-8">
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              type="text"
              placeholder="请输入系统配置id"
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>
          <div className="mr-8">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="请输入系统配置名"
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>
          <div className="mr-8">
            <input
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              type="text"
              placeholder="请输入系统配置值"
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>
          <div className="mr-8">
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="请输入系统配置说明"
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>
          <div className="mr-8">
            <input
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              type="text"
              placeholder="请输入系统状态"
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="btn text-white border-0 transition duration-500 ease transform hover:-translate-y-1"
            style={{"backgroundColor":"rgb(81, 140, 180)"}}
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
              <th className="text-lg">系统配置id</th>
              <th className="text-lg">系统配置名</th>
              <th className="text-lg">系统配置值</th>
              <th className="text-lg">系统配置说明</th>
              <th className="text-lg">状态</th>
            </tr>
          </thead>
          <tbody>
            {allSystem.map((system) => {
              return (
                <Table
                  system={system}
                  setId={setId}
                  setName={setName}
                  setStatus={setStatus}
                  setDescription={setDescription}
                  setValue={setValue}
                  key={system.id}
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
  system,
  setId,
  setName,
  setDescription,
  setValue,
  setStatus,
}) {
  const inputref = useRef();
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const newCheck = !checked;
    setChecked(newCheck);
    if (inputref.current.value === "on") {
      setId(system.id);
      setName(system.name);
      setDescription(system.description);
      setStatus(system.status);
      setValue(system.value);
      inputref.current.value = "";
    } else {
      setId("");
      setName("");
      setDescription("");
      setStatus("");
      setValue("");
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
      <td>{system.id}</td>
      <td>{system.name}</td>
      <td>{system.value === null ? <p>无</p> : <p>{system.value}</p>}</td>
      <td>{system.description}</td>
      <td className="flex items-center text-center justify-center">
        {system.status === 1 ? (
          <div className="w-4 h-4 rounded-full bg-green-400"></div>
        ) : (
          <div className="w-4 h-4 rounded-full bg-red-400"></div>
        )}
      </td>
    </tr>
  );
}

export default SystemConf;
