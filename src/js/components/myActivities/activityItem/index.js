import React, {Component} from 'react';
import style from './index.scss';
import config from '../../../config';


class ActivityItem extends Component {
    constructor(props) {
        super(props);
    }

    getStatusImg(){
        switch (this.props.data.activeStatus){
            case 1:
                return './images/my/jijiangjinxing.png';
            case 2:
                return './images/my/baomingzhong.png';
            case 3:
                return './images/my/yiguoqi.png';
            default:
                return '';
        }
    }

    render(){
        return <div className={style.activityItem}  onClick={()=>{this.props.onClick&&this.props.onClick()}}>
            <img className={style.mainImg} src={config.imgPublicPath + this.props.data.pic}/>
            <div className={style.content}>
                <div>{this.props.data.activeName}</div>
                <div>{this.props.data.activeStartTime+'至'}</div>
                <div >{this.props.data.activeEndTime}</div>
                <div>{'地点：'+this.props.data.addr}</div>
                <div>{'票号：'+this.props.data.activeTicketNo}</div>
            </div>
            <img className={style.statusImg} src={this.getStatusImg()}/>
        </div>
    }
}

export default ActivityItem


