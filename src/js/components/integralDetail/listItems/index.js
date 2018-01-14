import React, {Component} from 'react';
import style from './index.scss';

class ListItems extends Component {
    constructor(props) {
        super(props);
    }

    structContent(){
        return this.props.data.map((item,index)=>{
            return <div className={style.item} key={index}>
                <div>
                    <div>{item.detailName}</div>
                    <div>{item.createdAt}</div>
                </div>
                <div>{item.type==1?('+'+item.changeBalance):('-'+item.changeBalance)}</div>
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