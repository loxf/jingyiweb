import React, { Component } from 'react'
import { Popup } from 'antd-mobile'
import FooterAlert from './FooterAlert'

class FooterAlertDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     * 页面跳转
     */
    toUrl(url) {
        this.context.router.push(url);
    }

    /**
     * 显示
     * @param carNum 车牌号码
     * @param num 天数
     */
    show(carNum = '', num = '') {
        let props = {
            num: num,
            carNum: carNum,
            toUrl: url => {
                Popup.hide(); //隐藏
                if (url) {
                    this.toUrl(url) //点击按钮后跳转到对应的url
                }
            }
        }
        Popup.show(<FooterAlert {...props} />, { animationType: 'slide-up' }
        );
    }

    render() {

        return (
            <div>
                <div onClick={() => this.show('粤A99999')}>未知年检状态</div>
                <div onClick={() => this.show('粤A12345', '18')}>已知年检状态</div>
            </div>
        )
    }
}

FooterAlertDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default FooterAlertDemo