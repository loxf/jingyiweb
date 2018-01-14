/*提现*/
import React, {Component} from 'react';
import {connect} from "react-redux";
import TitleBar from '../../components/share/titleBar'
import style from './index.scss';
import SubmitButton from '../../components/share/submitButton';
import BankCardItem from '../../components/chooseMyCard/bankCardItem'
import ItemGoToSomeWhere from '../../components/share/itemGoToSomeWhere';
import ReModal from '../../components/common/reModal';
import {withdrawals} from '../../actions/myAccountAction'
import md5 from 'js-md5'
import {Toast} from 'antd-mobile';

class WithdrawalsByCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            money: '',
            charge:0,
        };
        this.password='';//提现密码
        this.inputChange = this.inputChange.bind(this);
        this.setFull = this.setFull.bind(this);
        this.checkAndGetAlway();
    }

    //回到首页
    goHome() {
        history.pushState({}, '', '');
        let backLength = -1 * (history.length - 1);
        history.go(backLength);
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

    //检查数据是否完整，否则跳转，防止页面刷新数据丢失
    checkAndGetAlway(){
        if(!this.props.myAccountInit){
            this.goHome();
        }
        if(!this.props.currentCard){
            history.back();
        }
    }

    componentDidMount() {
        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }

    componentWillUnmount(){
        document.getElementById('withdrawalsByCardPassword').value='';
    }

    submit(){
        if(!this.state.money){
            Toast.info('请输入提现金额',2);
            return;
        }
        if(parseFloat(this.state.money)<1){
            Toast.info('提现金额需大于1元',2);
            return;
        }
        setTimeout(()=>{
            //弹窗之前重新初始化输入框，防止缓存
            document.getElementById('withdrawalsByCardPassword').value='';
            this.password='';
        },0);
        ReModal.alert(<div className={style.password}><input id="withdrawalsByCardPassword" type="password" placeholder="请输入提现密码" onInput={(e)=>{this.password=e.target.value}}/></div>,()=>{
            let submitObj={
                balance:this.state.money,
                objId:this.props.currentCard.cardId,
                password:md5(this.password),
                type:2,
                sign:md5('2'+'||'+this.props.currentCard.cardId+'||'+parseFloat(this.state.money).toFixed(2))
            };
            this.props.dispatch(withdrawals(submitObj,()=>{
                Toast.info('提现成功',2);
                setTimeout(()=>{
                    history.go(-2);
                },2000)
            }))
        })
    }

    render() {
        return <div className={style.withdrawalsByCard}>
            <TitleBar title="提现" share={false}/>
            <div className={style.cardItem}>
                {this.props.currentCard ? <ItemGoToSomeWhere to={() => {
                    history.back();
                }}>
                    <BankCardItem bankName={this.props.currentCard.bank} number={this.props.currentCard.bankNo} showRate={true}/>
                </ItemGoToSomeWhere> : ''}
            </div>
            <div className={style.content}>
                <div className={style.message}>提现金额</div>
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

WithdrawalsByCard.defaultProps = {
};


function mapStateToProps(state) {
    return Object.assign({}, state.myAccountInfo);
}

export default connect(mapStateToProps)(WithdrawalsByCard)