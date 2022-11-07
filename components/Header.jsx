import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChartBarIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import useAuthStore from "../store/authStore";
import axios from "axios";
import Router from "next/router";
import { reqLogOut } from "../api";
import { useAlert } from "react-alert";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const alert = useAlert();
  const { userProfile, allTitle, removeUser, removeTitle } = useAuthStore();
  const [isManager, setisManager] = useState(false);
  const [grade1, setGrade1] = useState({ title: "大一" });
  const [grade2, setGrade2] = useState({ title: "大二" });
  const [grade3, setGrade3] = useState({ title: "其他年级" });

  useEffect(() => {
    if (allTitle.length) {
      allTitle.map((title) => {
        if (title.key === "/freshman") {
          setGrade1(title);
        }
        if (title.key === "/sophomore") {
          setGrade2(title);
        }
        if (title.key === "/others") {
          setGrade3(title);
        }
      });
    }
    if (allTitle.length > 8) {
      setisManager(true);
    }
  }, [grade1, grade2, grade3]);

  const handleLogout = () => {
    reqLogOut().then(() => {
      Router.replace("/auth");
      removeUser();
      removeTitle();
      localStorage.clear();
    });
  };

  return (
    <Popover className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            {/* <a href="#">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a> */}
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          {allTitle.length ? (
            <Popover.Group as="nav" className="hidden space-x-10 md:flex">
              {allTitle.map((title) => {
                if (title.key === "/freshman") {
                  return (
                    <Popover key={title.key} className="relative">
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className={classNames(
                              open ? "text-gray-900" : "text-gray-500",
                              "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:ring-offset-2 text-center"
                            )}
                          >
                            <span className="text-center items-center p-2">
                              年级
                            </span>
                            <ChevronDownIcon
                              className={classNames(
                                open ? "text-gray-600" : "text-gray-400",
                                "ml-2 h-5 w-5 group-hover:text-gray-500"
                              )}
                              aria-hidden="true"
                            />
                          </Popover.Button>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                  <Link href={`/grade/1`}>
                                    <div className="cursor-pointer -m-3 flex items-start rounded-lg p-3 hover:bg-rose-50">
                                      <div className="ml-4">
                                        <p className="transition delay-50 duration-300 cursor-pointer text-base font-medium text-gray-900">
                                          {grade1?.title}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>

                                  <Link href={`/grade/2`}>
                                    <div className="transition delay-50 duration-300 cursor-pointer -m-3 flex items-start rounded-lg p-3 hover:bg-rose-50">
                                      <div className="ml-4">
                                        <p className="cursor-pointer text-base font-medium text-gray-900">
                                          {grade2?.title}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                  <Link href={`/grade/3`}>
                                    <div className="transition delay-50 duration-300 cursor-pointer -m-3 flex items-start rounded-lg p-3 hover:bg-rose-50">
                                      <div className="ml-4">
                                        <p className="cursor-pointer text-base font-medium text-gray-900">
                                          {grade3?.title}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  );
                } else {
                  if (
                    title.key !== "/sophomore" &&
                    title.key !== "/others" &&
                    title.title !== "首页" &&
                    title.title !== "考勤管理" &&
                    title.title !== "用户信息" &&
                    title.title !== "管理员菜单头" &&
                    title.title !== "队长菜单头"
                  )
                    return (
                      <Link
                        key={title.key}
                        href={title.key}
                        className="text-base font-medium text-gray-500 hover:text-white"
                      >
                        <div className="transition delay-50 duration-300 text-gray-500 hover:text-white hover:bg-rose-500/50 cursor-pointer p-2 rounded-lg">
                          {title.title === "所有" ? "首页" : title.title}
                        </div>
                      </Link>
                    );
                }
              })}
            </Popover.Group>
          ) : (
            <div></div>
          )}

          {userProfile ? (
            <>
              <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <Link href="/home">
                      <img
                        // unoptimized
                        // loader={grpahCMSImageLoader}
                        alt="头像"
                        height="40px"
                        width="40px"
                        // className="rounded-full cursor-pointer"
                        src={userProfile.userImage}
                      />
                    </Link>
                  </div>
                </label>

                <p className="inline text-gray-700 ml-2 font-medium text-lg">
                  {userProfile.username}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="transition duration-500 ease transform hover:-translate-y-1 ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm"
                style={{ backgroundColor: "rgb(220, 166, 179)" }}
              >
                退出
              </button>
            </>
          ) : (
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <button
                style={{ backgroundColor: "rgb(81, 140, 180)" }}
                className="transition duration-500 ease transform hover:-translate-y-1 ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm"
              >
                <Link href="/auth">登录</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </Popover>
  );
};

export default Header;
