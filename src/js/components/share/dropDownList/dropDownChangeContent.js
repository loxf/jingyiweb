import React, {Component} from 'react';
import style from './index.scss';

class DropDownChangeContent extends Component {
    constructor(props) {
        super(props);
        this.state={
            show:false,
            active:-1,
            activeText:''
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
        this.props.onChange&&this.props.onChange(index,text);

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
        title:React.PropTypes.string.isRequired,//标题
    };

    render(){
        return <div className={style.container}>
            <div className={style.itemContent} onClick={()=>{this.changeVisable()}}>
                <div>{this.props.title}</div>
                <img src="./images/toBeAgent/xiasanjiao.png"/>
                <input readOnly value={this.state.activeText}/>
            </div>
            <div className={this.state.show?style.list:style.hide}>
                {this.structList()}
            </div>
            <div className={this.state.show?style.mask:style.hide}></div>
        </div>
    }
}

export default DropDownChangeContent;