import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';

class ChooseItem extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        active: React.PropTypes.bool,//是否选中
        title:React.PropTypes.string,//选项头
        text:React.PropTypes.string,//选项文字
        onClick:React.PropTypes.func,//点击回调
    };

    render() {
        return <div className={style.chooseItem} onClick={()=>{this.props.onClick()}}>
            {this.props.active ? <img className={style.title}  src="./images/exam/gouqi.png"/> : <div className={style.title}>{this.props.title}</div>}
            <p>{this.props.text}</p>
        </div>
    }
}

export default ChooseItem