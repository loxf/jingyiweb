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

class LessonDetail extends Component {
    constructor(props) {
        super(props);
        this.urlOperation = new UrlOperation();
        this.watchId = '';
        this.interval = null;
        this.firstPlay=true;//第一次点击播放
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
            if(this.firstPlay) {
                this.sendVedioMessage();
                this.firstPlay=false;
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
        this.props.dispatch(getProductDetail({
            offerId: this.urlOperation.getParameters().id
        }, (resultData) => {
            this.props.dispatch(getHtml({
                htmlId: resultData.data.htmlId
            }));

            //this.checkAndDoWeixinOperation();
            this.weixinOperation();
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


    weixinOperation() {
        wx.ready(() => {
            // setTimeout(()=>{
            let custId = cookiesOperation.getCookie('JY_CUST_ID');
            wx.onMenuShareTimeline({
                title: this.props.productDetail.offerName, // 分享标题
                link: location.href + '&recommend=' + custId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: config.imgPublicPath + this.props.productDetail.pic, // 分享图标
                success: () => {
                    this.props.dispatch(shareCallBack({
                        detailName: this.props.productDetail.offerName,
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
                title: this.props.productDetail.offerName, // 分享标题
                desc: this.props.productDetail.offerDesc ? this.props.productDetail.offerDesc : '', // 分享描述
                link: location.href + '&recommend=' + custId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: config.imgPublicPath + this.props.productDetail.pic, // 分享图标
                success: () => {
                    this.props.dispatch(shareCallBack({
                        detailName: this.props.productDetail.offerName,
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

    detailBack() {
        if (this.urlOperation.getParameters().recommend) {
            this.context.router.replace('');
        }
        else {
            history.back();
        }
    }


    render() {
        return <div className={style.cotainer}>
            <ShareGuide ref="shareGuide"/>
            <TitleBar title="课程详情" right={{
                img: './images/share/fenxiang.png', onClick: () => {
                    this.refs.shareGuide.show()
                }
            }} back={() => {
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
                <TcVedio id="lessonDetail" canPlay={this.props.productDetail.isPlay == 1} mediaType={this.props.productDetail.mediaType} mainMedia={this.props.productDetail.mainMedia}
                         coverpic={config.imgPublicPath + this.props.productDetail.pic} pause={() => {
                    this.clearInterval();
                }} play={() => {
                    this.intervalSend()
                }} ended={()=>{
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
            </div> : ''}
            {/* <img className={style.goToExam} src="./images/exam/kaoshi.png"/>*/}
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
