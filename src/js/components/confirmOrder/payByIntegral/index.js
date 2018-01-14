import React, {Component} from 'react';
import style from './index.scss';

class PayByIntergral extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        }
    }

    static propTypes = {
        all:React.PropTypes.string,//可用积分
        max:React.PropTypes.number,//最多使用
        changeCallBack:React.PropTypes.func,//值改变回调
        activeChange:React.PropTypes.func,//选中值改变
    };

    setActive(){
        this.setState({
            active:!this.state.active,
        },()=>{
            this.props.activeChange&&this.props.activeChange(this.state.active)
        })
    }

    render() {
        return <div className={style.payByIntergral}>
            <div className={style.title} onClick={()=>{this.setActive()}}>
                <div>积分抵扣</div>
                <div>{`可用积分：${this.props.all}`}</div>
                <img
                    src={this.state.active ? "./images/confirmOrder/xuanzhong.png" : "./images/confirmOrder/weixuanzhong.png"}/>
            </div>
            <div className={this.state.active ?style.content:style.hide}>
                <div>{`最多使用${this.props.max}积分`}</div>
                <input onChange={(e)=>{this.props.changeCallBack&&this.props.changeCallBack(e.target.value)}}/>
            </div>
        </div>
    }
}

export default PayByIntergral