/**
 * Created by 小敏哥 on 2017/8/17.
 * 封装ant的picker组件，用于展示地区，在参数中传入区域数据和列数、回调函数，在子组件中可传入自定义样式
 */
import React, {Component} from 'react';
import {Picker} from 'antd-mobile';
import {createForm} from 'rc-form';

class AddressPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regionData: [], //后台获取地区信息
        }
    }
    static propTypes = {
        regionData: React.PropTypes.array,//区域数据
        colCount: React.PropTypes.number,//地区列数
        onChange: React.PropTypes.func,//选择后回调函数
        initialValue:React.PropTypes.array,//初始值
    };

    componentDidMount() {
    }

    render() {
        const {getFieldProps} = this.props.form;
        let self=this;
        return <Picker
            data={this.props.regionData}
            title="选择地区"
            extra="请选择"
            cols={this.props.colCount}
            {...getFieldProps('district', {
                initialValue:self.props.initialValue,
                onChange(e) {
                    self.props.onChange(e);
                },
            }) }
        >
            {this.props.children}
        </Picker>
    }
}

export default createForm()(AddressPicker);