import {MY_INIT,MY_CLASSMATE,INTERGRAL_DETAIL,MY_ACTIVITY,MY_ORDER,INTEGRAL_RANKING,WATCH_RECORD} from './actionsTypes'
import commonAction from './commonAction';

export const myInit = data => ({type: MY_INIT, data: data}); //首页初始化信息
export const myClassMate = data => ({type: MY_CLASSMATE, data: data}); //我的同学
export const integralDetail = data => ({type: INTERGRAL_DETAIL, data: data}); //积分明细
export const myActivities = data => ({type: MY_ACTIVITY, data: data}); //我的活动
export const myOrder = data => ({type: MY_ORDER, data: data}); //我的订单
export const integralRanking= data => ({type: INTEGRAL_RANKING, data: data}); //积分排行榜
export const watchRecord= data => ({type: WATCH_RECORD, data: data}); //积分排行榜

export const getMyinit=(data,callBack)=> {
    return commonAction.simplePost(data,'api/cust/init',myInit,callBack);
};

//我的同学
export const getMyClassmate=(data,callBack)=> {
    return commonAction.simplePost(data,'api/cust/myClassmate',myClassMate,callBack);
};

//积分明细
export const getMyIntegralDetail=(data,callBack)=> {
    return commonAction.simplePost(data,'api/cust/bpDetail',integralDetail,callBack);
};

//我的活动
export const getMyActivity=(data,callBack)=> {
    return commonAction.simplePost(data,'api/cust/activity',myActivities,callBack);
};

//我的订单
export const getMyOrder=(data,callBack)=> {
    return commonAction.simplePost(data,'api/cust/myorder',myOrder,callBack);
};

//积分排行榜
export const getIntegralRanking=(data,callBack)=> {
    return commonAction.simplePost(data,'api/bp/rankingList',integralRanking,callBack);
};

//观看记录
export const getWatchRecord=(data,callBack)=> {
    return commonAction.simplePost(data,'api/cust/watchRecordList',watchRecord,callBack);
};

//发送验证码
export const sendMsg=(data,callBack)=> {
    return commonAction.simplePost(data,'api/sendMsg',undefined,callBack);
};

export const bindPhoneOrEmail=(data,callBack)=>{
    return commonAction.simplePost(data,'api/cust/bindPhone',undefined,callBack);
};