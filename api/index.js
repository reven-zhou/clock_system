import ajax from "./ajax";
// import {BASE_URL} from "../utils/constants";

// 登录
// export const reqLogin = ()=>ajax(`/apilogin?username=${username}&password=${password}&code=${code}`)

// 注册

// 注销
export const reqLogOut = () => ajax('/api1/user/lout', null, 'GET');

// 获取所有菜单
export const reqGetAllTitle = () => ajax('/api1/user/getMenus', null, 'GET');

// 获取用户信息
export const reqGetUser = () => ajax('/api1/user/getUser', null, 'GET');

// 获取基本信息
export const reqGetBaseInfo = () => ajax('/api1/user/getBaseInfo', null, 'GET');

//获取每日一题
export const reqGetDayProblem = () => ajax('/api1/user/getProblem', null, 'GET');

// 获取打卡历史
export const reqGetHistory = () => ajax('/api1/user/getHistory', null, 'GET');

// 修改头像
export const reqModifyAvatar = (data) => ajax('/api1/user/modifyAvatar', data, 'POST');

// 修改宣言
export const reqModifyNotify = (newNotify) => ajax(`/api1/user/modifyNotify?notify=${newNotify}`, null, 'POST');

// 获取各年级的打卡信息
export const reqGetGradeClock = (grade) => ajax(`/api1/user/getAllClockByGrade?grade=${grade}`, null, 'GET');

// 获取所有打卡信息
export const reqGetAllClock = () => ajax('/api1/user/getAllClock', null, 'GET');

// 修改个人打卡信息
export const reqModifyPersonClock = (data) => ajax('/api1/manager/modifyClock', data, 'POST');

// 批量修改打卡信息
export const reqModifySomeClock = (time, data) => ajax(`/api1/manager/modifySomeTempTime?time=${time}`, data, 'POST');

// 获取所有值日信息
export const reqGetAllClean = () => ajax('/api1/captain/getCleanAll', null, 'GET');

// 添加值日人员
export const reqAddClean = (data) => ajax('/api1/captain/addClean', data, 'POST');

// 修改值日人员信息
export const reqModifyClean = (data) => ajax('/api1/captain/modifyClean', data, 'POST');

// 获取所有卡券
export const reqGetAllCard = () => ajax('/api1/user/listCards', null, 'GET');

// 抽卡
export const reqGetCard = () => ajax('/api1/user/sample', null, 'GET');

// 用卡
export const reqUseCard = (userCardId, userId) => ajax(`/api1/user/useCard?cardId=${userCardId}&userId=${userId}`, null, 'POST');

// 融卡
export const reqMeltCard = (userCardId) => ajax(`/api1/user/meltCard?cardId=${userCardId}`, null, 'POST');

// 获取系统配置
export const reqGetSystem = () => ajax('/api1/manager/listSystemConf', null, 'GET');

// 修改系统配置
export const reqModifySystem = (data) => ajax('/api1/manager/modifySystemConf', data, 'POST');

// 队长和管理员下卡
export const reqAdminEndClock = (userId) => ajax(`/api1/captain/endClockByUserId?userId=${userId}`, null, 'POST');

// 打卡
export const reqOnClock = () => ajax('/api1/user/startClock', null, "POST");

// 下卡
export const reqEndClock = () => ajax('/api1/user/endClock', null, "POST");

// 查看当前时间
export const reqCurTime = () => ajax('/api1/user/curClock', null, "GET")
