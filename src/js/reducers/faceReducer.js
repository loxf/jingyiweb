import {FACE_LIST,FACE_DETAIL} from '../actions/actionsTypes'
export default function homeReducer(state = {faceList:[]}, action) {
    switch (action.type) {
        case FACE_LIST:
            return Object.assign({}, state, {faceList: action.data});
        case FACE_DETAIL:
            return Object.assign({}, state, {faceDetail: action.data});
        default:
            return state;
    }
}