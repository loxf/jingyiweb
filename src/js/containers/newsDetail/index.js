import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';
import TitleBar from '../../components/share/titleBar'
import DangerousHtmlItem from '../../components/share/dangerousHtmlItem'
import ShareGuide from '../../components/share/shareGuide';
import UrlOperation from '../../utils/urlOperation';
import {getNewsDetail, getHtml, newsHtml, viewRecord} from '../../actions/newsAndFaceAction'
import BottomButton from '../../components/share/bottomButton';
import {shareCallBack} from '../../actions/weixinAction'
import cookiesOperation from '../../utils/cookiesOperation';
import config from '../../config';
import common from '../../utils/common';

class newsDetail extends Component {
    constructor(props) {
        super(props);
        this.urlOperation = new UrlOperation();
    }

    componentDidMount() {
        let _this = this;
        //ios用history跳转会调至jsapi的config接口授权失败，进而导致配置分享接口失败，此处只能重新刷新一次，用于避开这个坑
        if(common.getTypeOfBrowser()=='IOS'&&sessionStorage.getItem('refresh')!=='true'){
            sessionStorage.setItem('refresh','true');
            location.reload();
            return;
        }
        this.props.dispatch(getNewsDetail({titleId: this.urlOperation.getParameters().id}, (result) => {
            this.props.dispatch(getHtml({
                htmlId: result.data.contextId
            }));
            this.weixinOperation();
            sessionStorage.setItem('refresh','false');
        }));
        this.t = setTimeout(function(){
            _this.props.dispatch(viewRecord({
                titleId: _this.urlOperation.getParameters().id
            }));
        },10000)
    }
    componentWillUnmount() {
        clearTimeout(this.t)
    }
    weixinOperation(){
        wx.ready(() => {
                let custId=cookiesOperation.getCookie('JY_CUST_ID');
                let html = this.props.newsHtml||"";
                let imgIndex = html.indexOf("<img");
                let cut = html.slice(imgIndex);
                let lastImgIndex = cut.indexOf(">");
                let imgHtml =cut.slice(0,lastImgIndex+1);
                var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
                var imgSrc = imgHtml.match(srcReg);
                wx.onMenuShareTimeline({
                    title:this.props.newsContent.title, // 分享标题
                    link: location.href+'&recommend='+custId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgSrc[1], // 分享图标
                    success: ()=>{
                        this.props.dispatch(shareCallBack({
                            detailName:this.props.newsContent.title,
                            shareObj:this.urlOperation.getParameters().id,
                            type:'NEWS'
                        }))
                    },
                    cancel: function () {
                    }
                });

                wx.onMenuShareAppMessage({
                    title:this.props.newsContent.title, // 分享标题
                    desc: this.props.newsContent.description?this.props.newsContent.description:'', // 分享描述
                    link: location.href+'&recommend='+custId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgSrc[1], // 分享图标
                    success: ()=>{
                        this.props.dispatch(shareCallBack({
                            detailName:this.props.newsContent.title,
                            shareObj:this.urlOperation.getParameters().id,
                            type:'NEWS'
                        }))
                    },
                    cancel: function () {
                    }
                });
        });
    }

    detailBack(){
        if(this.urlOperation.getParameters().recommend){
            this.context.router.replace('');
        }
        else{
            history.back();
        }
    }

    render() {
        let type = this.urlOperation.getParameters().type;
        return <div className={style.container}>
            <ShareGuide ref="shareGuide"/>
            <TitleBar title={type==1?"学馆新闻详情":"面授课程详情"} rightArray={[{
                img: './images/share/home.png', onClick: () => {
                    this.context.router.push('/');
                }
            }, {
                img: './images/share/fenxiang.png', onClick: () => {
                    this.refs.shareGuide.show()
                }
            }]} back={()=>{this.detailBack()}}></TitleBar>
            {this.props.newsHtml ? <div className={style.details}>
                <div className={style.title}>{this.props.newsContent.title}</div>
                <div className={style.text}><span className={style.time}>{this.props.newsContent.createdAt}</span><span className={style.author}>{this.props.newsContent.source}</span></div>
                <DangerousHtmlItem title="" inner={this.props.newsHtml} />
            </div> : ''}
        </div>
    }
}

newsDetail.defaultProps = {
};

//使用context
newsDetail.contextTypes = {
    router: React.PropTypes.object.isRequired
};



function mapStateToProps(state) {
    return Object.assign({}, state.newsAndFaceInfo);
}


export default connect(mapStateToProps)(newsDetail);