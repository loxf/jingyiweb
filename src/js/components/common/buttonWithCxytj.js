/**
 * Created by 小敏哥 on 2017/4/14.
 */
import React, {Component} from 'react';
class ButtonWithCxytj extends Component {
    constructor(props) {
        super(props);
        this.buttonClick=this.buttonClick.bind(this);
    }

    //附加埋点功能
    buttonClick(){
        this.props.onClick&&this.props.onClick();
    }

    render(){
        return <button onClick={this.buttonClick} className={this.props.className}>{this.props.children}</button>
    }
}

export default  ButtonWithCxytj