import {MY_INIT,MY_CLASSMATE,INTERGRAL_DETAIL,MY_ACTIVITY,MY_ORDER,INTEGRAL_RANKING,WATCH_RECORD} from '../actions/actionsTypes'
export default function homeReducer(state = {productTypes:[],productList:[]}, action) {
    switch (action.type) {
        case MY_INIT:
            return Object.assign({}, state, {myInit: action.data});
        case MY_CLASSMATE:
            return Object.assign({}, state, {myClassMate: action.data});
        case INTERGRAL_DETAIL:
            return Object.assign({}, state, {intergralDetail: action.data});
        case MY_ACTIVITY:
            return Object.assign({}, state, {myActivities: action.data});
        case MY_ORDER:
            return Object.assign({}, state, {myOrder: action.data});
        case INTEGRAL_RANKING:
            return Object.assign({}, state, {integralRanking: action.data});
        case WATCH_RECORD:
            return Object.assign({}, state, {watchRecord: action.data});
        default:
            return state;
    }
}