import React from 'react';
import { Provider } from 'react-redux';
let routes;
if(process.env.NODE_ENV === 'development'){
    routes=require('../devRoutes').default;
}
else{
    routes=require('../routes').default;
}
//不知道为啥，反正这里就是要改成用require引入样式，只是单纯改route引入方式会有样式错误，原因未知
require( '../../styles/app.scss');
/*import routes from '../routes';*/
import { Router } from 'react-router';
/*import '../../styles/app.scss' // 加载全局样式*/
const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
)
export default Root