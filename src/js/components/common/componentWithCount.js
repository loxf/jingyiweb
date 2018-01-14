/**
 * Created by 小敏哥 on 2017/4/14.
 * 附带点击统计功能的类，用于继承
 */
import React, {Component} from 'react';
class ComponentWithCount extends Component {
    constructor(props) {
        super(props);
        this.count=0;
    }

    addCount(){
        this.count++;
        alert(this.count);
    }

    render(){
        return '';
    }
}

export default  ComponentWithCount