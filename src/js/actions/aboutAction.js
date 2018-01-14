import {Toast} from 'antd-mobile';
import {COMMON_HTML} from './actionsTypes'
import commonService from "../services/commonService";

export const htmlData = data => ({type: COMMON_HTML, data: data}); //首页初始化信息

//获取富文本
export const getHtml=(data,callBack)=> {
    return (dispatch, getState) => {
        Toast.hide();
        Toast.loading("", 30, () => Toast.info("网络错误", 2));
        commonService.post(data,'/api/system/getConfig').then(resultData=>{
            if(resultData.code=='1'){
                commonService.post({htmlId:resultData.data.configValue},'/api/html/getHtml').then(finalResult=>{
                    Toast.hide();
                    if(finalResult.code=='1'){
                        dispatch(htmlData(finalResult.data));
                        callBack&&callBack(finalResult.data)
                    }
                    else{
                        Toast.hide();
                        Toast.info(finalResult.msg, 2);
                    }
                });
            }
            else{
                Toast.hide();
                Toast.info(resultData.msg, 2);
            }
        }).catch((e)=>{
            Toast.info("网络错误", 2);
        })
    }
};