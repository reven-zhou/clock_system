import React, { useState } from "react";
import useAuthStore from "../store/authStore";
import imgUrl from "../img/bg1.jpg";
import bgImg from "../img/3.png";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Spinner from "./Spinner";
import axios from "axios";
import { useAlert } from "react-alert";
import { reqModifyAvatar, reqModifyNotify } from "../api";

const BaseInfo = ({ baseInfo, user }) => {
  const alert = useAlert();
  const { dayProblem, allHistory } = useAuthStore();
  const [text, setText] = useState("Information");
  const [activeBtn, setActiveBtn] = useState("information");
  const [imageAsset, setImageAsset] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newNotify, setNewNotify] = useState("");

  const randomImage =
    "https://source.unsplash.com/1600x900/?nature,photography,technology";
  const activeBtnStyles =
    "bg-red-400 text-white font-bold p-2 rounded-full w-40 outline-none";
  const notActiveBtnStyles =
    "bg-gray-100 mr-4 text-black font-bold p-2 rounded-full w-40 outline-none";

  /* 使用URL.createObjectURL(file)实现图片上传前预览 */
  const uploadImage = (e) => {
    const file = e.target.files[0];
    const { type, name } = e.target.files[0];
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);
      setAvatarFile(e.target.files[0]);
      setImageAsset(URL.createObjectURL(file));
      setLoading(false);
    } else {
      alert.error("文件格式不正确，请重试");
      setWrongImageType(true);
    }
  };

  /* 修改头像 */
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    //可以通过append()方法来追加数据
    formdata.append("avatar", avatarFile);
    axios
      .post("/api1/user/modifyAvatar", formdata, {
        headers: { token: JSON.parse(localStorage.getItem("token")) },
      })
      .then((res) => {
        alert.success(res.data.msg);
        setImageAsset("");
        setAvatarFile("");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
  };

  /* 修改信息 */
  const handleChangeNotify = (e) => {
    e.preventDefault();
    if (newNotify === "") {
      alert.error("宣言不能为空");
    } else {
      reqModifyNotify(newNotify).then((data) => {
        alert.success(data.msg);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
    }
  };

  return (
    <div>
      {/* 主页的呈现效果 */}
      <div className="relative pb-2 h-full justify-center items-center">
        <div className="flex flex-col pb-5">
          <div className="relative flex flex-col mb-7">
            {/* 头像和上面的图片 */}
            <div className="flex flex-col justify-center items-center">
              <img
                src={imgUrl.src}
                alt="jpg"
                className="w-full h-370 2xl:h-510 shadow-lg object-cover rounded-xl"
              />
              <img
                className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
                src={user.userImage}
                alt="用户"
              />
              <h1
                className="font-bold text-3xl text-center mt-3"
                style={{ color: "rgb(176, 135, 141)" }}
              >
                {user.username}
              </h1>
            </div>

            {/* 头像下的切换按钮 */}
            <div className="text-center mt-4 mb-7">
              <button
                type="button"
                onClick={(e) => {
                  setText(e.target.textContent);
                  setActiveBtn("information");
                }}
                className={`${
                  activeBtn === "information"
                    ? activeBtnStyles
                    : notActiveBtnStyles
                }`}
              >
                Information
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setText(e.target.textContent);
                  setActiveBtn("history");
                }}
                className={`${
                  activeBtn === "history" ? activeBtnStyles : notActiveBtnStyles
                }`}
              >
                History
              </button>
            </div>

            {/* 切换的逻辑 */}
            {activeBtn === "information" ? (
              <>
                {/* 基本信息和个人信息 */}
                <div className="flex justify-between mb-4">
                  <div
                    className="btn"
                    style={{
                      color: "rgb(168, 177, 184)",
                      backgroundColor: "white",
                    }}
                  >
                    基本信息
                  </div>
                  <div
                    className="btn"
                    style={{
                      color: "rgb(168, 177, 184)",
                      backgroundColor: "white",
                    }}
                  >
                    个人信息
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* 基本信息：第几周第几天这样*/}
                  <div
                    className="container flex flex-col text-white rounded-lg p-4"
                    style={{ backgroundColor: "rgb(168, 177, 184)" }}
                  >
                    <div className="flex flex-row justify-between mb-4">
                      <div>本周是第{baseInfo.curWeek}周</div>
                      <div>今天是本周第{baseInfo.dayOfWeek}天</div>
                    </div>
                    <div className="flex flex-row">
                      <div className="flex flex-row">
                        本周值日生：
                        {baseInfo.names?.map((item) => {
                          return (
                            <div key={Math.random()} className="mr-4">
                              {item}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div>公告: {baseInfo.extra}</div>
                    </div>
                  </div>

                  {/* 这里准备放个人信息 */}
                  <div
                    className="container grid grid-rows-3 gap-4 text-white rounded-lg p-4"
                    style={{ backgroundColor: "rgb(168, 177, 184)" }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        我的头像：
                        <div className="avatar">
                          <div className="w-10 rounded-full">
                            <img src={user.userImage} />
                          </div>
                        </div>
                      </div>

                      <label
                        htmlFor="my-modal-3"
                        className="modal-button btn btn-sm items-center text-center"
                        style={{ backgroundColor: "rgb(71, 88, 95)" }}
                      >
                        修改头像
                      </label>
                      <input
                        type="checkbox"
                        id="my-modal-3"
                        className="modal-toggle"
                      />
                      <div className="modal text-black">
                        <div className="modal-box relative">
                          {/* 这里可以调出弹窗，注意id */}
                          <label
                            htmlFor="my-modal-3"
                            className="btn btn-sm btn-circle absolute right-2 top-2"
                          >
                            ✕
                          </label>
                          <div>
                            <h3 className="text-lg font-bold">选择一张图片</h3>
                            {/* 上传图片之前可以进行预览，可以选择清空也可以点击按钮上传 */}
                            <div className="items-center">
                              {loading && <Spinner />}
                              {wrongImageType && (
                                <p className="text-center text-lg mb-4 mt-2">
                                  错误的文件格式，请选择正确的图片
                                </p>
                              )}
                              {!imageAsset ? (
                                <label>
                                  <div className="flex flex-col items-center justify-center h-full cursor-pointer">
                                    <div className="flex flex-col justify-center items-center">
                                      <p className="text-3xl">
                                        <AiOutlineCloudUpload />
                                      </p>
                                      <p className="text-lg"> 点击上传</p>
                                    </div>
                                    <p className="text-gray-400">
                                      Use JPG, JPEG, SVG, PNG, GIF or TIFF less
                                      than 20MB
                                    </p>
                                  </div>
                                  <input
                                    type="file"
                                    name="upload-image"
                                    onChange={uploadImage}
                                    className="w-0 h-0"
                                  />
                                </label>
                              ) : (
                                <>
                                  <div className="relative h-full">
                                    <img
                                      src={imageAsset}
                                      alt="upload-img"
                                      className="h-full w-full"
                                    />
                                    <button
                                      type="button"
                                      className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                                      onClick={() => setImageAsset(null)}
                                    >
                                      <MdDelete />
                                    </button>
                                  </div>
                                  <button
                                    onClick={handleSubmit}
                                    className="w-full btn mt-4 flex justify-center items-center"
                                  >
                                    上传图片
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>我的宣言：{user.userNotify}</div>
                      <label
                        htmlFor="my-modal-1"
                        className="btn btn-sm modal-button"
                        style={{ backgroundColor: "rgb(71, 88, 95)" }}
                      >
                        修改宣言
                      </label>
                      <input
                        type="checkbox"
                        id="my-modal-1"
                        className="modal-toggle"
                      />
                      <div className="modal text-black">
                        <div className="modal-box relative">
                          <label
                            htmlFor="my-modal-1"
                            className="btn btn-sm btn-circle absolute right-2 top-2"
                          >
                            ✕
                          </label>
                          <h3 className="text-lg font-bold mb-4">
                            请输入你的宣言
                          </h3>
                          <input
                            onChange={(e) => setNewNotify(e.target.value)}
                            type="text"
                            placeholder="请输入你的宣言"
                            className="input input-bordered w-full"
                          />
                          <button
                            onClick={handleChangeNotify}
                            className="w-full btn mt-4 flex justify-center items-center"
                          >
                            上传宣言
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>我的积分：{user.userIntegral}</div>
                  </div>
                </div>

                {/* 每日一题 */}

                <div className="flex flex-col mt-4 mb-4">
                  <a
                    href={dayProblem.url}
                    target="blank"
                    className="w-full btn mb-4"
                    style={{
                      color: "rgb(168, 177, 184)",
                      backgroundColor: "white",
                    }}
                  >
                    <div
                      style={{
                        color: "rgb(168, 177, 184)",
                        backgroundColor: "white",
                      }}
                    >
                      每日一题
                    </div>
                  </a>
                  <div
                    className="flex justify-between p-4 border rounded-lg text-white"
                    style={{ backgroundColor: "rgb(168, 177, 184)" }}
                  >
                    <div className="">题目: {dayProblem.name}</div>
                    <div className="">
                      链接:
                      <a
                        target="blank"
                        href={dayProblem.url}
                        className="ml-2 link"
                        style={{ color: "rgb(245, 243, 244)" }}
                      >
                        {dayProblem.url}
                      </a>
                    </div>
                    <div className="ml-20 flex items-center">
                      难度:
                      {dayProblem.difficult === 1 && (
                        <div className="w-4 h-4 rounded-full bg-green-400"></div>
                      )}
                      {dayProblem.difficult === 2 && (
                        <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                      )}
                      {dayProblem.difficult === 3 && (
                        <div className="w-4 h-4 rounded-full bg-red-400"></div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* 历史打卡情况 */}
                {allHistory.length ? (
                  <div className="flex flex-col mt-4 mb-4">
                    {/* <div className="p-4">历史打卡信息</div> */}
                    <div className="overflow-x-auto">
                      <table className="table w-full">
                        <thead>
                          <tr className="text-center">
                            <th></th>
                            <th className="text-lg">周次</th>
                            <th className="text-lg">打卡时长</th>
                            <th className="text-lg">完成情况</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allHistory?.map((item, index) => {
                            return (
                              <tr key={item.historyId} className="text-center">
                                <th>{index + 1}</th>
                                <td>{item.weeks}</td>
                                <td>{parseInt(item.clockTime / 60)}</td>
                                <td className="flex items-center text-center justify-center">
                                  {item.complete === 1 ? (
                                    <div className="w-4 h-4 rounded-full bg-green-400"></div>
                                  ) : (
                                    <div className="w-4 h-4 rounded-full bg-red-400"></div>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center h-96">
                    <img
                      className="w-1/2 items-center justify-center"
                      src={bgImg.src}
                      alt="404"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseInfo;
