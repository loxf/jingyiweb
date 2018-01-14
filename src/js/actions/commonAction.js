/**
 * Created by 小敏哥 on 2017/11/17.
 */

import commonService from '../services/commonService';
import {Toast} from 'antd-mobile';

class CommonAction {

    /*
    * data:传入参数
    * callBack:最终回调函数
    * apiUrl：请求url
    * dataAction：请求完成后修改数据的action
    * */
    simpleGet(data, apiUrl, dataAction, callBack) {
        return (dispatch, getState) => {
            Toast.hide();
            Toast.loading("", 30, () => Toast.info("网络错误", 2));
            commonService.get(data, apiUrl).then(resultData => {
                Toast.hide();
                if (resultData.code == 1) {
                    dataAction && dispatch(dataAction(resultData.data));
                    callBack && callBack(resultData)
                }
                else {
                    if (resultData.code != -1) {
                        Toast.info(resultData.msg, 2);
                    }
                }
            }).catch((e) => {
              //  Toast.info("网络错误", 2);
               // throw e;
               // alert(e.message);
                //alert('接口:'+apiUrl);
            })
        }
    }

    /*
   * data:传入参数
   * callBack:最终回调函数
   * apiUrl：请求url
   * dataAction：请求完成后修改数据的action
   * */
    simplePost(data, apiUrl, dataAction, callBack) {
        let cache;
        return (dispatch, getState) => {
            Toast.hide();
            Toast.loading("", 30, () => Toast.info("网络错误", 2));
            commonService.post(data, apiUrl).then(resultData => {
                cache=resultData;
                Toast.hide();
                if (resultData.code == 1) {
                    dataAction && dispatch(dataAction(resultData.data));
                    callBack && callBack(resultData)
                }
                else {
                    if (resultData.code != -1) {
                        Toast.info(resultData.msg, 2);
                    }
                }
            }).catch((e) => {
             //   Toast.info("网络错误", 2);
               // throw e;
                //debugger;
                //alert(e.message);
                //alert('接口：'+apiUrl);
                //alert('返回结果：'+JSON.stringify(cache));
            })
        }
    }
}

export default new CommonAction();