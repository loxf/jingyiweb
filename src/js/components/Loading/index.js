/**
 * karin 2017/5/4
 * 空白页面的loading动效
 */
import React, { Component } from 'react'
import Style from './index.scss'

export default class Loading extends Component {
    constructor(props) {
        super(props);
    }

/**
 * 组件
 */
    render() {
        return (
            <div className={Style.load}>
                {/* <img src='./images/loading/icon-loading.png' />*/}
                 <p><span>正在加载 ...</span></p>
                 <div className={Style.loadMark}></div>
            </div>
        );
    }
}
