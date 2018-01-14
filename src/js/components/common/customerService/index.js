/**
 * Created by 小敏哥 on 2017/8/10.
 * 此处提供一个封装的客服组件
 * 此组件应放到文档流的最底部
 */
import React, {Component} from 'react';
import style from './index.scss';
import {Popup} from 'antd-mobile';
import ReModal from '../reModal';
import SendCxytjMessage from '../../../utils/sendCxytjMessage';
class CustomerService extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        leftText: React.PropTypes.string,//左侧文字
        rightText: React.PropTypes.string,//右侧文字
        bottomText: React.PropTypes.string,//底部文字
        fixed:React.PropTypes.bool,//是否底端浮动，默认true
        className: React.PropTypes.string,//样式覆盖
    };

    //电话联系客服
    callThephone() {
        //兼容qq浏览器ios版本不支持tel协议
        if (navigator.userAgent.indexOf('iPhone') > -1 && localStorage.getItem('detailUserType').indexOf('QQ') > -1) {
            ReModal.alert('客服热线：020-62936789');
        }
        else {
            window.location.href = "tel:020-62936789";
        }
        SendCxytjMessage.sendMessage({
            eventId: 'H5_E_Interspection_ChooseArtificialcustomerservice',
        });
    }

    //在线客服
    getServiceOnline() {
        SendCxytjMessage.sendMessage({
            eventId: 'H5_E_Interspection_ChooseOnlinecustomerservice',
        });
        location.href = 'http://cx580.udesk.cn/im_client/?web_plugin_id=35992';
    }

    showItemList(e) {
        let items = <div className={style.listContainer}>
            <div onClick={this.callThephone}>电话客服</div>
            <div onClick={this.getServiceOnline}>在线客服</div>
            <div onClick={() => {
                Popup.hide()
            }}>取消
            </div>
        </div>;
        Popup.show(items, {animationType: 'slide-up'});
        SendCxytjMessage.sendMessage({
            eventId: 'H5_E_Interspection_ClickCustomerservice',
        });
    }


    getMainClass() {
        let fixedStyle=this.props.fixed===false?'':style.fixContainer+' ';
        return fixedStyle+(this.props.className ? style.content + ' ' + this.props.className : style.content);
    }


    render() {
        return <div className={style.container}>
            {this.props.fixed!==false?<div className={style.blank}></div>:''}
            <div className={this.getMainClass()} onClick={() => {
                this.showItemList()
            }}>
                <span className={style.leftText}>{this.props.leftText ? this.props.leftText : ''}</span>
                <div className={style.body}>
                    <img src="./images/icon_kefu.png"/>
                    {this.props.bottomText?<div className={style.bottomText}>{this.props.bottomText}</div>:''}
                </div>
                <span className={style.rightText}>{this.props.rightText ? this.props.rightText : ''}</span>
            </div>
        </div>
    }
}

export default CustomerService;