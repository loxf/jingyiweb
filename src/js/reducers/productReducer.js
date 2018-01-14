import {ALL_PRODUCT_LIST,ALL_PRODUCT_TYPE,PRODUCT_DETAIL,PRODUCT_HTML,ACTIVITY_DETAIL,PACKAGE_DETAIL,ORDER_DETAIL} from '../actions/actionsTypes'
export default function homeReducer(state = {productTypes:[],productList:[]}, action) {
    switch (action.type) {
        case ALL_PRODUCT_LIST:
            return Object.assign({}, state, {productList: action.data});
        case ALL_PRODUCT_TYPE:
            return Object.assign({}, state, {productTypes: action.data});
        case PRODUCT_DETAIL:
            return Object.assign({}, state, {productDetail: action.data});
        case PRODUCT_HTML:
            return Object.assign({}, state, {productHtml: action.data});
        case ACTIVITY_DETAIL:
            return Object.assign({}, state, {activityDetail: action.data});
        case PACKAGE_DETAIL:
            return Object.assign({}, state, {packageDetail: action.data});
        case ORDER_DETAIL:
            return Object.assign({}, state, {confirmOrderDetail: action.data});
        default:
            return state;
    }
}