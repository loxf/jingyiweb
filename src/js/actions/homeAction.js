import {Toast} from 'antd-mobile';
import {INIT_DATA, ACTIVITY_LIST, PRODUCT_LIST, LESSION_TYPES,USER_INFO,AREA_DATA,SCROLL_POSITION} from './actionsTypes'
import commonAction from './commonAction';
import commonService from "../services/commonService";

export const initData = data => ({type: INIT_DATA, data: data}); //首页初始化信息
export const activityData = data => ({type: ACTIVITY_LIST, data: data}); //活动信息
export const lessionTypes = data => ({type: LESSION_TYPES, data: data}); //课程类型
export const productList = data => ({type: PRODUCT_LIST, data: data}); //商品列表
export const userInfo = data => ({type: USER_INFO, data: data}); //商品列表
export const areaData = data => ({type: AREA_DATA, data: data}); //地址列表
export const scrollPosition=data=>({type: SCROLL_POSITION, data: data});//滚动条位置

export const getInitData=(data,callBack)=> {
    return commonAction.simplePost(data,'api/index/init',initData,callBack);
};

//获取活动信息
export const getActivityData=(data,callBack)=> {
    return commonAction.simplePost(data,'api/active/list',activityData,callBack);
};
//获取课程类型
export const getTypeOfLession=(data,callBack)=> {
    return commonAction.simplePost(data,'api/offer/catalog',lessionTypes,callBack);
};


//获取商品列表
export const getProductList=(data,callBack)=> {
    return commonAction.simplePost(data,'api/offer/list',productList,callBack);
};

//获取用户信息
export const getUserInfo=(data,callBack)=> {
    return commonAction.simplePost(data,'api/getUserInfo',userInfo,callBack);
};

//获取地址
export const getArea=(data,callBack)=> {
    return commonAction.simplePost(data,'api/system/getArea',areaData,callBack);
};

//获取推广分享的图片
export const sharePage=(data,callBack)=> {
    return commonAction.simplePost(data,'api/share/queryQRPic',undefined,callBack);
};

//用户签到
export const userSign=(data,callBack)=>{
    return (dispatch, getState) => {
        Toast.hide();
        Toast.loading("", 30, () => Toast.info("网络错误", 2));
        commonService.post(data,'api/sign').then(resultData=>{
            Toast.hide();
            if(resultData.code=='1'){
                Toast.info('签到成功', 2);
                callBack&&callBack();
            }
            else{
                Toast.info(resultData.msg, 2);
            }
        }).catch((e)=>{
            Toast.info("网络错误", 2);
        })
    }
};

//成为代理商
export const beAgent=(data,callBack)=>{
    return (dispatch, getState) => {
        Toast.hide();
        Toast.loading("", 30, () => Toast.info("网络错误", 2));
        commonService.post(data,'api/cust/beAgent').then(resultData=>{
            Toast.hide();
            if(resultData.code=='1'){
                callBack&&callBack();
            }
            else{
                Toast.info(resultData.msg, 2);
            }
        }).catch((e)=>{
            Toast.info("网络错误", 2);
        })
    }
};



