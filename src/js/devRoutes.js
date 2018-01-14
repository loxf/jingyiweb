/**
 * Created by 小敏哥 on 2017/4/19.
 */
import React from 'react'
import {Route, IndexRoute} from 'react-router'

import {
    App,
    Home,
    NotFoundPage,
    Test,
    PackageDetail,
    ActivityDetail,
    LessonDetail,
    BeTheAgent,
    SetPayPassword,
    IncomeDetail,
    Withdrawals,
    ConsumptionList,
    BindCard,
    ChooseMyCard,
    WithdrawalsByCard,
    WithdrawalsRecord,
    MyAccount,
    BindPhoneOrEmail,
    My,
    UserMessage,
    WatchRecord,
    MyIntegral,
    IntegralRanking,
    MyActivities,
    MyOrder,
    ProductType,
    IntegralDetail,
    MyClassMate,
    ConfirmOrder,
    ActivityList,
    ProductList,
    Share,
    About,
    Exam,
    ExamResult,
    MyAchievement
} from './containers/devIndex'

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="Test" component={Test}/>
        <Route path="packageDetail" component={PackageDetail}/>
        <Route path="activityDetail" component={ActivityDetail}/>
        <Route path="lessonDetail" component={LessonDetail}/>
        <Route path="beTheAgent" component={BeTheAgent}/>
        <Route path="setPayPassword" component={SetPayPassword}/>
        <Route path="incomeDetail" component={IncomeDetail}/>
        <Route path="withdrawals" component={Withdrawals}/>
        <Route path="withdrawalsByCard" component={WithdrawalsByCard}/>
        <Route path="consumptionList" component={ConsumptionList}/>
        <Route path="bindCard" component={BindCard}/>
        <Route path="chooseMyCard" component={ChooseMyCard}/>
        <Route path="withdrawalsRecord" component={WithdrawalsRecord}/>
        <Route path="myAccount" component={MyAccount}/>
        <Route path="bindPhoneOrEmail" component={BindPhoneOrEmail}/>
        <Route path="my" component={My}/>
        <Route path="userMessage" component={UserMessage}/>
        <Route path="watchRecord" component={WatchRecord}/>
        <Route path="myIntegral" component={MyIntegral}/>
        <Route path="integralRanking" component={IntegralRanking}/>
        <Route path="myActivities" component={MyActivities}/>
        <Route path="myOrder" component={MyOrder}/>
        <Route path="productType" component={ProductType}/>
        <Route path="integralDetail" component={IntegralDetail}/>
        <Route path="myClassMate" component={MyClassMate}/>
        <Route path="confirmOrder" component={ConfirmOrder}/>
        <Route path="activityList" component={ActivityList}/>
        <Route path="productList" component={ProductList}/>
        <Route path="share" component={Share}/>
        <Route path="about" component={About}/>
        <Route path="exam" component={Exam}/>
        <Route path="examResult" component={ExamResult}/>
        <Route path="myAchievement" component={MyAchievement}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);