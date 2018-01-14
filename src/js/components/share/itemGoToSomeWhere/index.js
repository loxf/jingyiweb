import React, {Component} from 'react';
import style from './index.scss';

class ItemGoToSomeWhere extends Component {
    constructor(props) {
        super(props);
    }

    static  propTypes = {
        icon:React.PropTypes.string,//箭头图标
        to:React.PropTypes.func,//点击跳转方法
    };

    render(){
        return <div className={style.itemGoToSomeWhere} onClick={this.props.to}>
            <div className={style.content}>{this.props.children}</div>
            <img className={style.img} src={this.props.icon?this.props.icon:'./images/share/jiantou.png'}/>
        </div>
    }
}

export default ItemGoToSomeWhere