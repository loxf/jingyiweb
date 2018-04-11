import {combineReducers} from 'redux';
import homeReducer from './homeReducer';
import myAccountReducer from './myAccountReducer'
import productReducer from './productReducer'
import myReducer from './myReducer';
import aboutReducer from './aboutReducer';

const rootReducer = combineReducers({
    homeInfo: homeReducer,
    myAccountInfo: myAccountReducer,
    productInfo: productReducer,
    myInfo: myReducer,
    htmlInfo:aboutReducer
});

export default rootReducer;
