import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';
import TitleBar from '../../components/share/titleBar'
import PackageList from '../../components/packageDetail/packageList';
import DangerousHtmlItem from '../../components/share/dangerousHtmlItem'
import ShareGuide from '../../components/share/shareGuide';
import UrlOperation from '../../utils/urlOperation';
import {getPackageDetail, getHtml} from '../../actions/productAction'
import BottomButton from '../../components/share/bottomButton';
import {shareCallBack} from '../../actions/weixinAction'
import cookiesOperation from '../../utils/cookiesOperation';
import config from '../../config';
import common from '../../utils/common';

class PackageDetail extends Component {
    constructor(props) {
        super(props);
        this.urlOperation = new UrlOperation();
    }

    componentDidMount() {
        //ios用history跳转会调至jsapi的config接口授权失败，进而导致配置分享接口失败，此处只能重新刷新一次，用于避开这个坑
        if(common.getTypeOfBrowser()=='IOS'&&sessionStorage.getItem('refresh')!=='true'){
            sessionStorage.setItem('refresh','true');
            location.reload();
            return;
        }
        this.props.dispatch(getPackageDetail({offerId: this.urlOperation.getParameters().id}, (result) => {
            this.props.dispatch(getHtml({
                htmlId: result.data.htmlId
            }));
            this.weixinOperation();
            sessionStorage.setItem('refresh','false');
        }));
    }

    //转换后端回传的数据格式
    structButtonArray(buttonArray){
        return buttonArray.map((item,index)=>{
            return {
                name:item.name,
                enable:item.click==1,
                code:item.code,
                offerId:item.offerId,
                price:item.price,
                proeuctType:'OFFER',
            }
        })
    }

    weixinOperation(){
        wx.ready(() => {
            //setTimeout(()=>{
                let custId=cookiesOperation.getCookie('JY_CUST_ID');
                wx.onMenuShareTimeline({
                    title:this.props.packageDetail.offerName, // 分享标题
                    link: location.href+'&recommend='+custId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: config.imgPublicPath+this.props.packageDetail.pic, // 分享图标
                    success: ()=>{
                        this.props.dispatch(shareCallBack({
                            detailName:this.props.packageDetail.offerName,
                            shareObj:this.urlOperation.getParameters().id,
                            type:'OFFER'
                        }))
                    },
                    cancel: function () {
                    }
                });

                wx.onMenuShareAppMessage({
                    title:this.props.packageDetail.offerName, // 分享标题
                    desc: this.props.packageDetail.offerDesc?this.props.packageDetail.offerDesc:'', // 分享描述
                    link: location.href+'&recommend='+custId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: config.imgPublicPath+this.props.packageDetail.pic, // 分享图标
                    success: ()=>{
                        this.props.dispatch(shareCallBack({
                            detailName:this.props.packageDetail.offerName,
                            shareObj:this.urlOperation.getParameters().id,
                            type:'OFFER'
                        }))
                    },
                    cancel: function () {
                    }
                });
          //  },2000);
        });
    }

    detailBack(){
        if(history.length == 1){
            this.context.router.push('/');
        }
        else{
            history.back();
        }
    }

    render() {
        return <div className={style.container}>
            <ShareGuide ref="shareGuide"/>
            <TitleBar title="套餐详情" rightArray={[{
                img: './images/share/home.png', onClick: () => {
                    this.context.router.push('/');
                }
            }, {
                img: './images/share/fenxiang.png', onClick: () => {
                    this.refs.shareGuide.show()
                }
            }]} back={()=>{this.detailBack()}}></TitleBar>
            {this.props.packageDetail?<div>
                <img className={style.headerImg} src={config.imgPublicPath+this.props.packageDetail.pic}/>
                <PackageList listData={this.props.packageDetail.offerList} isPlay={this.props.packageDetail.isPlay} listTitle={this.props.packageDetail.offerName}/>
                {this.props.productHtml?<div className={style.detail}>
                    <DangerousHtmlItem title="套餐详情" inner={this.props.productHtml}/>
                </div>:''}
                <div className={style.space}></div>
                <BottomButton btns={this.structButtonArray(this.props.packageDetail.btns)}/>
            </div>:''}
        </div>
    }
}

PackageDetail.defaultProps = {
};

//使用context
PackageDetail.contextTypes = {
    router: React.PropTypes.object.isRequired
};



function mapStateToProps(state) {
    return Object.assign({}, state.productInfo);
}


export default connect(mapStateToProps)(PackageDetail);