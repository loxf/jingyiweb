import React, {Component} from 'react';
import style from './index.scss';

class ListItems extends Component {
    constructor(props) {
        super(props);
    }

    getSpecialClass(index){
        switch (index){
            case 0:
                return style.first;
            case 1:
                return style.second;
            case 2:
                return style.third;
        }
    }

    structContent(){
        return this.props.data.map((item,index)=>{
            return <div className={style.item} key={index}>
                <div className={this.getSpecialClass(index)}>{index+1}</div>
                <div>{item.nick_name.length<=9?item.nick_name:(item.nick_name.substr(0,9)+'...')}</div>
                <div><span>{item.bp}</span><span className={style.tips}>积分</span></div>
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