/**
 * Created by 小敏哥 on 2017/6/21.
 */
import React, {Component} from 'react';
import style from './checkBoxItem.scss';
class CheckBoxItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            checked:props.checked?props.checked:false
        };
        this.changeCheckState=this.changeCheckState.bind(this);
    }

    static propTypes = {
        checked:React.PropTypes.bool,//是否默认选中
        type:React.PropTypes.string,//按钮类型，check点击完可取消，radio二次点击不取消
        text:React.PropTypes.string,//按钮文字
        className:React.PropTypes.string,//从父控件传过来的主样式，可覆盖
        checkedCallBack:React.PropTypes.func,//点击后回调
        forceChecked:React.PropTypes.bool,//提供一个从外部控制是否选中的入口，优先级最高
    };


    //修改选中状态
    changeCheckState(){
        let value=this.props.type=='radio'?true:!this.state.checked;
        this.setState({
            checked:value
        });
        this.props.checkedCallBack(value);
    }

    render(){
        return <div className={this.props.className+' '+ style.CheckBoxItem} onClick={this.changeCheckState}>
            <div className={(this.props.forceChecked!=undefined?this.props.forceChecked:this.state.checked)?style.checkIcon+' '+style.checked:style.checkIcon}></div>
            {this.props.text?<div className={style.text}>{this.props.text}</div>:''}
        </div>
    }
}

export default CheckBoxItem