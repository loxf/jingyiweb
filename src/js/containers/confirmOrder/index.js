import React, {Component} from 'react';
import style from './index.scss';
import TitleBar from "../../components/share/titleBar/index";
import InputItem from '../../components/share/inputItem';
import ProductList from '../../components/confirmOrder/productList';
import ChooseList from '../../components/share/chooseList';
import UrlOperation from '../../utils/urlOperation';
import SubmitButton from '../../components/share/submitButton';
import {connect} from "react-redux";
import {getMyBalance} from '../../actions/myAccountAction'
import {createOrder, initOrder, payOrder} from '../../actions/productAction'
import {Toast} from 'antd-mobile';
import md5 from 'js-md5'
import ReModal from '../../components/common/reModal';
import PayByIntegral from '../../components/confirmOrder/payByIntegral';


class ConfirmOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProductIndex: 0,
            userName: '',
            userPhone: '',
            useIntegralCount: 0,//使用的积分
            useIntegral: false,
        };
        this.password = '';//支付密码
        this.urlOperation = new UrlOperation();
        if(window.__wxjs_environment === 'miniprogram'){
            this.payType = '5';
        }else{
            this.payType = '1';
        }
    }

    //初始化订单
    initOrder() {
        let offerId = this.urlOperation.getParameters().otherId ? (this.urlOperation.getParameters().id + ',' + this.urlOperation.getParameters().otherId) : this.urlOperation.getParameters().id;
        this.props.dispatch(initOrder({
            offerId: offerId,
            type: this.urlOperation.getParameters().type,
        }));
    }

    componentDidMount() {
        //初始化订单
        this.initOrder();
        //获取余额
        this.props.dispatch(getMyBalance({}));
        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }

    //将商品类型转化为订单类型
    getOrderType(type) {
        if (type == 'OFFER' || type == 'CLASS') {
            return 1;
        }
        else if (type == 'ACTIVE') {
            return 5;
        }
        else if (type == 'VIP') {
            return 3;
        }
    }

    setPayType(index) {
        if(window.__wxjs_environment === 'miniprogram'){
            this.payType = index == 0 ? 3 : 5;
        }else{
            this.payType = index == 0 ? 3 : 1;
        }
    }

    submit() {
        if (this.props.confirmOrderDetail.attrList && (!this.state.userName || !this.state.userPhone)) {
            Toast.info('请填写参与人姓名和联系电话',2);
            return;
        }

        if(this.state.useIntegralCount>parseFloat(this.props.confirmOrderDetail.bp)){
            Toast.info('没有足够的可用积分');
            return;
        }

        if(this.state.useIntegralCount>this.props.confirmOrderDetail.offerList[this.state.currentProductIndex].maxBp){
            Toast.info('最多可使用'+this.props.confirmOrderDetail.offerList[this.state.currentProductIndex].maxBp+'积分',2);
            return;
        }
        let attrList = [];
        if (this.props.confirmOrderDetail.attrList) {
            attrList = [{
                attrCode: 'ACTIVITY_USER_NAME',
                attrName: '参与人姓名',
                attrValue: this.state.userName,
            }, {
                attrCode: 'ACTIVITY_CONTACT',
                attrName: '联系电话',
                attrValue: this.state.userPhone,
            }]
        }
        let payCount=this.getPayCount();
        let apiObj = {
            attrListStr: JSON.stringify(attrList),
            bp:this.state.useIntegral?this.state.useIntegralCount:0,
            objId: this.props.confirmOrderDetail.offerList[this.state.currentProductIndex].offerId,
            orderType: this.getOrderType(this.urlOperation.getParameters().type),
            payType: payCount>0?this.payType:'3',//支付金额为0时强制余额支付
        };

        this.props.dispatch(createOrder(apiObj, (result) => {
            if (this.payType == '3'||payCount==0) {
                setTimeout(() => {
                    //弹窗之前重新初始化输入框，防止缓存
                    document.getElementById('payPassword').value = '';
                    this.password = '';
                }, 0);
                ReModal.alert(<div className={style.password}><input id="payPassword" type="password"
                                                                     placeholder="请输入密码" onInput={(e) => {
                    this.password = e.target.value
                }}/></div>, () => {
                    let submitObj = {
                        password: md5(this.password),
                        orderId: result.data.orderId
                    };
                    this.props.dispatch(payOrder(submitObj, () => {
                        ReModal.close();
                        Toast.info('支付成功', 2);
                        setTimeout(() => {
                            history.go(-1);
                        }, 2000)
                    }))
                },{clickClose:false})
            }
            else {
                if(window.__wxjs_environment === 'miniprogram'){
                    let packageText;
                    if(result.data.package){
                        packageText = result.data.package.replace(/=/, "-");
                    }
                    wx.miniProgram.navigateTo({
                        url: '../pay/pay?timeStamp='+result.data.timeStamp+'&nonceStr='+result.data.nonceStr+'&package='+packageText+'&signType='+result.data.signType+'&paySign='+result.data.paySign
                    })
                }else{
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId": result.data.appId,     //公众号名称，由商户传入
                            "timeStamp": result.data.timeStamp,         //时间戳，自1970年以来的秒数
                            "nonceStr": result.data.nonceStr, //随机串
                            "package": result.data.package,
                            "signType": result.data.signType,         //微信签名方式：
                            "paySign": result.data.paySign //微信签名
                        },
                        function (res) {
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                history.back();
                            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                        }
                    );
                }
                /*wx.chooseWXPay({

                    timestamp: result.data.timeStamp,// 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符

                    nonceStr: result.data.nonceStr, // 支付签名随机串，不长于 32 位

                    package: result.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）

                    signType: result.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'

                    paySign: result.data.paySign, // 支付签名

                    success: function (res) {
                        console.log(res);
                        alert(res.errorMsg)
                        // 支付成功后的回调函数

                    },
                    fail:function(res){
                        alert(JSON.stringify(res));
                    }

                });*/
            }
        }))
    }

    //获取支付金额
    getPayCount(){
        let price=this.props.confirmOrderDetail.offerList[this.state.currentProductIndex].price;
        if(this.state.useIntegral) {
            return (parseFloat((price - this.state.useIntegralCount / 10).toFixed(2)) > 0 ? parseFloat((price - this.state.useIntegralCount / 10).toFixed(2)) : 0)
        }
        else{
            return price;
        }
    }

    render() {
        return <div className={style.confirmOrder}>
            <TitleBar title="确认订单"/>
            {this.props.confirmOrderDetail ?
                <ProductList productList={this.props.confirmOrderDetail.offerList} onChange={(index) => {
                    this.setState({currentProductIndex: index})
                }}/> : ''}
            {this.props.confirmOrderDetail&&this.props.confirmOrderDetail.attrList ? <div className={style.userMessage}>
                <div className={style.title}>订单内容</div>
                <div className={style.input}>
                    <InputItem text="参与人姓名" placeholder="请填写参与人姓名" onChange={(val) => {
                        this.setState({userName: val})
                    }}/>
                </div>
                <div className={style.input}>
                    <InputItem text="联系电话" placeholder="请填写联系电话" onChange={(val) => {
                        this.setState({userPhone: val})
                    }}/>
                </div>
            </div> : ''}

            {this.props.confirmOrderDetail && this.props.confirmOrderDetail.bp && this.props.confirmOrderDetail.offerList[this.state.currentProductIndex].maxBp > 0 ?
                <PayByIntegral all={this.props.confirmOrderDetail.bp}
                               max={this.props.confirmOrderDetail.offerList[this.state.currentProductIndex].maxBp}
                               changeCallBack={(value) => {
                                   this.setState({
                                       useIntegralCount: parseInt(value ? value : 0),
                                   })
                               }} activeChange={(value) => {
                    this.setState({
                        useIntegral: value,
                    })
                }}/> : ''}

            {this.props.confirmOrderDetail&&this.getPayCount()>0?<div className={style.payTypeTitle}>
                支付方式
            </div>:''}
            {this.props.confirmOrderDetail&&this.getPayCount()>0 ?
                <ChooseList active={1} delete={false} tickImg="./images/confirmOrder/quwerendingdan.png"
                            onChange={(index) => {
                                this.setPayType(index)
                            }}>
                    {this.props.confirmOrderDetail.hasPassword ?
                        <div className={style.payTypeItem}><img src="./images/confirmOrder/yuer.png"/>
                            <div>余额<span>{`（可用余额￥${this.props.myBalance}）`}</span></div>
                        </div> : ''}
                    <div className={style.payTypeItem}><img src="./images/confirmOrder/weixin.png"/>
                        <div>微信</div>
                    </div>
                </ChooseList> : ''}
            {this.props.confirmOrderDetail ? <div className={style.submit}>
                <SubmitButton onClick={() => {
                    this.submit()
                }}>{'确认支付￥' + this.getPayCount()}</SubmitButton>
            </div> : ''}
        </div>
    }
}


function mapStateToProps(state) {
    return Object.assign({}, state.myAccountInfo, state.productInfo);
}

export default connect(mapStateToProps)(ConfirmOrder)