import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';
import TitleBar from '../../components/share/titleBar'
import TabDataList from '../../components/share/tabDataList'
import ListItems from '../../components/integralDetail/listItems'
import {getMyIntegralDetail} from '../../actions/myAction';


class IntergralDetail extends Component {
    constructor(props) {
        super(props);
        this.tabOnePage = 1;//第一个tab当前页面
        this.tabOneTotalPage = 10000000;//第一个tab总页面数，默认取尽量大的数，等服务端数据返回后设置为真实值
        this.tabOneCurrentContent = [];
        this.tabTwoPage = 1;//第二个tab当前页面
        this.tabTwoTotalPage = 10000000;//第三个tab总页面数，默认取尽量大的数，等服务端数据返回后设置为真实值
        this.tabTwoCurrentContent = [];
        this.tabThreePage = 1;//第二个tab当前页面
        this.tabThreeTotalPage = 10000000;//第三个tab总页面数，默认取尽量大的数，等服务端数据返回后设置为真实值
        this.tabThreeCurrentContent = [];
        this.state = {
            tabOneCurrentContent: [],//构建后的结构
            tabTwoCurrentContent: [],//构建后的结构
            tabThreeCurrentContent: [],//构建后的结构
        }
    }


    //获取第一页数据
    getFirstTabData() {
        if (this.tabOnePage <= this.tabOneTotalPage) {
            this.props.dispatch(getMyIntegralDetail({page: this.tabOnePage, size: 10}, (data) => {
                this.tabOnePage = data.currentPage + 1;
                this.tabOneTotalPage = data.totalPage;
                this.tabOneCurrentContent = this.tabOneCurrentContent.concat(this.props.intergralDetail);
                this.setState({
                    tabOneCurrentContent:<ListItems data={this.tabOneCurrentContent}/>
                })
            }))
        }
    }

    //获取第二页数据
    getSecondTabData() {
        if (this.tabTwoPage <= this.tabTwoTotalPage) {
            this.props.dispatch(getMyIntegralDetail({page: this.tabTwoPage, size: 10, type: 1}, (data) => {
                this.tabTwoPage = data.currentPage + 1;
                this.tabTwoTotalPage = data.totalPage;
                this.tabTwoCurrentContent = this.tabTwoCurrentContent.concat(this.props.intergralDetail);
                this.setState({
                    tabTwoCurrentContent:<ListItems data={this.tabTwoCurrentContent}/>
                })
            }))
        }
    }

    ////获取第三页数据
    getThirdTabData() {
        if (this.tabThreePage <= this.tabThreeTotalPage) {
            this.props.dispatch(getMyIntegralDetail({page: this.tabThreePage, size: 9, type: 3}, (data) => {
                this.tabThreePage = data.currentPage + 1;
                this.tabThreeTotalPage = data.totalPage;
                this.tabThreeCurrentContent = this.tabThreeCurrentContent.concat(this.props.intergralDetail);
                this.setState({
                    tabThreeCurrentContent:<ListItems data={this.tabThreeCurrentContent}/>
                })
            }))
        }
    }

    componentDidMount() {
        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }


    render() {
        return <div className={style.integralDetail}>
            <TitleBar title="积分明细"></TitleBar>
            <TabDataList structList={[{
                title: '全部', getData: () => {
                    this.getFirstTabData()
                }, content: this.state.tabOneCurrentContent
            },{
                title: '收入记录', getData: () => {
                    this.getSecondTabData()
                }, content: this.state.tabTwoCurrentContent
            },{
                title: '支出记录', getData: () => {
                    this.getThirdTabData()
                }, content: this.state.tabThreeCurrentContent
            }]}/>
        </div>
    }
}

function mapStateToProps(state) {
    return Object.assign({}, state.myInfo);
}

export default connect(mapStateToProps)(IntergralDetail)
