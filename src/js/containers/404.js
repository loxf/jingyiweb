import React, { Component } from 'react'
import { Link } from 'react-router'
import {Button} from 'antd-mobile'
import style from './404.scss';

export default class Tour extends Component {
  render() {
    return (
      <div className={style.content}>
        <img className={style.img} src="./images/404/404.svg"/>
        <div className={style.big}>404</div>
        <div className={style.text}>抱歉，您访问的页面不存在！</div>
        <Button className={style.btn} inline type="primary"><Link to="/">返回首页</Link></Button>
      </div>
    )
  }
}