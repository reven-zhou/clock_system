import React from "react";
/* 周一到周天不要啦 */
const Clocktable = ({ grade, allClock }) => {
  if (allClock?.length === 0) {
    return <div>还没有人注册哦</div>;
  }
  const title = [
    "ID",
    "姓名",
    "头像",
    // "周一",
    // "周二",
    // "周三",
    // "周四",
    // "周五",
    // "周六",
    // "周日",
    "本周时长",
    "周一重置",
    "本周目标",
    "打卡中",
  ];
  return (
    <div className="flex flex-col rounded-lg h-screen mt-4">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-xl">
            <table className="table w-full text-center shadow-md">
              <thead className="border-b bg-gray-800">
                <tr>
                  {title.map((index) => {
                    return (
                      <th
                        key={index}
                        scope="col"
                        className="text-lg font-medium text-black px-6 py-4"
                      >
                        {index}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {allClock?.map((clock) => {
                  return (
                    <tr key={clock.realname} className="bg-white border-b items-center">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {clock.userId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {clock.realname}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {parseInt(clock.monTime/60)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {parseInt(clock.tueTime/60)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {parseInt(clock.wedTime/60)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {parseInt(clock.thuTime/60)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {parseInt(clock.friTime/60)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {parseInt(clock.satTime/60)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {parseInt(clock.sunTime/60)}
                      </td> */}
                      <td className=" py-4 whitespace-nowrap text-sm font-medium text-gray-900 items-center text-center">
                        <img src={clock.avatar} alt="avatar" className="rounded-full w-10 mx-auto"/>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {parseInt(clock.curTime/60)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {parseInt(clock.allTime/60)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {parseInt(clock.tempTime /60)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 items-center">
                        {clock.online === 1 ? (
                          <div className="w-4 h-4 items-center rounded-full bg-green-400 mx-auto"></div>
                        ) : (
                          <div className="w-4 h-4 items-center rounded-full bg-red-400 mx-auto"></div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clocktable;
