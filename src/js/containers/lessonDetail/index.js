import React, {Component} from 'react';
import style from './index.scss';
import {connect} from "react-redux";
import TitleBar from '../../components/share/titleBar'
import DangerousHtmlItem from '../../components/share/dangerousHtmlItem'
import TeacherList from '../../components/packageDetail/teacherList'
/*import LeVedio from '../../components/leVedio';*/
import TcVedio from '../../components/tcVedio';
import BottomButton from '../../components/share/bottomButton';
import ShareGuide from '../../components/share/shareGuide';
import UrlOperation from '../../utils/urlOperation';
import {shareCallBack} from '../../actions/weixinAction'
import {getProductDetail, getHtml, sendVedioMessage, productDetail} from '../../actions/productAction'
import cookiesOperation from '../../utils/cookiesOperation';
import config from '../../config';
import common from '../../utils/common';

class LessonDetail extends Component {
    constructor(props) {
        super(props);
        this.urlOperation = new UrlOperation();
        this.watchId = '';
        this.interval = null;
        this.firstPlay = true;//第一次点击播放
    }

    //转换后端回传的数据格式
    structButtonArray(buttonArray) {
        return buttonArray.length > 0 ? buttonArray.map((item, index) => {
            return {
                name: item.name,
                enable: item.click == 1,
                code: item.code,
                offerId: item.offerId,
                price: item.price,
                proeuctType: 'CLASS',
            }
        }) : []
    }

    //向后端发送视频观看信息
    sendVedioMessage() {
        this.props.dispatch(sendVedioMessage({
            offerId: this.urlOperation.getParameters().id,
            videoId: this.props.productDetail.videoId,
            watchId: this.watchId
        }, (result) => {
            this.watchId = result.data;
        }))
    }

    //定时发送信息
    intervalSend() {
        if (this.interval == null) {
            if (this.firstPlay) {
                this.sendVedioMessage();
                this.firstPlay = false;
            }
            this.interval = window.setInterval(() => {
                this.sendVedioMessage();
            }, 60 * 1000)
        }
    }

    //清除所有定时器
    clearInterval() {
        window.clearInterval(this.interval);
        this.interval = null;
    }


    componentWillUnmount() {
        //退出时清空数据缓存
        this.props.dispatch(productDetail(null));
        //离开控件时移除所有定时器
        this.clearInterval();
    }


    componentDidMount() {
        //ios用history跳转会调至jsapi的config接口授权失败，进而导致配置分享接口失败，此处只能重新刷新一次，用于避开这个坑
        if (common.getTypeOfBrowser() == 'IOS' && sessionStorage.getItem('refresh') !== 'true') {
            sessionStorage.setItem('refresh', 'true');
            location.reload();
            return;
        }
        this.props.dispatch(getProductDetail({
            offerId: this.urlOperation.getParameters().id
        }, (resultData) => {
            this.props.dispatch(getHtml({
                htmlId: resultData.data.htmlId
            }));

            //this.checkAndDoWeixinOperation();
            this.weixinOperation(resultData.data);
            sessionStorage.setItem('refresh', 'false');
        }));

    }


    //检查初始化状态并执行微信sdk
    checkAndDoWeixinOperation() {
        if (sessionStorage.getItem('weixinConfigReady') == 'true') {
            this.weixinOperation();
        }
        else {
            document.addEventListener('weixinConfigReady', () => {
                this.weixinOperation();
            }, false)
        }
    }


    weixinOperation(data) {
        wx.ready(() => {
            // setTimeout(()=>{
            let custId = cookiesOperation.getCookie('JY_CUST_ID');
            wx.onMenuShareTimeline({
                title: data.offerName, // 分享标题
                link: location.href + '&recommend=' + custId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: config.imgPublicPath + data.pic, // 分享图标
                success: () => {
                    this.props.dispatch(shareCallBack({
                        detailName: data.offerName,
                        shareObj: this.urlOperation.getParameters().id,
                        type: 'VIDEO'
                    }))
                },
                fail: (e) => {
                    alert(e.errMsg);
                },
                cancel: function () {
                }
            });

            wx.onMenuShareAppMessage({
                title: data.offerName, // 分享标题
                desc: data.offerDesc ? data.offerDesc : '', // 分享描述
                link: location.href + '&recommend=' + custId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: config.imgPublicPath + data.pic, // 分享图标
                success: () => {
                    this.props.dispatch(shareCallBack({
                        detailName: data.offerName,
                        shareObj: this.urlOperation.getParameters().id,
                        type: 'VIDEO'
                    }))
                },
                cancel: function () {
                }
            });

            //  },2000);


        });
    }

    //通过分享进来的点击后退按钮回到首页
    detailBack() {
        if (history.length == 1) {
            this.context.router.push('/');
        }
        else {
            history.back();
        }
    }

    //跳转到考试
    goToExam() {
        this.context.router.push(`exam?id=${this.urlOperation.getParameters().id}`);
    }


    render() {
        return <div className={style.cotainer}>
            <ShareGuide ref="shareGuide"/>
            <TitleBar title="课程详情" rightArray={[{
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
            {this.props.productDetail ? <div>
                {/*<LeVedio canPlay={this.props.productDetail.isPlay == 1} id="lessonDetail"
                         vedioId={this.props.productDetail.mainMedia} pause={() => {
                    this.clearInterval();
                }} start={() => {
                    this.intervalSend()
                }} resume={() => {
                    this.intervalSend()
                }}/>*/}
                <TcVedio id="lessonDetail" canPlay={this.props.productDetail.isPlay == 1}
                         mediaType={this.props.productDetail.mediaType} mainMedia={this.props.productDetail.mainMedia}
                         coverpic={config.imgPublicPath + this.props.productDetail.pic} pause={() => {
                    this.clearInterval();
                }} play={() => {
                    this.intervalSend()
                }} ended={() => {
                    this.clearInterval();
                }}/>
                <div className={style.lessonTitle}>{this.props.productDetail.offerName}</div>
                <div className={style.teachers}>
                    <TeacherList teachers={this.props.productDetail.teacher}/>
                </div>

                {this.props.productHtml ? <div className={style.detail}>
                    <DangerousHtmlItem title="课程详情" inner={this.props.productHtml}/>
                </div> : ''}
                <BottomButton btns={this.structButtonArray(this.props.productDetail.btns)}/>

                {this.props.productDetail.exam?<img className={style.goToExam} onClick={this.goToExam.bind(this)} src="./images/exam/kaoshi.png"/>:''}
            </div> : ''}
        </div>
    }
}

//使用context
LessonDetail.contextTypes = {
    router: React.PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return Object.assign({}, state.productInfo);
}

export default connect(mapStateToProps)(LessonDetail);
