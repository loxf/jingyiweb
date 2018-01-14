/**
 * Created by 小敏哥on 2017/3/9.
 */
import React, { Component } from 'react';
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { List,Radio } from 'antd-mobile';
import 'style/reactAnimation/bottomToUp.scss';
import style from './RadioGroup.scss';


class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            show:false
        };
        //此处封装静态方法，供父控件调用
        RadioGroup.showComponent=this.showComponent.bind(this);
    }


    //静态方法，方便父控件调用
    showComponent(showStatus){
        this.setState({
            show:showStatus
        })
    }

    //设置选中项并通知父控件
    setSelectItemAndCallBack(index){
        this.setState({
            selected:index
        });
        RadioGroup.showComponent(false);
        this.props.onChange(index)
    }


    render(){
        const RadioItem = Radio.RadioItem;
        return  <ReactCSSTransitionGroup className={style.radioPicker} transitionName="up-and-down" component="div" transitionAppear={true}  transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {this.state.show?<div  key="car-number-picker">
                <List>
                    {this.props.data.map(i => (
                        <RadioItem key={i.value} checked={this.state.selected === i.value}
                                   onChange={() => this.setSelectItemAndCallBack(i.value)}>
                            {i.label}
                        </RadioItem>
                    ))}
                </List>
                <button onClick={()=>{RadioGroup.showComponent(false)}}>取消</button>
            </div>:''}

        </ReactCSSTransitionGroup>
    }
}

export default RadioGroup