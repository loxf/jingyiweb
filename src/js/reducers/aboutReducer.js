import {COMMON_HTML} from '../actions/actionsTypes';

export default function homeReducer(state = {}, action) {
    switch (action.type) {
        case COMMON_HTML:
            return Object.assign({}, state, {htmlData: action.data});
        default:
            return state;
    }
}