import {FACE_LIST,FACE_DETAIL} from './actionsTypes'
import commonAction from './commonAction';

export const faceList = data => ({type: FACE_LIST, data: data}); //新闻列表
export const faceDetail = data => ({type: FACE_DETAIL, data: data}); //新闻详情

//获取新闻列表
export const getfaceList=(data,callBack)=> {
    return commonAction.simplePost(data,'/api/news/pager',faceList,callBack);
};

//获取新闻详情
export const getfaceDetail=(data,callBack)=> {
    return commonAction.simplePost(data,'/api/news/detail',faceDetail,callBack);
};