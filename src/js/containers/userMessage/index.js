import React, {Component} from 'react';
import {connect} from 'react-redux';
import TitleBar from '../../components/share/titleBar'
import style from './index.scss';
import ItemList from '../../components/share/itemList';
import {getUserInfo} from '../../actions/homeAction'


class UserMessage extends Component {

    constructor(props) {
        super(props);
        this.sexDic = ['男', '女', '未知'];
    }

    //初始化
    componentDidMount() {
        this.props.dispatch(getUserInfo({}));
    }

    render() {
        return <div className={style.userMessage}>
            <TitleBar title="个人信息"/>
            <div className={style.mainItem}>
                {this.props.userInfo?<ItemList>
                    <div className={style.item}><div>昵称</div><div>{this.props.userInfo.nickName}</div></div>
                    <div className={style.item}><div>{this.props.userInfo.email?'邮箱':'手机号码'}</div><div>{this.props.userInfo.email?this.props.userInfo.email:this.props.userInfo.phone}</div></div>
                    <div className={style.item}><div>性别</div><div>{this.sexDic[this.props.userInfo.sex-1]}</div></div>
                    <div className={style.item}><div>真实姓名</div><div>{this.props.userInfo.realName}</div></div>
                    <div className={style.item}><div>地区</div><div>{this.props.userInfo.province+this.props.userInfo.city}</div></div>
                </ItemList>:''}
            </div>
        </div>
    }
}
function mapStateToProps(state) {
    return Object.assign({}, state.homeInfo);
}

export default connect(mapStateToProps)(UserMessage)
