import React from 'react'
import {Route, IndexRoute} from 'react-router'

import {
    App,
    Home,
    NotFoundPage,

} from './containers'
export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>


        <Route path="Test" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/test').default)
            }, 'Test')
        }}/>

        <Route path="packageDetail" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/packageDetail').default)
            }, 'packageDetail')
        }}/>

        <Route path="activityDetail" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/activityDetail').default)
            }, 'activityDetail')
        }}/>

        <Route path="lessonDetail" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/lessonDetail').default)
            }, 'lessonDetail')
        }}/>

        <Route path="setPayPassword" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/setPayPassword').default)
            }, 'setPayPassword')
        }}/>

        <Route path="incomeDetail" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/incomeDetail').default)
            }, 'incomeDetail')
        }}/>

        <Route path="beTheAgent" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/beTheAgent').default)
            }, 'beTheAgent')
        }}/>

        <Route path="withdrawals" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/withdrawals').default)
            }, 'withdrawals')
        }}/>

        <Route path="consumptionList" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/consumptionList').default)
            }, 'consumptionList')
        }}/>

        <Route path="bindCard" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/bindCard').default)
            }, 'bindCard')
        }}/>

        <Route path="chooseMyCard" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/chooseMyCard').default)
            }, 'chooseMyCard')
        }}/>

        <Route path="withdrawalsByCard" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/withdrawalsByCard').default)
            }, 'withdrawalsByCard')
        }}/>

        <Route path="withdrawalsRecord" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/withdrawalsRecord').default)
            }, 'withdrawalsRecord')
        }}/>

        <Route path="myAccount" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/myAccount').default)
            }, 'myAccount')
        }}/>

        <Route path="bindPhoneOrEmail" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/bindPhoneOrEmail').default)
            }, 'bindPhoneOrEmail')
        }}/>

        <Route path="my" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/my').default)
            }, 'my')
        }}/>

        <Route path="userMessage" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/userMessage').default)
            }, 'userMessage')
        }}/>

        <Route path="watchRecord" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/watchRecord').default)
            }, 'watchRecord')
        }}/>

        <Route path="myIntegral" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/myIntegral').default)
            }, 'myIntegral')
        }}/>

        <Route path="integralRanking" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/integralRanking').default)
            }, 'integralRanking')
        }}/>

        <Route path="myActivities" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/myActivities').default)
            }, 'myActivities')
        }}/>

        <Route path="myOrder" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/myOrder').default)
            }, 'myOrder')
        }}/>

        <Route path="productType" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/productType').default)
            }, 'productType')
        }}/>

        <Route path="integralDetail" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/integralDetail').default)
            }, 'integralDetail')
        }}/>

        <Route path="myClassMate" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/myClassMate').default)
            }, 'myClassMate')
        }}/>

        <Route path="confirmOrder" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/confirmOrder').default)
            }, 'confirmOrder')
        }}/>

        <Route path="activityList" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/activityList').default)
            }, 'confirmOrder')
        }}/>

        <Route path="productList" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/productList').default)
            }, 'productList')
        }}/>

        <Route path="share" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/share').default)
            }, 'share')
        }}/>

        <Route path="about" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/about').default)
            }, 'about')
        }}/>

        <Route path="exam" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/exam').default)
            }, 'exam')
        }}/>

        <Route path="examResult" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/examResult').default)
            }, 'examResult')
        }}/>

        <Route path="myAchievement" getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/myAchievement').default)
            }, 'myAchievement')
        }}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);