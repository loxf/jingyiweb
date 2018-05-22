import commonAction from './commonAction';
import {MY_SCORE,MY_CERTIFY,EXAM_QUESTIONS,EXAM_RESULT} from './actionsTypes'

export const myScore = data => ({type: MY_SCORE, data: data}); //我的成就
export const myCertify = data => ({type: MY_CERTIFY, data: data}); //我的证书
export const examQuestions = data => ({type: EXAM_QUESTIONS, data: data}); //我的考试
export const examResult = data => ({type: EXAM_RESULT, data: data}); //提交结果
//获取地址
export const getMyScore=(data,callBack)=> {
    return commonAction.simplePost(data,'/api/cust/myScore',myScore,callBack);
};

//获取证书
export const getmyCertify=(data,callBack)=> {
    return commonAction.simplePost(data,'/api/cust/myCertify',myCertify,callBack);
};

//获取考题
export const getQuestions=(data,callBack)=> {
    return commonAction.simplePost(data,'/api/exam/getQuestions',examQuestions,callBack);
};

export const submit=(data,callBack)=> {
    return commonAction.simplePost(data,'/api/exam/getScore',examResult,callBack);
};