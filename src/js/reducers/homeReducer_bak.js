/**
 * Created by 小敏哥on 2017/3/16.
 */
import {
    CAR_LIST,
    CURRENT_CAR_INDEX,
    HOME_PUBLIC_DATA,
    POSITION
} from "../actions/actionsTypes_bak"

export default function homeReducer(state = {currentCarIndex:0}, action) {
    switch (action.type) {
        case CAR_LIST:
            return Object.assign({}, state, {carList: action.data});
        case CURRENT_CAR_INDEX:
            return Object.assign({}, state, {currentCarIndex: action.data});
        case HOME_PUBLIC_DATA:
            return Object.assign({}, state, {homePublicData: action.data});
        case POSITION:
            return Object.assign({}, state, {position: action.data});
        default:
            return state;
    }
}