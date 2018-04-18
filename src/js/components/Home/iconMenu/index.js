import React, {Component} from 'react';
import style from './index.scss';
import ReModal from '../../../components/common/reModal';
import ShareGuide from '../../../components/share/shareGuide';
import config from '../../../config';

class IconMenu extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        userLevel: React.PropTypes.string,//用户级别
    };

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
            initData.icons.map((v,i)=>{
                switch(v.code){
                    case 'INDEX_ICON_CLASS':
                        if(v.img!="") classSrc = config.imgPublicPath + v.img;
                        break;
                    case 'INDEX_ICON_SHARE':
                        if(v.img!="") shareSrc = config.imgPublicPath +  v.img;
                        break;
                    case 'INDEX_ICON_QR':
                        if(v.img!="") QRSrc = config.imgPublicPath +  v.img;
                        break;
                    case 'INDEX_ICON_BZR':
                        if(v.img!="") BZRSrc = config.imgPublicPath +  v.img;
                        break;
                    case 'INDEX_ICON_VIP':
                        if(v.img!="") VIPSrc = config.imgPublicPath +  v.img;
                        break;
                    case 'INDEX_ICON_NEWS':
                        if(v.img!="") newsSrc = config.imgPublicPath +  v.img;
                        break;
                    case 'INDEX_ICON_FACECLASS':
                        if(v.img!="") faceSrc = config.imgPublicPath +  v.img;
                        break;
                    case 'INDEX_ICON_MORE':
                        if(v.img!="") moreSrc = config.imgPublicPath +  v.img;
                        break;
                    case 'INDEX_ICON_DLS':
                        if(v.img!="") DLSSrc = config.imgPublicPath +  v.img;
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
            <div className={style.menuItem}>
                <img src={VIPSrc} onClick={()=>{this.context.router.push('confirmOrder?type=VIP&id=OFFER001&otherId=OFFER002')}}/>
                <div>会员升级</div>
            </div>
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