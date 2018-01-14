import React, {Component} from 'react';
import style from './index.scss';

class ListItems extends Component {
    constructor(props) {
        super(props);
    }

    //状态值转换成中文
    getStatusName(status){
        switch (status){
            case 1:
                return '待支付';
            case 3:
                return '已支付';
            case -3:
                return '支付失败';
            case 9:
                return '已关闭';
            default:
                return '';
        }
    }

    //获取状态样式
    getStyle(status){
        switch (status){
            case 3:
                return style.blue;
            case 9:
                return style.normal;
            default:
                return style.warning;
        }
    }


    structContent(){
        return this.props.data.map((item,index)=>{
            return <div className={style.item} key={index}>
                <div>{item.createdAt.split(' ')[0]}</div>
                <div>{item.orderName}</div>
                <div>{'￥'+item.orderMoney}</div>
                <div className={this.getStyle(item.status)}>{this.getStatusName(item.status)}</div>
            </div>
        });
    }

    render(){
        return <div className={style.container}>
            {this.structContent()}
        </div>
    }
}

export default ListItems;