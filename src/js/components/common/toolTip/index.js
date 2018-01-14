/**
 * Created by 小敏哥 on 2017/7/17.
 */
import React, {Component} from 'react';
import style from './index.scss';
class ToolTip extends Component {
    constructor(props) {
        super(props);
        this.state={
            show:false,//是否显示
        };
        this.hide=this.hide.bind(this);
        ToolTip.show=this.show.bind(this);
        ToolTip.hide=this.hide.bind(this);
    }

    //隐藏提示框
    hide(){
        this.setState({
           show:false
        });
    }

    //静态方法，显示tooltip
    show(){
        this.setState({
            show:true
        })
    }


    getMainClass(){
        return this.state.show?style.toolTipContainer:style.toolTipContainer+' '+style.hide;
    }

    render(){
        return <div className={this.getMainClass()}>
            <div className={style.toolTipHeader}></div>
            <div className={style.toolTipContent}><div>{this.props.text}</div><button className={style.img} onClick={this.hide}></button></div>
        </div>
    }
}

export default ToolTip