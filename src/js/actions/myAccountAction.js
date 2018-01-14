/**
 * Created by 小敏哥 on 2017/11/17.
 */
import {
    MY_ACCOUNT_INIT,
    WIDTHDRAWALS_RECORD,
    CONSUMPTION_lIST,
    IMCOME_DETAIL,
    CARD_LIST,
    CURRENT_CARD,
    BANK_LIST,
    MY_BALANCE
} from './actionsTypes'
import commonAction from './commonAction';

export const myAccountInit = data => ({type: MY_ACCOUNT_INIT, data: data}); //首页初始化信息
export const widthdrawalsRecord = data => ({type: WIDTHDRAWALS_RECORD, data: data}); //提现列表
export const consumplistList = data => ({type: CONSUMPTION_lIST, data: data}); //消费记录
export const incomeDetail = data => ({type: IMCOME_DETAIL, data: data}); //消费记录
export const cardList = data => ({type: CARD_LIST, data: data}); //用户银行卡列表
export const currentCard = data => ({type: CURRENT_CARD, data: data}); //选择的银行卡
export const bankList = data => ({type: BANK_LIST, data: data}); //用户银行卡列表
export const myBalance = data => ({type: MY_BALANCE, data: data}); //我的余额

//获取初始化信息
export const getMyAccountInit = (data, callBack) => {
    return commonAction.simplePost(data, 'api/account/init', myAccountInit, callBack);
};

//获取提现列表
export const getDrawalsRecord = (data, callBack) => {
    return commonAction.simplePost(data, 'api/account/cashList', widthdrawalsRecord, callBack);
};

//获取消费列表
export const getConsumplistList = (data, callBack) => {
    return commonAction.simplePost(data, 'api/account/Detail', consumplistList, callBack);
};

//获取收入明细列表
export const getIncomeDetail = (data, callBack) => {
    return commonAction.simplePost(data, 'api/account/Detail', incomeDetail, callBack);
};

//获取银行卡列表
export const getCardList = (data, callBack) => {
    return commonAction.simplePost(data, 'api/account/cardList', cardList, callBack);
};

//绑定银行卡
export const bindCard = (data, callBack) => {
    return commonAction.simplePost(data, 'api/account/bindBankcard', undefined, callBack);
};

//设置密码
export const setPassword = (data, callBack) => {
    return commonAction.simplePost(data, 'api/account/setPayPassword', undefined, callBack);
};

//获取支持的银行列表
export const getBankList = (data, callBack) => {
    return commonAction.simplePost(data, 'api/account/bankList', bankList, callBack);
};

//解绑银行卡
export const unBindCard = (data, callBack) => {
    return commonAction.simplePost(data, 'api/account/unbindBankcard', undefined, callBack);
};

//提现
export const withdrawals = (data, callBack) => {
    return commonAction.simplePost(data, 'api/account/getCash', undefined, callBack);
};


//我的余额
export const getMyBalance = (data, callBack) => {
    return commonAction.simplePost(data, 'api/account/balance', myBalance, callBack);
};