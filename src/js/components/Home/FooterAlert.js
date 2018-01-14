import React, { Component } from 'react';
import Style from './footerAlert.scss'
import ButtonWithCxytj from '../common/buttonWithCxytj';


class FooterAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }



    /**
     * 渲染对应的按钮
     */
    showBtn() {


        return (
            <div>
                <div className={Style.footerBtn}>
                    <ButtonWithCxytj countOption={{
                        eventId: this.props.num ?'insepection_usercomfirm_known':'insepection_calculator_unknown'
                    }} className={Style.btn} onClick={() => this.props.go()}>{this.props.buttonText}</ButtonWithCxytj>
                </div>
            </div>
        )
    }

    render() {

        return (
            <div className={Style.footerAlert}>
                <div className={Style.carInfo}>
                    <div className={Style.fl}>
                        <div className={Style.carNum}>{this.props.carNum}</div>
                        <p>{this.props.tipsMessage}</p>
                    </div>
                </div>
                {this.showBtn()}
            </div>
        )
    }
}

FooterAlert.defaultProps = {
    num: '', //天数
    carNum: '', //车牌
}

export default FooterAlert