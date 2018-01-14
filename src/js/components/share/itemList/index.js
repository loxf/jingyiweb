/*列表，带下划线*/

import React, {Component} from 'react';
import style from './index.scss';

class ItemList extends Component {
    constructor(props) {
        super(props);
    }

    structList() {
        return this.props.children.map((item, index) => {
            return <div key={index} className={style.listItem}>
                {item}
            </div>
        })
    }



    render() {
        return <div className={style.container}>
            {this.structList()}
        </div>
    }
}

export default ItemList;