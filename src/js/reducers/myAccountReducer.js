/**
 * Created by 小敏哥 on 2017/11/17.
 */
import {MY_ACCOUNT_INIT,WIDTHDRAWALS_RECORD,IMCOME_DETAIL,CONSUMPTION_lIST,CARD_LIST,CURRENT_CARD,BANK_LIST,MY_BALANCE} from '../actions/actionsTypes'
export default function myAccountReducer(state = {myBalance:0}, action) {
    switch (action.type) {
        case MY_ACCOUNT_INIT:
            return Object.assign({}, state, {myAccountInit: action.data});
        case WIDTHDRAWALS_RECORD:
            return Object.assign({},state,{widthdrawalsRecord:action.data});
        case IMCOME_DETAIL:
            return Object.assign({},state,{incomeDetail:action.data});
        case CONSUMPTION_lIST:
            return Object.assign({},state,{consumptionList:action.data});
        case CURRENT_CARD:
            return Object.assign({},state,{currentCard:action.data});
        case CARD_LIST:
            return Object.assign({},state,{cardList:action.data});
        case BANK_LIST:
            return Object.assign({},state,{bankList:action.data});
        case MY_BALANCE:
            return Object.assign({},state,{myBalance:action.data});
        default:
            return state;
    }
}