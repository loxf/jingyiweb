import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';
import TitleBar from "../../components/share/titleBar/index";
import {userSign} from '../../actions/homeAction'
import {Toast} from 'antd-mobile';


class MyIntegral extends Component {
    constructor(props) {
        super(props);
        if(!this.props.myInit){
            this.goHome();
        }

        this.state={
            isSign:sessionStorage.getItem('isSign')=='true'?true:false,//状态控制，用于防止用户多次点击签到
        }
    }

    //签到
    userSign(){
        if(!this.props.isSign) {
            this.props.dispatch(userSign({signType: 0}));
            sessionStorage.setItem('isSign','true');//状态控制，用于防止用户多次点击签到
            this.setState({
                isSign:true,
            })
        }
        else{
            Toast.info("每天只能签到一次", 2);
        }
    }



    //回到首页
    goHome(){
        history.pushState({},'','');
        let backLength=-1*(history.length-1);
        history.go(backLength);
    }

    componentDidMount() {
        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }

    render(){
        return <div>
            <TitleBar title="我的积分" rightText={{text:'积分明细',onClick:()=>{this.context.router.push('integralDetail')}}}/>
            {this.props.myInit? <div className={style.myIntegral}>
                <div className={style.headerContent}>
                    <div className={style.message}>
                        <div>我的积分</div>
                        <div>{this.props.myInit.bp}</div>
                        <img src="./images/my/paihangbang.png"/>
                        <div onClick={()=>{this.context.router.push('integralRanking')}}>排行榜</div>
                    </div>
                </div>
                <div className={style.main}>
                    <div className={style.mainContent}>
                        <div className={style.mainItem}>
                            <img className={style.mainIcon} src="./images/my/qiandao-2.png"/>
                            <div className={style.itemContent}>
                                <div >签到</div>
                                <p>每天签到挣积分，连续签到30天，奖40积分</p>
                            </div>
                            <div className={style.goText} onClick={()=>{this.userSign()}}>{!this.props.isSign&&!this.state.isSign?'签到':'已签到'}</div>
                            <img className={style.goIcon} src="./images/my/jiantou-chengse.png"/>
                        </div>

                        <div className={style.mainItem}>
                            <img className={style.mainIcon} src="./images/my/quguankan.png"/>
                            <div className={style.itemContent}>
                                <div>去观看</div>
                                <p>连续观看视频每满一分钟，可获0.5积分，观看时间越长，所得积分越多。不满一分钟，不计积分。</p>
                            </div>
                            <div className={style.goText}  onClick={()=>{this.context.router.push('productList')}}>去观看</div>
                            <img className={style.goIcon} src="./images/my/jiantou-chengse.png"/>
                        </div>

                        <div className={style.mainItem}>
                            <img className={style.mainIcon} src="./images/my/qufenxiang.png"/>
                            <div className={style.itemContent}>
                                <div>分享</div>
                                <p>分享视频可获得10积分，第一次分享有积分，再分享则无</p>
                            </div>
                            <div className={style.goText}  onClick={()=>{this.context.router.push('productList')}}>去分享</div>
                            <img className={style.goIcon} src="./images/my/jiantou-chengse.png"/>
                        </div>
                    </div>
                </div>
            </div>:''}
        </div>
    }
}

//使用context
MyIntegral.contextTypes = {
    router: React.PropTypes.object.isRequired
};

MyIntegral.defaultProps={

};


function mapStateToProps(state) {
    return Object.assign({}, state.myInfo,state.homeInfo.initData);
}

export default connect(mapStateToProps)(MyIntegral);
