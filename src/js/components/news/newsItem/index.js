import React, {Component} from 'react';
import style from './index.scss';

class NewsItem extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return <div className={style.container} onClick={this.props.onClick}>
            <div className={style.content}>
                {this.props.hasRead<=0&&<img className={style.noImg} src="./images/news/news-not-read.png" />}
                <div className={style.title}>{this.props.title}</div>
                <div className={style.subText}>{this.props.time}</div>
                <div className={style.subText}>点击量：{this.props.count}</div>
                {this.props.hasRead>0&&<div className={style.yes}>></div>}
                {this.props.hasRead<=0&&<div className={style.redSubText}>查看详情 >></div>}
            </div>
        </div>
    }
}


export default NewsItem;