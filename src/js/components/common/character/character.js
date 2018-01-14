/**
 *  karin 2017/8/29
 */
import React, { Component } from 'react'
import style from './character.scss'
// 组件
import { Button } from 'antd-mobile'

class Character extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    /*
     <div style={{ margin: '-.5rem 0 0', width: '5rem' }}><p>办理车险</p><p className='pt20 font-26 darkgray' style={{ lineHeight: '.4rem' }}>若你的交强险保单已过期，<br/>可前往办理车险后继续办理年检</p><Button size='large' onClick={() => window.history.back()} style={{width:'45%',margin:'0.2rem 0 0'}}>取消</Button><Button size='large' onClick={() => this.submitConfirmationPostalOwn(2, true)} style={{width:'45%',margin:'0.2rem 0 0'}}>前往办理</Button></div>
     */
    handClick(i, item) {
        this.props.onClick(i, item) //传递给父组件
    }
    /**
     * tlt:标题和无标题，仅文字
     * words：文字提示，可以为空
     * btns：可以为空，或者1、2个按钮
     * onClick: 点击事件，可以为空
     */
    render() {
        let tlt = this.props.tlt || ''
        let words = this.props.words || ''
        let btns = this.props.btns || []
        return (
            <div className={style.list}>
                <p className='text-center font-32'>{tlt}</p>
                <div className='pt20 font-26 darkgray' style={{ lineHeight: '.4rem' }} dangerouslySetInnerHTML={{ __html: words }}></div>
                {btns && <div className={btns.length == 2 ? style.btnTwo:style.btnOne}>
                    {btns.map((item, index) => {
                        return <div className={style.btn} onClick={() => this.handClick(index, item)} key={index}>{item}</div>
                    })}
                </div>}
            </div>
    )
    }

}

export default Character;