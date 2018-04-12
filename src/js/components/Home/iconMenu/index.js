import React, {Component} from 'react';
import style from './index.scss';
import ReModal from '../../../components/common/reModal';
import ShareGuide from '../../../components/share/shareGuide';

class IconMenu extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        userLevel: React.PropTypes.string,//用户级别
    };

    render() {
        return <div className={style.menuContainer}>
            <ShareGuide ref="shareGuide"/>
            {/*{this.props.userLevel == 'NONE' ? <div className={style.menuItem}>
                <img src="./images/home/shengjihuiyuan.png" onClick={()=>{this.context.router.push('confirmOrder?type=VIP&id=OFFER001&otherId=OFFER002')}}/>
                <div>升级会员</div>
            </div> : <div className={style.menuItem} onClick={()=>{this.context.router.push('beTheAgent')}}>
                <img src="./images/home/dailishang.png"/>
                <div>升级代理商</div>
            </div>}*/}
            <div className={style.menuItem} onClick={()=>{this.context.router.push('productList')}}>
                <img src="./images/home/producttype.png"/>
                <div>课程分类</div>
            </div>
            <div className={style.menuItem} onClick={() => {
                let random=Math.random()*1000;
                this.context.router.push(`share?random=${random.toFixed(0)}`);
            }}>
                <img src="./images/home/tuiguangfenxiang.png"/>
                <div>推广分享</div>
            </div>
            <div className={style.menuItem} onClick={() => {
                ReModal.showOnlyComponent(<img className={style.codeImg} src="./images/share/gongzhonghao.jpg"/>)
            }}>
                <img src="./images/home/guanzhugongzhonghao.png"/>
                <div>关注公众号</div>
            </div>
            <div className={style.menuItem} onClick={() => {
                if(this.props.userLevel == 'NONE'){
                    ReModal.alert('升级VIP再来添加班主任吧！');
                }
                else {
                    ReModal.showOnlyComponent(<img  className={style.codeImg} src="./images/share/banzhuren.jpg"/>)
                }
            }}>
                <img src="./images/home/tianjiabanzhuren.png"/>
                <div>添加班主任</div>
            </div>
            <div className={style.menuItem}>
                <img src="./images/home/shengjihuiyuan.png" onClick={()=>{this.context.router.push('confirmOrder?type=VIP&id=OFFER001&otherId=OFFER002')}}/>
                <div>升级会员</div>
            </div>
            <div className={style.menuItem} onClick={() => {
                ReModal.alert('暂未开通！');
            }}>
                <img src="./images/home/xueguanxinwen.png"/>
                <div>学馆新闻</div>
            </div>
            <div className={style.menuItem} onClick={() => {
                ReModal.alert('暂未开通！');
            }}>
                <img src="./images/home/mianshoukecheng.png"/>
                <div>面授课程</div>
            </div>
            <div className={style.menuItem} onClick={() => {
                ReModal.alert('已经没有了！');
            }}>
                <img src="./images/home/more.png"/>
                <div>更多</div>
            </div>
        </div>
    }
}

IconMenu.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default IconMenu