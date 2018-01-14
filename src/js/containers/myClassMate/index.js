import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';
import TitleBar from '../../components/share/titleBar';
import {getMyClassmate} from '../../actions/myAction';
import TabDataList from '../../components/share/tabDataList';
import ListItems from '../../components/myClassMate/listItems';


class MyClassMate extends Component {
    constructor(props) {
        super(props);
        this.tabOnePage = 1;//第一个tab当前页面
        this.tabOneTotalPage = 10000000;//第一个tab总页面数，默认取尽量大的数，等服务端数据返回后设置为真实值
        this.tabOneCurrentContent = [];
        this.tabTwoPage = 1;//第二个tab当前页面
        this.tabTwoTotalPage = 10000000;//第二个tab总页面数，默认取尽量大的数，等服务端数据返回后设置为真实值
        this.tabTwoCurrentContent = [];
        this.state = {
            tabOneCurrentContent: [],//构建后的结构
            tabTwoCurrentContent: [],//构建后的结构
        }
    }

    getFirstTabData() {
        if (this.tabOnePage <= this.tabOneTotalPage) {
            this.props.dispatch(getMyClassmate({page: this.tabOnePage, size: 9, type: 1}, (data) => {
                this.tabOnePage = data.currentPage + 1;
                this.tabOneTotalPage = data.totalPage;
                this.tabOneCurrentContent = this.tabOneCurrentContent.concat(this.props.myClassMate);
                this.setState({
                    tabOneCurrentContent:<ListItems data={this.tabOneCurrentContent}/>
                })
            }))
        }
    }

    getSecondTabData() {
        if (this.tabTwoPage <= this.tabTwoTotalPage) {
            this.props.dispatch(getMyClassmate({page: this.tabTwoPage, size: 9, type: 2}, (data) => {
                this.tabTwoPage = data.currentPage + 1;
                this.tabTwoTotalPage = data.totalPage;
                this.tabTwoCurrentContent = this.tabTwoCurrentContent.concat(this.props.myClassMate);
                this.setState({
                    tabTwoCurrentContent:<ListItems data={this.tabTwoCurrentContent}/>
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
            <TitleBar title="我的同学"></TitleBar>
            <TabDataList  structList={[{
                title: '直接同学', getData: () => {
                    this.getFirstTabData()
                },content:this.state.tabOneCurrentContent
            }, {
                title: '间接同学', getData: () => {
                    this.getSecondTabData()
                },content:this.state.tabTwoCurrentContent
            }]}/>
        </div>
    }
}

function mapStateToProps(state) {
    return Object.assign({}, state.myInfo);
}

export default connect(mapStateToProps)(MyClassMate)
