import React, {Component} from 'react';
import style from './index.scss';

class BottomMenu extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        active: React.PropTypes.number.isRequired,//选中
    };

    go(type){
        let url='';
        if(type==0){
            url='/'
        }
        else if(type==1){
            url='/myAccount'
        }
        else{
            url='/my'
        }

        this.props.active!=type&&this.context.router.push(url);
    }

    render() {
        return <div className={style.container}>
            <div className={style.menu}>
                <div className={style.item} onClick={()=>{this.go(0)}}>
                    <img src={this.props.active==0?"./images/share/shouye-checked.png":"./images/share/shouye.png"}/>
                    <div>首页</div>
                </div>
                <div className={style.item} onClick={()=>{this.go(1)}}>
                    <img src={this.props.active==1?"./images/share/jiangxuejin-checked.png":"./images/share/jiangxuejin.png"}/>
                    <div>奖学金</div>
                </div>
                <div className={style.item} onClick={()=>{this.go(2)}}>
                    <img src={this.props.active==2?"./images/share/wode-checked.png":"./images/share/wode.png"}/>
                    <div>个人中心</div>
                </div>
            </div>
        </div>
    }
}


//使用context
BottomMenu.contextTypes = {
    router: React.PropTypes.object.isRequired
};


export default BottomMenu;