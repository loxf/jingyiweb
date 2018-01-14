/**
 * Created by 小敏哥 on 2017/8/7.
 */
/**
 * Created by 小敏哥 on 2017/8/7.
 * 此处提供一个右侧带箭头符号的列表项
 */
import React, {Component} from 'react';
import style from './index.scss';
class ItemWithRightArrow extends Component {
    constructor(props) {
        super(props);
    }

    getMainClass() {
        return this.props.className ? style.itemContainer + ' ' + this.props.className : style.itemContainer;
    }

    render() {
        return <div className={this.getMainClass()} onClick={this.props.onClick}>
            <div className={style.content}>
                {
                    this.props.children
                }</div>
            <div className={style.arrow}></div>
        </div>
    }
}

export default ItemWithRightArrow


