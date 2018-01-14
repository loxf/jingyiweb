import React, {Component} from 'react';
import style from './index.scss';

class InputItem extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        text:React.PropTypes.string,//提示文字
        type:React.PropTypes.string,//输入类型
        placeholder:React.PropTypes.string,//输入框提示文字
        onChange:React.PropTypes.func,//文本改变回调
    };

    render(){
        return <div className={style.container}>
            <span>{this.props.text}</span>
            <input type={this.props.type?this.props.type:''} placeholder={this.props.placeholder?this.props.placeholder:''} onChange={(e)=>{this.props.onChange&&this.props.onChange(e.target.value)}}/>
        </div>
    }
}

export default InputItem