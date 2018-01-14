import React, {Component} from 'react';
import style from './index.scss';

class verificationCodeItem extends Component {
    constructor(props) {
        super(props);
        this.count=0,
        this.state={
            message:'获取验证码',
            enable:true,
        }
    }

    static propTypes = {
        text:React.PropTypes.string,//提示文字
        type:React.PropTypes.string,//输入类型
        placeholder:React.PropTypes.string,//输入框提示文字
        sendMessage:React.PropTypes.func.isRequired,//发送验证码回调
        onChange:React.PropTypes.func,//文本改变回调
    };

    //发送短信计数效果
    sendMessageCount(){
        if(this.count>0){
            this.count--;
            this.setState({
                message:'发送中（'+this.count+'s）'
            });
            setTimeout(()=>{
               this.sendMessageCount();
            },1000)
        }
        else{
            this.setState({
                message:'获取验证码',
                enable:true
            })
        }

    }

    countAndSendMessage(){
        if(this.state.enable&&this.props.sendMessage()) {
            this.setState({
                enable:false
            });
            this.count = 60;
            this.sendMessageCount();
        }
    }

    render(){
        return <div className={style.container}>
            <span>{this.props.text}</span>
            <input type={this.props.type?this.props.type:''} placeholder={this.props.placeholder?this.props.placeholder:''} onChange={(e)=>{this.props.onChange(e.target.value)}}/>
            <a className={this.state.enable?'':style.unable} onClick={()=>{this.countAndSendMessage()}}>{this.state.message}</a>
        </div>
    }
}

export default verificationCodeItem