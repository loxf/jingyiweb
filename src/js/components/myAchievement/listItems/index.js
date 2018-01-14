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
                    <div>{item.nickName}</div>
                    <div>{item.phone?item.phone:item.email}</div>
                </div>
                <div>{item.createdAt}</div>
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