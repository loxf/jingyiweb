import React, {Component} from 'react';
import style from './index.scss';
import {connect} from "react-redux";
import TitleBar from '../../components/share/titleBar'
import ActivityMessage from '../../components/activityMessage'
import DangerousHtmlItem from '../../components/share/dangerousHtmlItem'
import BottomButton from '../../components/share/bottomButton';
import ShareGuide from '../../components/share/shareGuide';
import UrlOperation from '../../utils/urlOperation';
import {getActivityDetail, getHtml} from '../../actions/productAction'
import config from '../../config';
import {shareCallBack} from '../../actions/weixinAction'
import cookiesOperation from '../../utils/cookiesOperation';
import common from '../../utils/common';

class ActivityDetail extends Component {
    constructor(props) {
        super(props);
        this.urlOperation = new UrlOperation();
    }


    weixinOperation() {
        wx.ready(() => {
            // setTimeout(()=>{
            let custId = cookiesOperation.getCookie('JY_CUST_ID');
            wx.onMenuShareTimeline({
                title: this.props.activityDetail.activeName, // 分享标题
                link: location.href + '&recommend=' + custId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: config.imgPublicPath + this.props.activityDetail.pic, // 分享图标
                success: () => {
                    this.props.dispatch(shareCallBack({
                        detailName: this.props.activityDetail.activeName,
                        shareObj: this.urlOperation.getParameters().id,
                        type: 'ACTIVE'
                    }))
                },
                cancel: function () {
                }
            });

            wx.onMenuShareAppMessage({
                title: this.props.activityDetail.activeName, // 分享标题
                desc: this.props.activityDetail.activeDesc ? this.props.activityDetail.activeDesc : '', // 分享描述
                link: location.href + '&recommend=' + custId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: config.imgPublicPath + this.props.activityDetail.pic, // 分享图标
                success: () => {
                    this.props.dispatch(shareCallBack({
                        detailName: this.props.activityDetail.activeName,
                        shareObj: this.urlOperation.getParameters().id,
                        type: 'ACTIVE'
                    }))
                },
                cancel: function () {
                }
            });
            //  },2000);

        });
    }

    componentDidMount() {
        //ios用history跳转会调至jsapi的config接口授权失败，进而导致配置分享接口失败，此处只能重新刷新一次，用于避开这个坑
        if (common.getTypeOfBrowser() == 'IOS' && sessionStorage.getItem('refresh') !== 'true') {
            sessionStorage.setItem('refresh', 'true');
            location.reload();
            return;
        }
        this.props.dispatch(getActivityDetail({
            activeId: this.urlOperation.getParameters().id
        }, (result) => {
            this.props.dispatch(getHtml({
                htmlId: result.data.htmlId
            }));

            this.weixinOperation();
            sessionStorage.setItem('refresh', 'false');
        }));
    }

    structButtonArray(buttonArray) {
        return buttonArray.map((item, index) => {
            return {
                name: item.name,
                enable: item.click == 1,
                code: item.code,
                offerId: item.offerId,
                price: item.price,
                proeuctType: 'ACTIVE',
            }
        })
    }

    detailBack() {
        if (history.length == 1) {
            this.context.router.push('/');
        }
        else {
            history.back();
        }
    }

    render() {
        return <div className={style.container}>
            <ShareGuide ref="shareGuide"/>
            <TitleBar title="活动详情" rightArray={[{
                img: './images/share/home.png', onClick: () => {
                    this.context.router.push('/');
                }
            }, {
                img: './images/share/fenxiang.png', onClick: () => {
                    this.refs.shareGuide.show()
                }
            }]} back={() => {
                this.detailBack()
            }}/>
            {this.props.activityDetail ?
                <img className={style.headerImg} src={config.imgPublicPath + this.props.activityDetail.pic}/> : ''}
            {this.props.activityDetail ? <ActivityMessage messages={this.props.activityDetail}/> : ''}
            {this.props.productHtml ? <div className={style.details}>
                <DangerousHtmlItem title="活动详情" inner={this.props.productHtml}/>
            </div> : ''}
            <div className={style.space}></div>
            {this.props.activityDetail ?
                <BottomButton btns={this.structButtonArray(this.props.activityDetail.btns)}/> : ''}
        </div>
    }
}


//使用context
ActivityDetail.contextTypes = {
    router: React.PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return Object.assign({}, state.productInfo);
}

export default connect(mapStateToProps)(ActivityDetail);