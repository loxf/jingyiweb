import React, {Component} from 'react';
import style from './index.scss';

class ActivityMessage extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        let {activeName,addr,limit,activeStartTime,activeEndTime}=this.props.messages;
        return <div className={style.container}>
            <div className={style.title}>{activeName}</div>
            <div className={style.item}><img src="./images/activityDetail/xiangqing-ditu.png"/><span>{addr}</span></div>
            <div className={style.item}><img src="./images/activityDetail/xiangqing-renyuan.png"/><span>{`限${limit}人`}</span></div>
            <div className={style.item}><img src="./images/activityDetail/xiangqing-shijian.png"/><span>{`${activeStartTime} 至 ${activeEndTime}`}</span></div>
        </div>
    }
}

export default ActivityMessage