import {MY_SCORE,MY_CERTIFY,EXAM_QUESTIONS,EXAM_RESULT} from '../actions/actionsTypes';

export default function examReducer(state = {}, action) {
    switch (action.type) {
        case MY_SCORE:
            return Object.assign({}, state, {myScore: action.data});
        case MY_CERTIFY:
            return Object.assign({}, state, {myCertify: action.data});
        case EXAM_QUESTIONS:
            return Object.assign({}, state, {examQuestions: action.data});
        case EXAM_RESULT:
            return Object.assign({}, state, {examResult: action.data});
        default:
            return state;
    }
}