import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';
import TitleBar from "../../components/share/titleBar/index";
import ItemList from '../../components/share/itemList';
import ItemGoToSomeWhere from '../../components/share/itemGoToSomeWhere';
import {getMyinit} from '../../actions/myAction';
import BottomMenu from '../../components/share/bottomMenu';


class My extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount(){
        wx.ready(() => {
            wx.hideOptionMenu();
        });
        this.props.dispatch(getMyinit({}))
    }

    //跳转
    toUrl(url){
        this.context.router.push(url);
    }

    render() {
        return <div className={style.my}>
            <TitleBar title="个人中心"/>
            {this.props.myInit? <div className={style.headerContent}>
                <div className={style.userImg}>
                    <img src={this.props.myInit.pic} onClick={()=>{this.toUrl('userMessage')}}/>
                </div>
                <div className={style.name}><span>{this.props.myInit.nickName}</span><img src='' /></div>
                <div className={style.phone}>{this.props.myInit.isChinese?this.props.myInit.phone:this.props.myInit.email}</div>
            </div>:''}
            <div className={style.commonItem}>
                <ItemList>
                    <ItemGoToSomeWhere>
                        <div className={style.itemContent} onClick={()=>{this.toUrl('watchRecord')}}>
                            <img src="./images/my/guankanjilv.png"/>
                            <div>观看记录</div>
                        </div>
                    </ItemGoToSomeWhere>
                    <ItemGoToSomeWhere>
                        <div className={style.itemContent} onClick={()=>{this.toUrl('myClassMate')}}>
                            <img src="./images/my/wodetongxue.png"/>
                            <div>我的同学</div>
                        </div>
                    </ItemGoToSomeWhere>
                    <ItemGoToSomeWhere>
                        <div className={style.itemContent}  onClick={()=>{this.toUrl('myOrder')}}>
                            <img src="./images/my/wodedingdan.png"/>
                            <div>我的订单</div>
                        </div>
                    </ItemGoToSomeWhere>
                </ItemList>
            </div>
            {this.props.myInit&&(!(this.props.myInit.phone||this.props.myInit.email))?<div className={style.commonItem+' '+style.singleItem}>
                <ItemGoToSomeWhere>
                    <div className={style.itemContent}   onClick={()=>{this.toUrl('bindPhoneOrEmail')}}>
                        <img src="./images/my/bangdingshouji.png"/>
                        <div>绑定手机/邮箱</div>
                    </div>
                </ItemGoToSomeWhere>
            </div>:''}

            <div className={style.commonItem}>
                <ItemList>
                    <ItemGoToSomeWhere>
                        <div className={style.itemContent} onClick={()=>{this.toUrl('myIntegral')}}>
                            <img src="./images/my/wodejifen.png"/>
                            <div>我的积分</div>
                        </div>
                    </ItemGoToSomeWhere>
                    <ItemGoToSomeWhere>
                        <div className={style.itemContent}  onClick={()=>{this.toUrl('myActivities')}}>
                            <img src="./images/my/wodehuodong.png"/>
                            <div>我的活动</div>
                        </div>
                    </ItemGoToSomeWhere>
                    <ItemGoToSomeWhere>
                        <div className={style.itemContent}  onClick={()=>{this.toUrl('myAchievement')}}>
                            <img src="./images/my/chengjiu.png"/>
                            <div>我的成就</div>
                        </div>
                    </ItemGoToSomeWhere>
                </ItemList>
            </div>
            <BottomMenu active={2}/>
        </div>
    }
}

My.defaultProps = {
    userImg: "./images/my/test.png",
    userName:"小敏哥",
    userPhone:"15369635521"
};

//使用context
My.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return Object.assign({}, state.myInfo);
}

export default connect(mapStateToProps)(My);