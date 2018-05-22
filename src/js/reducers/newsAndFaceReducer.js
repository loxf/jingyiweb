import {NEWS_HTML,NEWS_CONTENT} from '../actions/actionsTypes'
export default function homeReducer(state = {}, action) {
    switch (action.type) {
        case NEWS_HTML:
            return Object.assign({}, state, {newsHtml: action.data});
        case NEWS_CONTENT:
            return Object.assign({}, state, {newsContent: action.data});
        default:
            return state;
    }
}