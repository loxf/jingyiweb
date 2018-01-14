/**
 * Created by 小敏哥 on 2017/5/5.
 */
class UrlOperation{
    constructor(){
        this.urlInformation={
            protocol:window.location.protocol,//协议
            host:window.location.host,//主机部分
            port:window.location.port,//端口
            pathname:window.location.pathname,//文件地址
            search: window.location.search,//问号以及之后的地址
            fullPathname:window.location.protocol+'//'+window.location.host+window.location.pathname,//完全文件地址
        }
    }

    //获取链接参数，返回对象
    getParameters(){
        let parameterResult = {};
        if(location.search) {
            let parameters = this.urlInformation.search.replace('?', '');
            let parameterArray = parameters.split('&');
            for (let i = 0; i < parameterArray.length; i++) {
                let result = parameterArray[i].split('=');
                parameterResult[result[0]] = result[1].replace('/', '');//过滤斜杠符号
            }
        }
        return parameterResult;
    }
}

export default UrlOperation;