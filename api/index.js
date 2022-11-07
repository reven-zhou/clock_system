import ajax from "./ajax";

const prefix = "/api";

const noAuth = '/noauth'

// 注销
export const reqLogOut = () => ajax(prefix+noAuth+'/user/lout', null, 'GET');

// 获取所有菜单
export const reqGetAllTitle = () => ajax(prefix+'/user/getMenus', null, 'GET');

// 获取用户信息
export const reqGetUser = () => ajax(prefix+'/user/getUser', null, 'GET');

// 获取基本信息
export const reqGetBaseInfo = () => ajax(prefix+'/user/getBaseInfo', null, 'GET');

//获取每日一题
export const reqGetDayProblem = () => ajax(prefix+'/user/getProblem', null, 'GET');

// 获取打卡历史
export const reqGetHistory = () => ajax(prefix+'/user/getHistory', null, 'GET');

// 修改头像
export const reqModifyAvatar = (data) => ajax(prefix+'/user/modifyAvatar', data, 'POST');

// 修改宣言
export const reqModifyNotify = (newNotify) => ajax(`${prefix}/user/modifyNotify?notify=${newNotify}`, null, 'POST');

// 获取各年级的打卡信息
export const reqGetGradeClock = (grade) => ajax(`${prefix}/user/getAllClockByGrade?grade=${grade}`, null, 'GET');

// 获取所有打卡信息
export const reqGetAllClock = () => ajax(prefix+'/user/getAllClock', null, 'GET');

// 修改个人打卡信息
export const reqModifyPersonClock = (data) => ajax(prefix+'/manager/modifyClock', data, 'POST');

// 批量修改打卡信息
export const reqModifySomeClock = (time, data) => ajax(`${prefix}/manager/modifySomeTempTime?time=${time}`, data, 'POST');

// 获取所有值日信息

export const reqGetAllClean = () => ajax(prefix+'/manager/getCleanAll', null, 'GET');

// 添加值日人员
export const reqAddClean = (data) => ajax(prefix+'/manager/addClean', data, 'POST');

// 修改值日人员信息
export const reqModifyClean = (data) => ajax(prefix+'/manager/modifyClean', data, 'POST');

// 获取所有卡券
export const reqGetAllCard = () => ajax(prefix+'/user/listCards', null, 'GET');

// 抽卡
export const reqGetCard = () => ajax(prefix+'/user/sample', null, 'GET');

// 用卡
export const reqUseCard = (userCardId, userId) => ajax(`${prefix}/user/useCard?cardId=${userCardId}&userId=${userId}`, null, 'POST');

// 融卡
export const reqMeltCard = (userCardId) => ajax(`${prefix}/user/meltCard?cardId=${userCardId}`, null, 'POST');

// 获取系统配置
export const reqGetSystem = () => ajax(prefix+'/manager/listSystemConf', null, 'GET');

// 修改系统配置
export const reqModifySystem = (data) => ajax(prefix+'/manager/modifySystemConf', data, 'POST');


// 管理员下卡
export const reqAdminEndClock = (userId) => ajax(`${prefix}/captain/endClockByUserId?userId=${userId}`, null, 'POST');


// 打卡
export const reqOnClock = () => ajax(prefix+'/user/startClock', null, "POST");

// 下卡
export const reqEndClock = () => ajax(prefix+'/user/endClock', null, "POST");

// 查看当前时间
export const reqCurTime = () => ajax(prefix+'/user/curClock', null, "GET")
