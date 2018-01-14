import commonAction from './commonAction';
//获取地址
export const getConfig=(data,callBack)=> {
    return commonAction.simplePost(data,'api/system/getConfig',undefined,callBack);
};

export const log=(data,callBack)=> {
    return commonAction.simplePost(data,'api/system/log',undefined,callBack);
};
