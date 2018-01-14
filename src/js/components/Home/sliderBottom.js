/**
 * Created by 小敏哥 on 2017/7/31.
 * 此组件用于自定义滑动组件下方的小圆点
 */
import React, { Component } from 'react';
import style from './sliderBottom.scss';
class SliderBottom extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        all:React.PropTypes.number.isRequired,//总数
        current:React.PropTypes.number.isRequired,//当前选中
        currentColor:React.PropTypes.string,//选中的颜色
    };

    renderBottom(){
        let bottoms=[];
        let style=this.props.currentColor?{
            backgroundColor:this.props.currentColor
        }:{};
        if(this.props.all>1) {
            for (let i = 0; i < this.props.all; i++) {
                if (i == this.props.current) {
                    bottoms.push(<div key={"sliderItem"+i} className={style.current} style={style}></div>)
                }
                else {
                    bottoms.push(<div  key={"sliderItem"+i}></div>)
                }
            }
        }
        return bottoms;
    }

    render(){
        return <div className={style.sliderBottoms}>
            {this.renderBottom()}
        </div>
    }
}

export default SliderBottom