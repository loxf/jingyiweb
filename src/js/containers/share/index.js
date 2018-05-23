import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';
import {sharePage} from '../../actions/homeAction'
import config from '../../config';
import {Toast} from 'antd-mobile'

class Share extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            loading: true,
        }
    }

    componentDidMount() {
        this.weixinOperation();
        this.props.dispatch(sharePage({}, (result) => {
            this.setState({
                url: config.imgPublicPath + result.data,
            });
        }));

        setTimeout(()=>{
            this.setState({
                loading:false,
            })
        },2000);
    }

    weixinOperation() {
        wx.ready(() => {
            wx.hideOptionMenu();
        });
        /* wx.ready(() => {
             let custId=cookiesOperation.getCookie('JY_CUST_ID');
             wx.hideMenuItems({
                 menuList: ["menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:facebook","menuItem:share:QZone"]
             });
             wx.onMenuShareTimeline({
                 title: sessionStorage.getItem('shareTitle'), // 分享标题
                 link: location.href+'?recommend='+custId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                 imgUrl: 'https://www.jingyizaixian.com/images/share/logo.jpg', // 分享图标
                 success: ()=>{
                     this.props.dispatch(shareCallBack({
                         detailName:'静怡雅学文化',
                         shareObj:location.href,
                         type:'RECOMMEND'
                     }))
                 },
                 cancel: function () {
                 }

             });

             wx.onMenuShareAppMessage({
                 title: sessionStorage.getItem('shareTitle'), // 分享标题
                 desc: sessionStorage.getItem('shareDesc'), // 分享描述
                 link: location.href+'?recommend='+custId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                 imgUrl: 'https://www.jingyizaixian.com/images/share/logo.jpg', // 分享图标
                 success: ()=>{
                     this.props.dispatch(shareCallBack({
                         detailName:'静怡雅学文化',
                         shareObj:location.href,
                         type:'RECOMMEND'
                     }))
                 },
                 cancel: function () {
                 }

             });
         });*/
    }
    render() {
        return this.state.loading ? <div className={style.loading}>
            <img src="./images/share/loading.gif"/>
            <div>请长按图片下载后分享</div>
        </div> : <div className={style.container}>
            <img src={this.state.url}/>
            <div className={style.home} onClick={() => {
                    this.context.router.push('/');
                }}><img src="./images/share/shareHome.png"/></div>
        </div>
    }
}
//使用context
Share.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect()(Share)