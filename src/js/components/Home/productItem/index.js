import React, {Component} from 'react';
import style from './index.scss';

class ProductItem extends Component {
    constructor(props) {
        super(props);
    }

    getVipType(typeName){
        switch (typeName){
            case 'NONE':
                return {name:'免费',iconName:"url('../../../../images/my/free.png')"};
            case 'VIP':
                return {name:'VIP',iconName:"url('../../../../images/my/vip.png')"};
            case 'SVIP':
                return {name:'SVIP',iconName:"url('../../../../images/my/svip.png')"};
            default:
                return {name:'',iconName:''};

        }
    }

    static propTypes = {
        showVipIcon:React.PropTypes.bool,//是否显示额外的icon
        freeType:React.PropTypes.string,//免费类型
    };


    render(){
        let vipIconstyle={};
        let vipObj=this.getVipType(this.props.freeType);
        if(vipObj.iconName){
            vipIconstyle={backgroundImage:vipObj.iconName};
        }
        return <div className={style.container} onClick={this.props.onClick}>
            {this.props.showVipIcon?<div className={style.vipIcon} style={vipIconstyle}>{vipObj.name}</div>:''}
            <img className={style.contentImg} src={this.props.imgUrl}/>
            <div className={style.content}>
                <div><img className={style.typeImg} src={this.props.offerType=='OFFER'?'./images/my/taocan.png':'./images/my/kecheng.png'}/><span className={style.title}>{this.props.title}</span></div>
                <div>{this.props.time}</div>
                <div>讲师：{this.props.teacher}</div>
                {this.props.count?<div>播放次数：{this.props.count}</div>:''}
                {this.props.price?<div>价格：￥{this.props.price}</div>:''}
            </div>
        </div>
    }
}


export default ProductItem;