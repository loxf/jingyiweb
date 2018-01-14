/**
 * Created by 小敏哥 on 2017/9/26.
 * 首页滚动信息条
 */

import React, {Component} from 'react';
import style from './index.scss';

class TipsBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            turnLeft: '0',
        };
        this.interval=null;
    }

    //滚动文字
    sliderText() {
        if (this.state.turnLeft == '0') {
            this.setState({
                turnLeft: (this.refs.content.offsetWidth - this.refs.realContent.offsetWidth) + "px"
            })
        }
        else {
            this.setState({
                turnLeft: '0'
            })
        }
    }

    //初始化动画
    initSlider() {
        //延迟一秒，待渲染完成后再取宽度，防止渲染未完成宽度出错
        setTimeout(() => {
            if (this.refs.content.offsetWidth < this.refs.realContent.offsetWidth) {
                this.sliderText();
                this.interval=setInterval(() => {
                    this.sliderText();
                }, 6000);
            }
        }, 1000);
    }

    componentWillUnmount(){
        window.clearInterval(this.interval);
    }

    componentWillReceiveProps(nextProps) {
        nextProps && nextProps.text != this.props.text && this.initSlider();
    }

    render() {
        return this.props.text ? <div className={style.container}>
            <div className={style.waringImg}></div>
            <div className={style.content} ref="content">
                <div ref="realContent" style={{left: this.state.turnLeft}}>
                    <a>{this.props.text}</a>
                </div>
            </div>
        </div> : <div></div>
    }
}

export default TipsBar;