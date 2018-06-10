import React, {Component} from 'react';
import style from './index.scss';
import TitleBar from '../../components/share/titleBar';
import SortList from '../../components/share/sortList';
import ActivityItem from '../../components/myActivities/activityItem'
import ItemList from '../../components/share/itemList';

class ActivityList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
    }

    componentDidMount(){
        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }

    //构建列表主体内容
    structListContent(additionalData) {
        this.setState({
            content: <ItemList>
                {this.props.activities.map((item, index) => {
                    return <ActivityItem data={item} key={index}></ActivityItem>
                })}
            </ItemList>
        });

    }

    render() {
        return <div className={style.activityList}>
            <TitleBar title="活动列表"/>
            <div className={style.listContent}>
            <SortList firstTab={[{dataname: 'productType', text: '套餐'}, {dataname: 'productType', text: '课程'}]}
                      thirdTab={[{dataname: 'payType', text: '免费'}, {dataname: 'payType', text: 'vip'},{dataname: 'payType', text: 'svip'}]}
                      secondTabDataName="order"
                      getData={(additionalData) => {
                          this.structListContent(additionalData)
                      }} content={this.state.content}
            />
            </div>
        </div>
    }
}

ActivityList.defaultProps = {
    activities: [{
        imgUrl: './images/home/test4.png',
        title: '旗袍美修训练',
        address: '上海',
        count: 1000,
        timeFrom: '2017-09-08 10:30:00',
        timeTo: '2017-09-09 10:30:00',
        status: 0
    }, {
        imgUrl: './images/home/test4.png',
        title: '旗袍美修训练',
        address: '上海',
        count: 1000,
        timeFrom: '2017-09-08 10:30:00',
        timeTo: '2017-09-09 10:30:00',
        status: 2
    }, {
        imgUrl: './images/home/test4.png',
        title: '旗袍美修训练',
        address: '上海',
        count: 1000,
        timeFrom: '2017-09-08 10:30:00',
        timeTo: '2017-09-09 10:30:00',
        status: 1
    }, {
        imgUrl: './images/home/test4.png',
        title: '旗袍美修训练',
        address: '上海',
        count: 1000,
        timeFrom: '2017-09-08 10:30:00',
        timeTo: '2017-09-09 10:30:00',
        status: 2
    }, {
        imgUrl: './images/home/test4.png',
        title: '旗袍美修训练',
        address: '上海',
        count: 1000,
        timeFrom: '2017-09-08 10:30:00',
        timeTo: '2017-09-09 10:30:00',
        status: 2
    }, {
        imgUrl: './images/home/test4.png',
        title: '旗袍美修训练',
        address: '上海',
        count: 1000,
        timeFrom: '2017-09-08 10:30:00',
        timeTo: '2017-09-09 10:30:00',
        status: 2
    }]
}

export default ActivityList