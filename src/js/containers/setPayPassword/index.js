import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';
import InputItem from '../../components/share/inputItem';
import VerificationCodeItem from '../../components/share/verificationCodeItem';
import ItemList from '../../components/share/itemList';
import SubmitButton from '../../components/share/submitButton';
import TitleBar from "../../components/share/titleBar/index";
import {getUserInfo} from '../../actions/homeAction'
import {setPassword} from '../../actions/myAccountAction';
import {sendMsg} from '../../actions/myAction';
import md5 from 'js-md5'
import {Toast} from 'antd-mobile';

class SetPayPassword extends Component {
    constructor(props) {
        super(props);
        this.msgCode = '';//验证码
        this.password='';
        this.rePassword='';
    }

    goHome() {
        history.pushState({}, '', '');
        let backLength = -1 * (history.length - 1);
        history.go(backLength);
    }

    componentDidMount() {
        this.props.dispatch(getUserInfo({}, () => {
        }));
        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }

    //发送验证码
    sendMessage() {
        this.props.dispatch(sendMsg({obj: this.textValue, type: 1}, () => {
            Toast.info('验证码发送成功', 2);
        }));
        return true;
    }

    //提交修改密码请求
    submit(){
        if(this.msgCode&&this.password&&this.rePassword){
            let passwordTest=/^\d{6}$/ig;
            if(!passwordTest.test(this.password)){
                Toast.info('请输入六位数字密码！', 2);
            }
            else if(this.password!=this.rePassword){
                Toast.info('确认密码必须和密码一致！', 2);
            }
            else{
                this.props.dispatch(setPassword({password:md5(this.password),verifyCode:this.msgCode},()=>{
                    Toast.info('密码修改成功', 2);
                    setTimeout(()=>{
                        history.back();
                    },2000);
                }))
            }
        }
        else{
            Toast.info('请按要求完整输入！', 2);
        }
    }


    render() {
        return <div className={style.container}>
            <TitleBar share={false} title="设置支付密码" right={{
                img: './images/share/fangzi.png', onClick: () => {
                    this.goHome()
                }
            }}/>
            {this.props.userInfo ? <div className={style.commonItem}>
                <div className={style.phone}>
                    <div>{this.props.userInfo.email ? '邮箱' : '手机号码'}</div>
                    <div>{this.props.userInfo.email ? this.props.userInfo.email : this.props.userInfo.phone}</div>
                </div>
                {/*<DropDownChangeTitle defaultText="用户类型" list={this.props.userType}/>*/}
            </div> : ''}
            <div className={style.commonItem}>
                <ItemList>
                    <VerificationCodeItem text="验证码" placeholder="验证码"
                                          sendMessage={() => {
                                              return this.sendMessage()
                                          }} onChange={(value => {
                        this.msgCode = value;
                    })}/>
                    <InputItem text="密码" placeholder="请输入密码" type="password" onChange={(value)=>{this.password=value}}/>
                    <InputItem text="确认密码" placeholder="请选确认密码" type="password" onChange={(value)=>{this.rePassword=value}}/>
                </ItemList>
            </div>
            <div className={style.buttonGroup}>
                <SubmitButton onClick={()=>{this.submit()}}>完成</SubmitButton>
            </div>

        </div>
    }
}

function mapStateToProps(state) {
    return Object.assign({}, state.homeInfo);
}

SetPayPassword.defaultProps = {
    userType: [{text: '国内用户'}, {text: '海外用户'}],
};


export default connect(mapStateToProps)(SetPayPassword)