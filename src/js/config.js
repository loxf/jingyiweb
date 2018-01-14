import cookiesOperation from './utils/cookiesOperation'
class Config {
    imgPublicPath=cookiesOperation.getCookie('PIC_SERVER_URL');//图片根路径
    isTest=location.href.indexOf('local')>-1;//用于全局识别是否为测试环境
}

export default new Config()