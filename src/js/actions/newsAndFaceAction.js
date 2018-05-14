import {NEWS_HTML,NEWS_CONTENT} from './actionsTypes'
import commonAction from './commonAction';

export const newsHtml = data => ({type: NEWS_HTML, data: data}); //新闻列表
export const newsContent = data => ({type: NEWS_CONTENT, data: data}); //新闻详情

//获取新闻详情
export const getNewsDetail=(data,callBack)=> {
    return commonAction.simplePost(data,'/api/news/detail',newsContent,callBack);
};

//获取新闻富文本介绍
export const getHtml=(data,callBack)=> {
    return commonAction.simplePost(data,'api/html/getHtml',newsHtml,callBack);
}
export const viewRecord=(data,callBack)=> {
    return commonAction.simplePost(data,'/api/news/viewRecord',null,callBack);
}
;