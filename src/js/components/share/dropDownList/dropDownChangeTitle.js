import React, {Component} from 'react';
import style from './index.scss';

class DropDownChangeTitle extends Component {
    constructor(props) {
        super(props);
        this.state={
            show:false,
            active:typeof(props.active)!='undefined'?props.active:-1,
            activeText:typeof(props.active)!='undefined'?props.list[props.active].text:props.defaultText
        }
    }

    //控制显示隐藏
    changeVisable(){
        this.setState({
            show:!this.state.show
        })
    }

    setActive(index,text){
        this.state={
            active:index,
            activeText:text
        };
        setTimeout(()=>{
            this.setState({
                show:false
            })
        },0);
        this.props.onChange&&this.props.onChange(index);

    }

    structList(){
        return this.props.list.map((item,i)=>{
            return <div onClick={()=>{this.setActive(i,item.text)}} key={i}>
                {this.state.active==i?<div className={style.activeItem}><div>{item.text}</div><img src="./images/toBeAgent/duigou.png"/></div>:<div>{item.text}</div>}
            </div>;
        })
    }

    static propTypes = {
        onChange:React.PropTypes.func.isRequired,//选项切换事件
        list:React.PropTypes.array.isRequired,//选项列表，text：选项文字
        defaultText:React.PropTypes.string.isRequired,//默认文字
        active:React.PropTypes.number,//默认选中项
        onTextChange:React.PropTypes.func.isRequired,//文字改变
        placeholder:React.PropTypes.string,//输入框提示文字
    };

    render(){
        return <div className={style.container}>
            <div className={style.itemContent} onClick={()=>{this.changeVisable()}}>
                <div>{this.state.activeText}</div>
                <img src="./images/toBeAgent/xiasanjiao.png"/>
                <input onClick={(e)=>{e.stopPropagation()}} onChange={(e)=>{this.props.onTextChange&&this.props.onTextChange(e.target.value)}} placeholder={this.props.placeholder?this.props.placeholder:''}/>
            </div>
            <div className={this.state.show?style.list:style.hide}>
                {this.structList()}
            </div>
            <div className={this.state.show?style.mask:style.hide}></div>
        </div>
    }
}

export default DropDownChangeTitle;