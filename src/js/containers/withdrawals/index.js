/*提现*/
import React, {Component} from 'react';
import {connect} from "react-redux";
import TitleBar from '../../components/share/titleBar'
import style from './index.scss';
import SubmitButton from '../../components/share/submitButton';
import ReModal from '../../components/common/reModal';
import {withdrawals} from '../../actions/myAccountAction'
import md5 from 'js-md5'
import {Toast} from 'antd-mobile';
import cookiesOperation from '../../utils/cookiesOperation';

class Withdrawals extends Component {

    constructor(props) {
        super(props);
        this.state={
            money:'',
            charge:0,
        };
        this.inputChange=this.inputChange.bind(this);
        this.setFull=this.setFull.bind(this);
        this.password='';//提现密码
    }

    //输入值改变
    inputChange(e) {
        this.setState({
            money: e.target.value,
            charge:(e.target.value*0.006).toFixed(2),
        });
    }

    //填入所有余额
    setFull() {
        this.setState({
            money: this.props.myAccountInit.balance,
            charge:(this.props.myAccountInit.balance*0.06).toFixed(2),
        })
    }

    //回到首页
    goHome(){
        history.pushState({},'','');
        let backLength=-1*(history.length-1);
        history.go(backLength);
    }

    componentDidMount() {
        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }

    componentWillUnmount(){
        document.getElementById('withdrawalsPassword').value='';
    }

    submit(){
        if(!this.state.money){
            Toast.info('请输入提现金额',2);
            return;
        }
        if(parseFloat(this.state.money)<=0){
            Toast.info('提现金额需大于0',2);
            return;
        }
        setTimeout(()=>{
            //弹窗之前重新初始化输入框，防止缓存
            document.getElementById('withdrawalsPassword').value='';
            this.password='';
        },0);
        ReModal.alert(<div className={style.password}><input id="withdrawalsPassword" ref="passwordInput" type="password" placeholder="请输入提现密码" onInput={(e)=>{this.password=e.target.value}}/></div>,()=>{
            let submitObj={
                balance:this.state.money,
                objId:cookiesOperation.getCookie('JY_CUST_ID'),
                password:md5(this.password),
                type:1,
                sign:md5('1'+'||'+cookiesOperation.getCookie('JY_CUST_ID')+'||'+parseFloat(this.state.money).toFixed(2))
            };
            this.props.dispatch(withdrawals(submitObj,()=>{
                Toast.info('提现成功',2);
                setTimeout(()=>{
                    history.go(-1);
                },2000)
            }))
        })
    }

    render() {
        return <div className={style.container}>
            <TitleBar title="提现到微信钱包" right={{img:'./images/share/fangzi.png',onClick:()=>{this.goHome()}}}/>
            <div className={style.content}>
                <div className={style.message}>提现金额（费率0.6%）</div>
                <div className={style.input}>
                    <div>￥</div>
                    <input type="number" value={this.state.money} onChange={this.inputChange}/>
                    <div className={style.rate}>{`手续费￥${this.state.charge}元`}</div>
                </div>
                <div className={style.bottomMessage}>
                    {this.props.myAccountInit?<div>{`可用余额${this.props.myAccountInit.balance}元`}</div>:''}
                    <a onClick={this.setFull}>全部提现</a></div>
            </div>
            <div className={style.submit}>
                <SubmitButton onClick={()=>{this.submit()}}>确认提现</SubmitButton>
            </div>
            <div className={style.tips}>明天24点前到账</div>
        </div>
    }
}


function mapStateToProps(state) {
    return Object.assign({}, state.myAccountInfo);
}

export default connect(mapStateToProps)(Withdrawals)