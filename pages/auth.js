import React, { useEffect, useState } from "react";
import axios from "axios";
// import { BASE_URL } from "../util";
import { CrateUser } from '../util';
import { GetBaseInfo } from "../util/getBaseInfo";
import useAuthStore from "../store/authStore";
import useBaseInfo from "../store/baseInfoStore";
import Router from 'next/router'
// import Link from "next/link";

function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  var base64 = `data:image/png;base64,${window.btoa(binary)}`;
  return base64;
}

const initialState = {
  username: "",
  password: "",
  code: "",
  grade: "",
  realname: "",
};

const Auth = () => {
  const {addmyIntegral, addUser, getAllTitle, changeStutas, addTotalTime,addProblem,addHistory } = useAuthStore();
  const { addBaseInfo } = useBaseInfo();
  const [isSignup, setIsSignup] = useState(false);
  const [verifyImg, setVerifyImg] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    axios
      .get("/api/verifyCode", {
        responseType: "arraybuffer",
      })
      .then((res) => {
        setVerifyImg(arrayBufferToBase64(res.data));
      });
  }, []);

  /* 处理表单输入数据 */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeVertifyImg = async () => {
    axios
      .get("/api/verifyCode", {
        responseType: "arraybuffer",
      })
      .then((res) => {
        setVerifyImg(arrayBufferToBase64(res.data));
      });
  };

  /* 处理登录和注册 */
  const handleSubmit = (e) => {
    e.preventDefault();
    // 判断密码输入是否符合规范
    if (formData.password.length < 6 || formData.password.length > 16) {
      alert("密码不符合规范请重新输入！");
    }
    if (isSignup) {
      axios.post(
        `/api/regis?username=${formData.username}&password=${formData.password}&grade=${formData.grade}&realname=${formData.realname}`
      )
        .then((res) => {
          // if (res.data.msg === 200) {
            alert(res.data.msg);
          // }
        })
    } else {
      axios
        .post(
          `/api/login?username=${formData.username}&password=${formData.password}&code=${formData.code}`
        )
        .then((res) => {
          if (res.data.code === 200) {
            localStorage.setItem('token', JSON.stringify(res.data.data))
            CrateUser(res.data.data, addUser, getAllTitle, changeStutas, addTotalTime,addProblem,addHistory,addmyIntegral);
            GetBaseInfo(res.data.data, addBaseInfo);
            Router.replace('/home');
          } else if (res.data.code === 600) {
            alert(res.data.msg);
          }
        })
    }
  };

  return (
    <div>
      {isSignup ? (
        <section className="h-screen">
          <div className="container px-6 py-12 h-full">
            <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
              <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  className="w-full"
                  alt="Phone image"
                />
              </div>
              <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <input
                      name="username"
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="用户名"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      name="password"
                      type="password"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="密码"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      name="grade"
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="年级"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      name="realname"
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="真实姓名"
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="transition duration-500 ease transform hover:-translate-y-1 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg ease-in-out w-full"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    注册
                  </button>
                </form>
                <div className="flex justify-between items-center mt-6">
                  <span
                    onClick={() => setIsSignup(false)}
                    className="transition duration-500 ease transform hover:-translate-y-1 cursor-pointer text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 ease-in-out"
                  >
                    已有账号? 点击登录
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="h-screen">
          <div className="container px-6 py-12 h-full">
            <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
              <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  className="w-full"
                  alt="Phone image"
                />
              </div>
              <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <input
                      name="username"
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="用户名"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      maxLength="16"
                      name="password"
                      type="password"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="密码,长度要不小于6,不大于16"
                      onChange={handleChange}
                      onInput={(e) => { e.target.value.replace(/^[a-zA-Z0-9_-]{6,16}$/) }}
                    />
                  </div>

                  <div className="mb-6 flex justify-between items-center">
                    <input
                      name="code"
                      type="text"
                      className="form-control block w-1/2 px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="验证码"
                      onChange={handleChange}
                    />
                    <div>
                      <img alt="验证码" src={verifyImg} />
                    </div>
                    <span
                      onClick={handleChangeVertifyImg}
                      className="transition duration-500 ease transform hover:-translate-y-1 cursor-pointer text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 ease-in-out"
                    >
                      换一张
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="transition duration-500 ease transform hover:-translate-y-1 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg ease-in-out w-full"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    登录
                  </button>


                </form>
                <div className="flex justify-between items-center mt-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck3"
                    // checked
                    />
                    <label
                      className="form-check-label inline-block text-gray-800"
                      for="exampleCheck2"
                    >
                      记住我
                    </label>
                  </div>
                  <span
                    onClick={() => setIsSignup(true)}
                    className="transition duration-500 ease transform hover:-translate-y-1 cursor-pointer text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 ease-in-out"
                  >
                    还没有账号? 点击注册
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Auth;
