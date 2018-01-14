import React, {Component} from 'react';
import style from './index.scss';

class ActivityItem extends Component {
    constructor(props) {
        super(props);
    }
    static  propTypes = {
        onClick:React.PropTypes.func,//点击事件
    };

    render(){
        return <div className={style.container} onClick={()=>{this.props.onClick&&this.props.onClick()}}>
            <div className={style.imgContainer}>
                <img src={this.props.imgUrl}/>
            </div>
            <div className={style.title}>{this.props.title}</div>
            <div className={style.time}>{this.props.time}</div>
            <div className={style.address}><img src="./images/home/ditu.png"/><div>{this.props.address}</div></div>
        </div>
    }
}

export default ActivityItem