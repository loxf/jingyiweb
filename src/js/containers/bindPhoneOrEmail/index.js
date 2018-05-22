import React, {Component} from 'react';
import style from './index.scss';
import {connect} from 'react-redux';
import VerificationCodeItem from '../../components/share/verificationCodeItem';
import SubmitButton from '../../components/share/submitButton';
import TitleBar from "../../components/share/titleBar/index";
import DropDownChangeTitle from '../../components/share/dropDownList/dropDownChangeTitle';
import {sendMsg, bindPhoneOrEmail} from '../../actions/myAction';
import InputItem from '../../components/share/inputItem';
import {Toast} from 'antd-mobile';

class BeTheAgent extends Component {
    constructor(props) {
        super(props);
        this.textValue = '';//邮箱或者电话
        this.msgCode = '';//验证码
        this.realName = '';
        this.placeholder=['请输入电话号码','请输入电子邮箱'],
        this.state = {
            userType: [{text: '国内用户'}, {text: '海外用户'}],
            currentType: 0,
        }
    }

    componentDidMount() {
        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }

    sendMessage() {
        if (this.state.currentType == -1) {
            Toast.info('请选择用户类型', 2);
            return false;
        }
        else if (this.textValue == '') {
            Toast.info('请输入联系方式', 2);
            return false;
        }
        else {
            let testStr;
            if(this.state.currentType==0){
                testStr=/^\d{11}$/ig;
                if(!testStr.test(this.textValue)){
                    Toast.info('请输入正确的电话号码', 2);
                    return false;
                }
            }
            if(this.state.currentType==1){
                testStr=/^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ig;
                if(!testStr.test(this.textValue)){
                    Toast.info('请输入正确的邮箱', 2);
                    return false;
                }
            }
            this.props.dispatch(sendMsg({obj: this.textValue, type: 2}, () => {
                Toast.info('验证码发送成功', 2);
            }));
            return true;
        }
    }

    //提交数据
    submit() {
        try {
            if (this.state.currentType == -1) {
                Toast.info('请选择用户类型', 2);
            }
            else if (this.textValue == '') {
                Toast.info('请输入联系方式', 2)
            }
            else if (this.realName == '') {
                Toast.info('请输入真实姓名', 2);
                return false;
            }
            else if (this.msgCode == '') {
                Toast.info('请输入验证码', 2)
            }
            else {
                this.props.dispatch(bindPhoneOrEmail({
                    email: this.state.currentType == 0 ? '' : this.textValue,
                    isChinese: (this.state.currentType + 1),
                    phone: this.state.currentType == 1 ? '' : this.textValue,
                    realName: this.realName,
                    verifyCode: this.msgCode,
                    loginType:window.__wxjs_environment === 'miniprogram'?"XCX":"WX"
                }, () => {
                    Toast.info('绑定成功', 2);
                    setTimeout(() => {
                        history.back();
                    }, 2);
                }))
            }
         }
         catch (e){
             alert('未知错误，清联系管理员！错误信息：'+e.message);
         }
    }

    render() {
        return <div className={style.container}>
            <TitleBar share={false} title="绑定手机/邮箱"/>
            <div className={style.commonItem}>
                <DropDownChangeTitle active={0} defaultText="用户类型" list={this.state.userType} onChange={(index) => {
                    this.setState({
                        currentType: index
                    })
                }} onTextChange={(value) => {
                    this.textValue = value;
                }} placeholder={this.placeholder[this.state.currentType]}/>
            </div>
            <div className={style.inputItem}>
                <InputItem text="真实姓名" placeholder="真实姓名" onChange={(value) => {
                    this.realName = value;
                }}/>
            </div>
            <div className={style.inputItem}>
                <VerificationCodeItem text="验证码" placeholder={this.state.currentType == 1 ? "邮箱验证码" : "短信验证码"}
                                      sendMessage={() => {
                                          return this.sendMessage()
                                      }} onChange={(value => {
                    this.msgCode = value;
                })}/>
            </div>
            <div className={style.buttonGroup}>
                <SubmitButton onClick={() => {
                    this.submit();
                }}>完成</SubmitButton>
            </div>

        </div>
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(BeTheAgent)