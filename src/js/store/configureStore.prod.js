// 如果是产品（打包）模式，store 采用此配置

import { createStore, applyMiddleware } from 'redux'
/*import createSagaMiddleware, { END } from 'redux-saga'*/
import rootReducer from '../reducers'
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState) {
  /*const sagaMiddleware = createSagaMiddleware()*/
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware)
  );

  return store
}
