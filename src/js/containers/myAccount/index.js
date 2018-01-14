import React, {Component} from 'react';
import {connect} from "react-redux";
import style from './index.scss';
import TitleBar from "../../components/share/titleBar/index";
import ItemList from '../../components/share/itemList';
import  ItemGoToSomeWhere from '../../components/share/itemGoToSomeWhere';
import BottomMenu from '../../components/share/bottomMenu';
import {getMyAccountInit} from '../../actions/myAccountAction';
import {Toast} from 'antd-mobile'


class MyAccount extends Component {
    constructor(props) {
        super(props);
    }


    //跳转
    toUrl(url){
        this.context.router.push(url);
    }

    componentDidMount(){
        wx.ready(() => {
            wx.hideOptionMenu();
        });
        this.props.dispatch(getMyAccountInit({}));
    }

    //设置密码
    goToSetPassword(){
        if(!this.props.isBindUser){
            Toast.info('请先绑定手机或邮箱',2);
        }
        else{
            this.toUrl('/setPayPassword');
        }
    }

    //跳转到提现到银行卡
    goToWithdrawalsByCard(){
        if(!this.props.hasPassword){
            Toast.info('请先设置支付密码',2);
        }
        else{
            this.toUrl('/chooseMyCard');
        }
    }

    //跳转到提现到微信
    goToWithdrawals(){
        if(!this.props.hasPassword){
            Toast.info('请先设置支付密码',2);
        }
        else{
            this.toUrl('/withdrawals');
        }
    }


    render(){
        return <div className={style.myAccount}>
            <TitleBar title="奖学金"/>
            <div className={style.headerContent}>
                <div>{this.props.balance?this.props.balance:0}</div>
                <div>账户余额（元）</div>
            </div>
            <div className={style.detail}>
                <div className={style.flexItem}>
                    <div>累计总收入</div>
                    <div>今日收入</div>
                    <div>最近7天收入</div>
                </div>
                <div className={style.flexItem}>
                    <div>{this.props.totalIncome?this.props.totalIncome:0}</div>
                    <div>{this.props.todayIncome?this.props.todayIncome:0}</div>
                    <div>{this.props.recent7DIncome?this.props.recent7DIncome:0}</div>
                </div>
            </div>
            <div className={style.mainItem}>
                <ItemList>
                    <ItemGoToSomeWhere to={()=>{this.goToWithdrawalsByCard()}}>
                        <div className={style.itemContent}>
                            <img src="./images/my/tixiandaoyinhangka.png"/>
                            <div>提现到银行卡</div>
                        </div>
                    </ItemGoToSomeWhere>
                    <ItemGoToSomeWhere to={()=>{this.goToWithdrawals()}}>
                        <div className={style.itemContent}>
                            <img src="./images/my/tixiandaoweixinqianbao.png"/>
                            <div>提现到微信钱包</div>
                        </div>
                    </ItemGoToSomeWhere>
                    <ItemGoToSomeWhere to={()=>{this.goToSetPassword()}}>
                        <div className={style.itemContent}>
                            <img src="./images/my/shezhizhifumima.png"/>
                            <div>设置支付密码</div>
                        </div>
                    </ItemGoToSomeWhere>
                </ItemList>
            </div>

            <div className={style.mainItem}>
                <ItemList>
                    <ItemGoToSomeWhere to={()=>{this.toUrl('/incomeDetail')}}>
                        <div className={style.itemContent}>
                            <img src="./images/my/shourumingxi.png"/>
                            <div>收入明细</div>
                        </div>
                    </ItemGoToSomeWhere>
                    <ItemGoToSomeWhere to={()=>{this.toUrl('/withdrawalsRecord')}}>
                        <div className={style.itemContent}>
                            <img src="./images/my/yitixian.png"/>
                            <div>已提现</div>
                        </div>
                    </ItemGoToSomeWhere>
                    <ItemGoToSomeWhere to={()=>{this.toUrl('/consumptionList')}}>
                        <div className={style.itemContent}>
                            <img src="./images/my/xiaofeijilv.png"/>
                            <div>消费记录</div>
                        </div>
                    </ItemGoToSomeWhere>
                </ItemList>
            </div>
            <BottomMenu active={1}/>
        </div>
    }
}

//使用context
MyAccount.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return Object.assign({}, state.myAccountInfo.myAccountInit,state.homeInfo.userInfo);
}

export default connect(mapStateToProps)(MyAccount)