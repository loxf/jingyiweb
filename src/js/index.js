import login from './utils/loginOperation';
//import 'babel-polyfill'
import React from 'react'
import ReactDOM,{render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {browserHistory} from 'react-router'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import Redbox from 'redbox-react'
import Loading from './components/Loading';
const rootEl = document.getElementById('app');
const store = configureStore(window.__INITIAL_STATE__)
// 添加空白的loading动效
render(
    <Loading></Loading>,
    rootEl
);
//执行登录操作,无登录情况下则不继续往下走，直接等待登录操作完成后页面跳转，避免页面错误渲染
login.loginOperation(() => {
    //store.runSaga(rootSage);
        render(
            <AppContainer errorReporter={Redbox}>
                <Root store={store} history={browserHistory}/>
            </AppContainer>,
            rootEl
        )


    if (module.hot) {
        /**
         * Warning from React Router, caused by react-hot-loader.
         * The warning can be safely ignored, so filter it from the console.
         * Otherwise you'll see it every time something changes.
         * See https://github.com/gaearon/react-hot-loader/issues/298
         */
        const orgError = console.error; // eslint-disable-line no-console
        console.error = (message) => { // eslint-disable-line no-console
            if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
                // Log the error as normally
                orgError.apply(console, [message]);
            }
        };

        module.hot.accept('./containers/Root', () => {
            // If you use Webpack 2 in ES modules mode, you can
            // use <App /> here rather than require() a <NextApp />.
            const NextApp = require('./containers/Root').default;
            render(
                <AppContainer errorReporter={Redbox}>
                    <NextApp store={store} history={hashHistory}/>
                </AppContainer>,
                rootEl
            )
        });
    }
});
