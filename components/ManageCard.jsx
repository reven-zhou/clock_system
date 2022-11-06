import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { GetLiatCard } from "../util/getLIstCard";
import useCardStore from "../store/cardSrore";
import useAuthStore from "../store/authStore";
import { reqUseCard, reqGetCard, reqMeltCard } from "../api";
import { useAlert } from "react-alert";

/* 这里不要了，改成动态的 */
const listCard = [
  {
    cardId: 1,
    name: "减时卡",
    description: "让自己本周的打卡目标时长暂时减一",
    odds: "7%",
  },
  {
    cardId: 2,
    name: "加时卡",
    description: "让本周本年级的某位同学打卡目标时长暂时加一，限周六前使用",
    odds: "6%",
  },
  {
    cardId: 3,
    name: "恶魔卡",
    description: "让本周本年级的所有同学目标打卡时长暂时加一，限周六前使用",
    odds: "3%",
  },
  {
    cardId: 4,
    name: "天使卡",
    description: "让本周本年级的所有同学目标打卡时长暂时减一",
    odds: "1%",
  },
  {
    cardId: 5,
    name: "福利卡",
    description: "让自己的目标打卡时长永久减一",
    odds: "1%",
  },
  {
    cardId: 6,
    name: "黑卡",
    description: "让本年级的一位同学目标打卡时长永久加一，限周六前使用",
    odds: "2%",
  },
  {
    cardId: 7,
    name: "?卡",
    description: "随机让本学年一位同学本周目标打卡时长随机+-1",
    odds: "6%",
  },
];

const ManageCard = ({ user }) => {
  const alert = useAlert();
  const { allCard, addMyCard } = useCardStore();
  const { myIntegral, addUser, addmyIntegral } = useAuthStore();
  const [userId, setUserId] = useState("");
  const [userCardId, setUserCardId] = useState("");
  const [integral, setIntegral] = useState(myIntegral);

  useEffect(() => {
    GetLiatCard(JSON.parse(localStorage.getItem("token")), addMyCard);
  }, []);

  /* 抽卡 */
  const handleGetCard = (e) => {
    e.preventDefault();
    reqGetCard().then((data) => {
      if (data.code === 200) {
        if (myIntegral - 1 >= 0) {
          addmyIntegral(myIntegral - 1);
        }
        alert.info(data.msg);
      } else {
        alert.info("抽卡失败或者积分不足。");
      }
    });
  };

  /* 融卡 */
  const handleMeltCard = (e) => {
    e.preventDefault();
    reqMeltCard(userCardId).then((data) => {
      // addUser({ ...user, ["integral"]: integral + 1 });

      if (data.code === 200) {
        addmyIntegral(myIntegral + 1);
        alert.success("融化成功");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        alert.error("是不是还没选卡?");
      }
    });
  };

  /* 用卡 */
  const handleUseCard = (e) => {
    e.preventDefault();
    reqUseCard(userCardId, userId).then((data) => {
      if (data.code === 200) {
        alert.info(data.msg);
        setUserId("");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        alert.info("没选卡或者没输id?");
      }
    });
  };

  return (
    <div className="h-screen">
      <div className="mt-8 items-center">
        {/* 卡券规则 */}
        <div className="collapse rounded-xl">
          <input type="checkbox" className="peer" />
          <div
            style={{ backgroundColor: "rgb(81, 140, 180)" }}
            className="collapse-title text-xl text-primary-content peer-checked:text-secondary-content flex flex-row items-center"
          >
            卡券相关规则
            <div className="ml-2 font-semibold text-2xl text-center">{">"}</div>
          </div>
          <div
            style={{ backgroundColor: "rgb(81, 140, 180)" }}
            className="collapse-content bg-accent text-primary-content peer-checked:text-secondary-content"
          >
            {/* 改文本 */}
            <p>1、每位用户有2分的初始积分和3张卡券</p>
            <p>3、每周全勤打卡奖励3积分</p>
            <p>4、超出打卡时长n小时就送n积分</p>
            <p>5、消耗积分即可抽卡</p>
            <p>6、可选择融卡获得积分, 1张卡为1积分</p>
            <p>
              7、使用加时卡和黑卡需指定用户ID, 可在年级打卡表得到 (注:
              其余卡为群体效果, 用户ID可随意填写)
            </p>
            <p>8、会有一点点延迟, 请不要狂点</p>
          </div>
        </div>
        {/* 卡券概率公示 */}
        <div className="collapse rounded-xl mt-4">
          <input type="checkbox" className="peer" />
          <div
            style={{ backgroundColor: "rgb(81, 140, 180)" }}
            className="collapse-title text-xl text-primary-content peer-checked:text-secondary-content flex flex-row items-center"
          >
            卡券说明
            <div className="ml-2 font-semibold text-2xl text-center">{">"}</div>
          </div>
          <div
            style={{ backgroundColor: "rgb(81, 140, 180)" }}
            className="collapse-content bg-accent text-primary-content peer-checked:text-secondary-content"
          >
            <div class="overflow-x-auto">
              <table class="table w-full text-black">
                <thead>
                  <tr className="items-center">
                    <th className="text-lg">卡ID</th>
                    <th className="text-lg">卡券名</th>
                    <th className="text-lg">卡券作用</th>
                    <th className="text-lg">卡券概率</th>
                  </tr>
                </thead>
                <tbody>
                  {listCard.map((item) => {
                    return (
                      <tr key={item.name}>
                        <th>{item.cardId}</th>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.odds}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        {/* 抽卡 */}
        <div>
          <button
            onClick={handleGetCard}
            className="btn btn-outline btn-accent text-xl"
          >
            抽卡
          </button>
        </div>

        {/* 用卡 */}
        <div>
          <form className="flex flex-row">
            <div className="mr-8">
              <input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                type="text"
                placeholder="请输入用户id（非加时卡和黑卡可随意填写数字）"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div>
              <button
                onClick={handleUseCard}
                type="submit"
                className="btn btn-outline btn-wide btn-warning text-xl"
              >
                使用
              </button>
            </div>
          </form>
        </div>

        {/* 融卡 */}
        <div>
          <button
            onClick={handleMeltCard}
            className="btn btn-outline btn-wide btn-error text-xl"
          >
            融卡
          </button>
        </div>
        <div>
          <button className="btn btn-outline btn-error text-xl">
            我的积分：{myIntegral}
          </button>
        </div>
      </div>

      <div className="mt-8 mb-4">
        <button className="btn btn-outline btn-error text-xl mb-6 w-full">
          我的卡券
        </button>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-center">
                <th className="text-lg">#</th>
                <th className="text-lg">卡券ID</th>
                <th className="text-lg">卡券名</th>
                <th className="text-lg">卡券描述</th>
                <th className="text-lg">概率</th>
                <th className="text-lg">数量</th>
              </tr>
            </thead>
            <tbody>
              {allCard?.map((card) => {
                return <Table card={card} setUserCardId={setUserCardId} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function Table({ card, setUserCardId }) {
  const inputref = useRef();
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const newCheck = !checked;
    setChecked(newCheck);
    if (inputref.current.value === "on") {
      // if(card.num)
      setUserCardId(card.cardId);
      inputref.current.value = "";
    } else {
      setUserCardId("");
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
      <td>{card.cardId}</td>
      <td>{card.name}</td>
      <td>{card.description}</td>
      <td>{card.odds + "%"}</td>
      <td>{card.num}</td>
    </tr>
  );
}

export default ManageCard;
