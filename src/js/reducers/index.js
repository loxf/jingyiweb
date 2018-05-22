import {combineReducers} from 'redux';
import homeReducer from './homeReducer';
import myAccountReducer from './myAccountReducer'
import productReducer from './productReducer'
import myReducer from './myReducer';
import aboutReducer from './aboutReducer';
import newsReducer from './newsReducer';
import faceReducer from './faceReducer';
import newsAndFaceReducer from './newsAndFaceReducer';
import examReducer from './examReducer';

const rootReducer = combineReducers({
    homeInfo: homeReducer,
    myAccountInfo: myAccountReducer,
    productInfo: productReducer,
    myInfo: myReducer,
    htmlInfo:aboutReducer,
    newsInfo:newsReducer,
    faceInfo:faceReducer,
    newsAndFaceInfo:newsAndFaceReducer,
    examInfo:examReducer,
});

export default rootReducer;
