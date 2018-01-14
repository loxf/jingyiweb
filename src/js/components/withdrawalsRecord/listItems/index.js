import React, {Component} from 'react';
import style from './index.scss';

class ListItems extends Component {
    constructor(props) {
        super(props);
        this.statusDic = ['申请中','已提现','拒绝打款'];
    }


    structContent(){
        return this.props.data?this.props.data.map((item,index)=>{
            return <div className={style.item} key={index}>
                <div>{item.createdAt.split(' ')[0]}</div>
                <div>{item.balance}</div>
                <div className={item.status==1?style.warning:''}>{this.statusDic[item.status-1]}</div>
            </div>
        }):'';
    }

    render(){
        return <div className={style.container}>
            {this.structContent()}
        </div>
    }
}

export default ListItems;