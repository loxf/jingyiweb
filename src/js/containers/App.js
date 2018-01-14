import React, {Component} from 'react';
import {getWeixinConfig} from '../actions/weixinAction';
import {getConfig,log} from '../actions/configAction';
import {connect} from 'react-redux';
import common from '../utils/common';

class App extends Component {

    constructor(props) {
        super(props);
    }

    setWeixinConfig(config){
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: config.appId, // 必填，公众号的唯一标识
            timestamp: config.timestamp, // 必填，生成签名的时间戳
            nonceStr: config.nonceStr, // 必填，生成签名的随机串
            signature: config.signature,// 必填，签名，见附录1
            jsApiList: ['hideOptionMenu','onMenuShareTimeline','onMenuShareAppMessage','hideMenuItems','hideAllNonBaseMenuItem','showMenuItems','showOptionMenu'] // 必填，需要使用的JS接口列表
        });
    }

    //获取微信配置
    getWeixinConfig(){
        try {
            //获取分享标题
            !sessionStorage.getItem('shareTitle') && this.props.dispatch(getConfig({
                catalog: 'COM',
                configCode: 'APP_SHARE_TITLE'
            }, (config) => {
                sessionStorage.setItem('shareTitle', config.data.configValue);
            }));
            //获取分享描述
            !sessionStorage.getItem('shareDesc') && this.props.dispatch(getConfig({
                catalog: 'COM',
                configCode: 'APP_SHARE_DESC'
            }, (config) => {
                sessionStorage.setItem('shareDesc', config.data.configValue);
            }));
            //获取微信配置信息
            this.props.dispatch(getWeixinConfig({url: location.href}, (config) => {
                if (config.data.url == location.href) {
                    this.setWeixinConfig(config.data);
                }
               /* else {
                    alert(config.data.url);
                    alert(location.href);
                }*/
            }))
        }
        catch (e){
           // alert(JSON.stringify(e));
        }
    }

    componentDidMount() {
        //首次进入向发送日志
        this.props.dispatch(log({
            osType:common.getTypeOfBrowser(),
            page:location.href,
        }))
    }

    render() {
        setTimeout(()=>{this.getWeixinConfig();},1000);//延迟一秒，防止切换时调用config接口不定期报错，初步判断此时location.href或其他数据尚未更新，导致报错
        const {children} = this.props;
        return children
    }
}



function mapStateToProps(state) {
    return Object.assign({});
}

export default connect(mapStateToProps)(App);