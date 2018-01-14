import React, {Component} from 'react';
import style from './index.scss';

class SubmitButton extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        enable:React.PropTypes.bool,//是否可用
        onClick:React.PropTypes.func,//点击事件
    };


    render(){
        return <button onClick={()=>{this.props.onClick&&this.props.onClick()}} className={this.props.enable==false?style.submitButton+' '+style.unable:style.submitButton}>{this.props.children}</button>
    }
}

export default SubmitButton