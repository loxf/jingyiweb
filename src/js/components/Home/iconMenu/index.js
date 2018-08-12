import React, {Component} from 'react';
import style from './index.scss';
import ReModal from '../../../components/common/reModal';
import ShareGuide from '../../../components/share/shareGuide';
import cookiesOperation from '../../../utils/cookiesOperation'

class IconMenu extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        userLevel: React.PropTypes.string,//用户级别
    };
    liveLesson = () => {
        // if(window.__wxjs_environment === 'miniprogram'){
            ReModal.alert(<div>
                <div>
                    <img src="data:image/jpeg;base64,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" />
                </div>
                <div>
                    请长按识别或扫描上方二维码
                </div>
            </div>);
        // }else{
        //     window.location.href = "https://www.vlearn.cn/su/rYaI3m"
        // }
    }
    render() {
        let userInfo = this.props.userInfo;
        let initData = this.props.initData;
        let userLevel = userInfo.userLevel;
        let classSrc = "./images/home/producttype.png";
        let shareSrc = "./images/home/tuiguangfenxiang.png";
        let QRSrc = "./images/home/guanzhugongzhonghao.png";
        let BZRSrc = "./images/home/tianjiabanzhuren.png";
        let VIPSrc = "./images/home/shengjihuiyuan.png";
        let DLSSrc = "./images/home/dailishang.png";
        let newsSrc = "./images/home/xueguanxinwen.png";
        let faceSrc = "./images/home/mianshoukecheng.png";
        let moreSrc = "./images/home/more.png";
        if(initData&&initData.icons.length>0){
            let a = cookiesOperation.getCookie('PIC_SERVER_URL');
            initData.icons.map((v,i)=>{
                switch(v.code){
                    case 'INDEX_ICON_CLASS':
                        if(v.img!="") classSrc = cookiesOperation.getCookie('PIC_SERVER_URL')+ v.img;
                        break;
                    case 'INDEX_ICON_SHARE':
                        if(v.img!="") shareSrc = cookiesOperation.getCookie('PIC_SERVER_URL')+  v.img;
                        break;
                    case 'INDEX_ICON_QR':
                        if(v.img!="") QRSrc = cookiesOperation.getCookie('PIC_SERVER_URL')+  v.img;
                        break;
                    case 'INDEX_ICON_BZR':
                        if(v.img!="") BZRSrc = cookiesOperation.getCookie('PIC_SERVER_URL')+  v.img;
                        break;
                    case 'INDEX_ICON_VIP':
                        if(v.img!="") VIPSrc = cookiesOperation.getCookie('PIC_SERVER_URL')+  v.img;
                        break;
                    case 'INDEX_ICON_NEWS':
                        if(v.img!="") newsSrc = cookiesOperation.getCookie('PIC_SERVER_URL')+  v.img;
                        break;
                    case 'INDEX_ICON_FACECLASS':
                        if(v.img!="") faceSrc = cookiesOperation.getCookie('PIC_SERVER_URL')+  v.img;
                        break;
                    case 'INDEX_ICON_MORE':
                        if(v.img!="") moreSrc = cookiesOperation.getCookie('PIC_SERVER_URL')+  v.img;
                        break;
                    case 'INDEX_ICON_DLS':
                        if(v.img!="") DLSSrc = cookiesOperation.getCookie('PIC_SERVER_URL')+  v.img;
                        break;
                }
            })
        }
        return <div className={style.menuContainer}>
            <ShareGuide ref="shareGuide"/>
            <div className={style.menuItem} onClick={()=>{this.context.router.push('productType')}}>
                <img src={classSrc}/>
                <div>课程分类</div>
            </div>
            <div className={style.menuItem} onClick={() => {
                let random=Math.random()*1000;
                this.context.router.push(`share?random=${random.toFixed(0)}`);
            }}>
                <img src={shareSrc}/>
                <div>推广分享</div>
            </div>
            <div className={style.menuItem} onClick={() => {
                ReModal.showOnlyComponent(<img className={style.codeImg} src="./images/share/gongzhonghao.jpg"/>)
            }}>
                <img src={QRSrc}/>
                <div>关注公众号</div>
            </div>
            <div className={style.menuItem} onClick={() => {
                if(userLevel == 'NONE'){
                    ReModal.alert('升级VIP再来添加班主任吧！');
                }
                else {
                    ReModal.showOnlyComponent(<img  className={style.codeImg} src="./images/share/banzhuren.jpg"/>)
                }
            }}>
                <img src={BZRSrc}/>
                <div>添加班主任</div>
            </div>
            {/* <div className={style.menuItem}>
                <img src={VIPSrc} onClick={()=>{this.context.router.push('confirmOrder?type=VIP&id=OFFER001&otherId=OFFER002')}}/>
                <div>{userLevel == 'NONE'?"会员升级":"会员续期"}</div>
            </div> */}
            {/* {userLevel == 'NONE' ? <div className={style.menuItem}>
                <img src={VIPSrc} onClick={()=>{this.context.router.push('confirmOrder?type=VIP&id=OFFER001&otherId=OFFER002')}}/>
                <div>会员升级</div>
            </div> : <div className={style.menuItem} onClick={()=>{this.context.router.push('beTheAgent')}}>
                <img src={DLSSrc}/>
                <div>升级代理商</div>
            </div>} */}
            <div className={style.menuItem} onClick={()=>{this.context.router.push('news')}}>
                <img src={newsSrc}/>
                <div>学馆新闻</div>
            </div>
            <div className={style.menuItem} onClick={()=>{this.context.router.push('faceLesson')}}>
                <img src={faceSrc}/>
                <div>面授课程</div>
            </div>
            <div className={style.menuItem} onClick={()=>{this.liveLesson()}}>
                <img src={faceSrc}/>
                <div>直播课程</div>
            </div>
            <div className={style.menuItem} onClick={() => {
                ReModal.alert('更多功能还在开发中，敬请期待！');
            }}>
                <img src={moreSrc}/>
                <div>更多</div>
            </div>
        </div>
    }
}

IconMenu.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default IconMenu