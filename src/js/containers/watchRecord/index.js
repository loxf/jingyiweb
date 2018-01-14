import React, {Component} from 'react';
import {connect} from 'react-redux';
import TitleBar from '../../components/share/titleBar'
import style from './index.scss';
import ProductItem from '../../components/Home/productItem';
import {getWatchRecord} from '../../actions/myAction';
import SliderDownLoad from '../../components/share/sliderDownLoad'
import config from '../../config';


class WatchRecord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentHeight: document.body.height + 'px',
            currentContent: [],//渲染后的值
        };

        this.page = 1;//当前页面
        this.totalPage = 10000000;//页面数，默认取尽量大的数，等服务端数据返回后设置为真实值
        this.currentContent = [];
    }

    getData() {
        if (this.page <= this.totalPage) {
            this.props.dispatch(getWatchRecord({page: this.page, size: 10}, (data) => {
                this.page = data.currentPage + 1;
                this.totalPage = data.totalPage;
                this.currentContent = this.currentContent.concat(this.props.watchRecord);
                this.setState({
                    currentContent: this.structWatchList(this.currentContent)
                })
            }))
        }
    }


    //构建商品列表
    structWatchList(contentArray) {
        return contentArray.map((item) => {
            return <ProductItem imgUrl={config.imgPublicPath + item.pic} title={item.videoName} time={item.createdAt}
                                teacher={item.teachers}
                                count={item.count} key={item.watchId} onClick={() => {
                let random = config.isTest ? '' : parseInt(Math.random() * 100000 + 1).toString();//路径后追加随机数
                this.context.router.push(`lessonDetail?id=${item.offerId}`);
            }}/>
        })
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

        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }


    render() {
        return <div className={style.watchRecord}>
            <div ref="title">
                <TitleBar title="观看记录"/>
            </div>
            {this.state.contentHeight.length > 0 ?
                <SliderDownLoad height={this.state.contentHeight} continueCallBack={() => {
                    this.getData()
                }}>
                    {this.state.currentContent}
                </SliderDownLoad> : <div className={style.noData}>暂无数据</div>}
        </div>
    }
}


//使用context
WatchRecord.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return Object.assign({}, state.myInfo);
}

export default connect(mapStateToProps)(WatchRecord)
