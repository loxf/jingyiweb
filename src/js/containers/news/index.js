import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';
import TitleBar from '../../components/share/titleBar';
import NewsItem from '../../components/news/newsItem';
import config from '../../config';
import {getnewsList} from '../../actions/newsAction';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    //跳转到对应的课程和活动详情
    toDetail(id) {
        this.context.router.push(`newsDetail?id=${id}&type=1`);
    }

    componentWillUnmount() {
        wx.showOptionMenu();
    }

    componentDidMount() {
        //获取分类
        this.props.dispatch(getnewsList({size: 1000,type: 1}));
        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }
    //构建新闻列表
    structNewstList() {
        return this.props.newsList.map((item, index) => {
            return <NewsItem key={item.contextId} hasRead={item.hasRead} time={item.createdAt} title={item.title} count={item.readTimes} onClick={() => {
                this.toDetail(item.titleId)
            }}/>
        })
    }
    render() {
        return <div className={style.activityList}>
            <TitleBar title="学馆新闻" right={{
                img: './images/share/home.png',
                onClick: () => {
                    this.context.router.push('/');
                }
            }}/>
            <div className={style.list}>
                {this.structNewstList()}
            </div>
        </div>
    }
}

//使用context
News.contextTypes = {
    router: React.PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return Object.assign({}, state.newsInfo);
}


export default connect(mapStateToProps)(News)