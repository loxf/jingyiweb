/**
 * Created by 小敏哥on 2017/3/16.
 */
import {CAR_LIST, CURRENT_CAR_INDEX, HOME_PUBLIC_DATA,POSITION} from "./actionsTypes_bak";
import homeService from '../services/homeService';
import {Toast} from 'antd-mobile';

export const carList = data => ({type: CAR_LIST, data: data}); //车牌列表
export const currentCarIndex = data => ({type: CURRENT_CAR_INDEX, data: data});//选中的车牌号码z
export const homePublicData = data => ({type: HOME_PUBLIC_DATA, data: data});
export const position=data=>({type: POSITION, data: data});

export const getCityName=(data,callBack)=>{
    return (dispatch,getState)=>{
       /* Toast.hide();
        Toast.loading("", 30, () => Toast.info("网络错误", 2));*/
        homeService.getCityName(data).then(resultData => {
            //Toast.hide();
            if (resultData.code == 1000) {
                dispatch(position(resultData.data.cityName));
            }
            else {
                /* alert('api出错');
                 alert('状态码'+resultData.code);*/
                Toast.info(resultData.msg, 2);
            }
        });
    }
};

//获取跳转链接
export const getViewUri=(data,callBack)=>{
    return (dispatch,getState)=>{
        Toast.hide();
        Toast.loading("", 30, () => Toast.info("网络错误", 2));
        homeService.getViewUri(data).then(resultData=>{
            Toast.hide();
            if (resultData.code == 1000) {
                callBack(resultData.data.uri)
            }
            else {
                callBack(false)
            }
        });
    }
};

export const  checkIfOrderPay=(data, callBack) => {
    return (dispatch, getState) => {
        Toast.hide();
        Toast.loading("", 30, () => Toast.info("网络错误", 2));
        homeService.checkIfOrderPay(data).then(resultData => {
            Toast.hide();
            if (resultData.code == 1000) {
                callBack(resultData.data.orderId)
            }
            else {
               /* alert('api出错');
                alert('状态码'+resultData.code);*/
                callBack(false)
            }
        });
    }
};

//获取微信配置
export const getWeixinConfig=(data,callBack)=>{
    return (dispatch, getState) => {
        homeService.getWeixinConfig(data).then(resultData=>{
            if (resultData.code == 1000) {
                callBack(resultData.data);
            }
        });
    }
};

//获取车辆列表
export const getCarList = (data, callBack) => {
    return (dispatch, getState) => {
        Toast.hide(); //加载前 先关闭其他加载中的提示框 避免提示框一直存在的bug
        Toast.loading("", 30, () => Toast.info("网络错误", 2));
        homeService.getCarList(data).then(resultData => {
            Toast.hide();
            if (resultData.code == 1000) {
                dispatch(carList({
                    cars: resultData.data.cars
                }));
                if (callBack) {
                    callBack();
                }
            }
            else {
                Toast.info(resultData.msg, 2);
                /*if(window.location.href.indexOf('https://annualcheck.cx580.com/')< 0){
                    alert(sessionStorage.getItem("userId"));
                    alert(sessionStorage.getItem("token"));
                    alert(JSON.stringify(resultData.msg));
                }*/
            }
        })
    }
};

//添加车辆
export const addCar = (data, callBack) => {
    return (dispatch, getState) => {
        Toast.hide();
        Toast.loading("", 30, () => Toast.info("网络错误", 2));
        homeService.addCar(data).then(resultData => {
            Toast.hide();
            if (resultData.code == 1000) {
                callBack();
            }
            else {
                Toast.info(resultData.msg, 2);
            }
        })
    }
};


//检查车牌是否支持年检
export const checkInspection = (data, callBack) => {
    return (dispatch, getState) => {
        Toast.hide();
        Toast.loading("", 30, () => Toast.info("网络错误", 2));
        homeService.checkInspection(data).then(resultData => {
            Toast.hide();
            if (resultData.code == 1000) {
                if (callBack) {
                    callBack(resultData.data);
                }
            }
            else {
                Toast.info(resultData.msg, 2);
            }
        })
    }
};

export const getSliderTips=(data,callBack)=>{
    return (dispatch, getState) => {
        Toast.hide();
        Toast.loading("", 30, () => Toast.info("网络错误", 2));
        homeService.getSliderTips(data).then(resultData=>{
            Toast.hide();
            if (resultData.code == 1000) {
                if (callBack) {
                    callBack(resultData.data.tipInfo);
                }
            }
            else {
                Toast.info(resultData.msg, 2);
            }
        })
    }
};


