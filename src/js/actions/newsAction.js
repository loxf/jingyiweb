import {NEWS_LIST,NEWS_DETAIL} from './actionsTypes'
import commonAction from './commonAction';

export const newsList = data => ({type: NEWS_LIST, data: data}); //新闻列表
export const newsDetail = data => ({type: NEWS_DETAIL, data: data}); //新闻详情

//获取新闻列表
export const getnewsList=(data,callBack)=> {
    return commonAction.simplePost(data,'/api/news/pager',newsList,callBack);
};

//获取新闻详情
export const getnewsDetail=(data,callBack)=> {
    return commonAction.simplePost(data,'/api/news/detail',newsDetail,callBack);
};