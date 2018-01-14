/**
 * Created by 小敏哥 on 2017/6/15.
 */
/**
 * Created by 小敏哥 on 2017/4/10.
 */
import cookiesOperation from './cookiesOperation';

class Login {
    constructor() {

    }


    //获取当前时间与缓存用户信息时间差
    getSbuDays(localDateString) {
        let now = new Date();
        let localDate = new Date(localDateString);
        let days = (now.getTime() - localDate.getTime()) / (1000 / 3600);
        return days;
    }

    //单点登录
    _singleSignOn() {
        if (location.host.indexOf("localhost") > -1) {
            location.replace('http://local.jingyizaixian.com');
        }
        //从cookies读取数据
        else if (cookiesOperation.getCookie('JY_TOKEN') ) {
            return true;
        }
        else if(location.href.indexOf('local.jingyizaixian.com')>-1){
            location.replace(`http://test.jingyizaixian.com/api/login?targetUrl=${encodeURIComponent(location.href)}&XDebug=JY123456QWE`);
        }
        else {
           location.replace(`${location.protocol+'//'+location.host}/api/login?targetUrl=${encodeURIComponent(location.href)}`);
           /* location.replace(`https://www.jingyizaixian.com/api/login?targetUrl=${encodeURIComponent(location.href)}${'&XDebug=JY123456QWE'}`);*/
            //location.replace(`https://www.jingyizaixian.com/api/login?targetUrl=${encodeURIComponent(location.href)}&XDebug=JY123456QWE`);
            return false;
        }
    }


    loginOperation(callBack) {
        this._singleSignOn() && callBack();
    }
}

export default new Login();