import commonAction from './commonAction';
//获取地址
export const getWeixinConfig=(data,callBack)=> {
    return commonAction.simplePost(data,'api/system/wxUrlConfig',undefined,callBack);
};

export const shareCallBack=(data,callBack)=> {
    return commonAction.simplePost(data,'api/share/shareInfo',undefined,callBack);
};
