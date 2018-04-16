import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';
import TitleBar from '../../components/share/titleBar';
import NewsItem from '../../components/news/newsItem';
import config from '../../config';
import {getfaceList} from '../../actions/faceLessonAction';

class FaceLesson extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    //跳转到对应的课程和活动详情
    toDetail(id) {
        this.context.router.push(`newsDetail?id=${id}&type=2`);
    }

    componentWillUnmount() {
        wx.showOptionMenu();
    }

    componentDidMount() {
        //获取分类
        this.props.dispatch(getfaceList({size: 1000,type: 2}));
        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }
    //构建新闻列表
    structFaceList() {
        return this.props.faceList.map((item, index) => {
            return <NewsItem key={item.contextId} hasRead={item.hasRead} time={item.createdAt} title={item.title} count={item.readTimes} onClick={() => {
                this.toDetail(item.titleId)
            }}/>
        })
    }
    render() {
        return <div className={style.activityList}>
            <TitleBar title="面授课程" right={{
                img: './images/share/home.png',
                onClick: () => {
                    this.context.router.push('/');
                }
            }}/>
            <div className={style.list}>
                {this.structFaceList()}
            </div>
        </div>
    }
}

//使用context
FaceLesson.contextTypes = {
    router: React.PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return Object.assign({}, state.faceInfo);
}


export default connect(mapStateToProps)(FaceLesson)