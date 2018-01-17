import {INIT_DATA,ACTIVITY_LIST,LESSION_TYPES,PRODUCT_LIST,USER_INFO,AREA_DATA,SCROLL_POSITION} from '../actions/actionsTypes';

export default function homeReducer(state = {}, action) {
    console.log(action.type);
    switch (action.type) {
        case INIT_DATA:
            return Object.assign({}, state, {initData: action.data});
        case ACTIVITY_LIST:
            return Object.assign({}, state, {activityList: action.data});
        case LESSION_TYPES:
            return Object.assign({}, state, {lessionTypes: action.data});
        case PRODUCT_LIST:
            return Object.assign({}, state, {productList: action.data});
        case USER_INFO:
            return Object.assign({}, state, {userInfo: action.data});
        case AREA_DATA:
            return Object.assign({}, state, {areaData: action.data});
        case SCROLL_POSITION:
            return Object.assign({}, state, {scrollPosition: action.data});
        default:
            return state;
    }
}