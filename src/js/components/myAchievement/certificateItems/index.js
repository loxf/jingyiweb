import React, {Component} from 'react';
import style from './index.scss';
import config from '../../../config';
import {Toast} from 'antd-mobile'

class ListItems extends Component {
    constructor(props) {
        super(props);
    }

    structContent() {
        return this.props.data.map((item, index) => {
            return <div className={style.item} key={index}>
                <div className={style.image}>
                    <img src={config.imgPublicPath+item.pic}/>
                </div>
                <div className={style.certifyName}>{item.certifyName}</div>
                <button className={style.downLoad} onClick={()=>{
                    Toast.info('长按图片即可下载图片',2)
                }}>下载</button>
            </div>
        });
    }

    render() {
        return <div className={style.container}>
            {this.structContent()}
        </div>
    }
}

export default ListItems;