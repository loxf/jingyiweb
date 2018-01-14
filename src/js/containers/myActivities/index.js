import React, {Component} from 'react';
import style from './index.scss';
import {connect} from 'react-redux';
import TitleBar from "../../components/share/titleBar/index";
import ActivityItem from '../../components/myActivities/activityItem'
import ItemList from '../../components/share/itemList';
import {getMyActivity} from '../../actions/myAction';
import SliderDownLoad from '../../components/share/sliderDownLoad'


class MyActivities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentHeight: document.body.height + 'px',
            currentContent: [],//渲染后的值
        }

        this.page = 1;//当前页面
        this.totalPage = 10000000;//页面数，默认取尽量大的数，等服务端数据返回后设置为真实值
        this.currentContent = [];
    }

    getData() {
        if (this.page <= this.totalPage) {
            this.props.dispatch(getMyActivity({page: this.page, size: 10, type: 1}, (data) => {
                this.page = data.currentPage + 1;
                this.totalPage = data.totalPage;
                this.currentContent = this.currentContent.concat(this.props.myActivities);
                this.setState({
                    currentContent: this.structActivityList(this.currentContent)
                })
            }))
        }
    }

    componentDidMount() {
        this.getData();
        //设置高度
        setTimeout(() => {
            let top = this.refs.title.getBoundingClientRect().top + this.refs.title.offsetHeight;
            let all = document.body.offsetHeight;
            this.setState({
                contentHeight: (all - top) + 'px'
            })
        }, 500);
    }


    //构建列表
    structActivityList(contentArray) {
        return contentArray.length>0?<ItemList>
            {
                contentArray.map((item) => {
                    return <ActivityItem data={item} key={item.activeId} onClick={()=>{this.context.router.push(`activityDetail?id=${item.activeId}`)}}></ActivityItem>
                })
            }
        </ItemList>:[]
    }

    render() {
        return <div className={style.myActivities}>
            <div ref="title">
                <TitleBar title="我的活动"/>
            </div>
            <div className={style.content}>
                {this.state.currentContent.length>0?<SliderDownLoad height={this.state.contentHeight} continueCallBack={()=>{this.getData()}}>
                    {this.state.currentContent}
                </SliderDownLoad>:<div className={style.noData}>暂无数据</div>}
            </div>
        </div>
    }
}


//使用context
MyActivities.contextTypes = {
    router: React.PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return Object.assign({}, state.myInfo);
}

export default connect(mapStateToProps)(MyActivities)


