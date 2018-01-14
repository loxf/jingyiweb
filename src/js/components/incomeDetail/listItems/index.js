import React, {Component} from 'react';
import style from './index.scss';

class ListItems extends Component {
    constructor(props) {
        super(props);
    }

    structContent(){
        return this.props.data.map((item,index)=>{
            return <div className={style.item} key={index}>
                <div>{item.createdAt.split(' ')[0]}</div>
                <div>{item.detailName.length<=9?item.detailName:item.detailName.substr(0,9)+'...'}</div>
                <div>{item.changeBalance}</div>
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