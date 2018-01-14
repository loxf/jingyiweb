
let g_userContainer = undefined;

let g_userId = ''; //CXY_3FBA032214714C19BA4CCA267F86C550
let g_userToken = ''; //60EB65A06DD3471C7B769091A9F70CBE
let g_city = '';
let g_lng = '';
let g_lat = '';
let g_openId = '';
let g_userType = 'App_cxy';
let g_deviceId = '';

/**
 * 用户帮助类
 */
class UserHelper {

    constructor() {

    }


    getLecloudConfig(){
        return {
            uu:'tcznqlkk60',
            callbackJs:'vedioCallBack'
        }
    }


    /**
     * 获取 userId 和 token
     */
    getUserIdAndToken() {
        //非APP时，直接返回缓存中的userId 和 token
        g_userId = sessionStorage.getItem("userId");
        g_userToken = sessionStorage.getItem("token");
        g_userType = sessionStorage.getItem("userType");
        g_lat = sessionStorage.getItem('lat');
        g_lng = sessionStorage.getItem('lng');
        g_openId = sessionStorage.getItem('openId');
        return {
            userId: g_userId,
            token: g_userToken,
            city: g_city,
            userType: g_userType,
            lng: g_lng,
            lat: g_lat,
            openId: g_openId,
            deviceId: g_deviceId,
            detailUserType: localStorage.getItem('detailUserType'),
        }
    }

}
;

// 实例化后再导出
export default new UserHelper()