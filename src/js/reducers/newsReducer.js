import {NEWS_LIST,NEWS_DETAIL} from '../actions/actionsTypes'
export default function homeReducer(state = {newsList:[]}, action) {
    switch (action.type) {
        case NEWS_LIST:
            return Object.assign({}, state, {newsList: action.data});
        case NEWS_DETAIL:
            return Object.assign({}, state, {newsDetail: action.data});
        default:
            return state;
    }
}