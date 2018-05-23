import common from '../utils/common';
import cookiesOperation from '../utils/cookiesOperation';

require('isomorphic-fetch');

class ApiHelper {


    //接口根路径
    //baseApiUrl = location.href.indexOf('https://www.jingyizaixian.com')>-1?"https://www.jingyizaixian.com/":'http://www.jingyizaixian.com/';
    baseApiUrl=location.href.indexOf('local.jingyizaixian.com')>-1?'http://dev.jingyizaixian.com/':(location.protocol + '//' + location.host+'/');

    /**
     * 获取 HTTP 头
     */
    _getHeaders() {
        return {
            "Accept": "*/*",
        }
    }

    /**
     * 封装fetch
     */
    fetch(requestParam) {
        let promise = new Promise((resolve, reject) => {
            // console.log("requestParam", requestParam);
            requestParam.data.method = requestParam.data.method || "get";
            requestParam.data.headers = requestParam.data.headers || {};
            Object.assign(requestParam.data.headers, this._getHeaders());
            if (requestParam.data.method.trim().toLowerCase() == "post") {
                requestParam.data.headers["Content-Type"] = "application/x-www-form-urlencoded;";
            }
            requestParam.data.body = requestParam.data.body || {};

            if (!requestParam.data.credentials) {
                requestParam.data.credentials = 'same-origin';
            }
            if (!requestParam.data.body.JY_TOKEN) {
                requestParam.data.body["JY_TOKEN"] = cookiesOperation.getCookie('JY_TOKEN').replace(/"/g, '');
            }

            requestParam.data.body = common.toQueryString(requestParam.data.body);


            requestParam.data.mode = "cors";
            if (requestParam.data.method.trim().toLowerCase() == "get") {
                var request = new Request(requestParam.url + '?' + requestParam.data.body); //get请求不能有body,否则会报错
            } else {
                var request = new Request(requestParam.url, requestParam.data);
            }
            let result = window.fetch(request, {headers: requestParam.data.headers})
                .then(function (response) {
                    let resp = response.json();
                    resp.then(function (data) {
                        if (data.code == "-1") {
                            //location.replace(`https://www.jingyizaixian.com/api/login?targetUrl=${encodeURIComponent(location.href)}${window.location.href.indexOf("local.jingyizaixian") > -1 ? '&XDebug=JY123456QWE' : ''}`);
                            if(window.__wxjs_environment === 'miniprogram'||global.env === 'XCX'){
                                wx.miniProgram.reLaunch({
                                    url: '../index/index?validate=no'
                                })    
                            }else{
                                if(location.href.indexOf('local.jingyizaixian.com')>-1){
                                    location.replace(`http://dev.jingyizaixian.com/api/login?targetUrl=${encodeURIComponent(location.href)}&XDebug=JY123456QWE`);
                                }else {
                                    location.replace(`${location.protocol + '//' + location.host}/api/login?targetUrl=${encodeURIComponent(location.href)}`);
                                }
                            } 
                        }
                    });
                    return resp;
                })
                .catch(function (e) {
                    console.error("fetch 请求出错了");
                    console.dir(e);
                    throw e;
                });
            resolve(result);


            // 网络超时
            setTimeout(() => reject('网络错误'), 30000);
        });

        return promise;
    }
}

// 实例化后再导出
export default new ApiHelper()