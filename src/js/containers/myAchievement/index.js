import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';
import TitleBar from '../../components/share/titleBar';
import TabDataList from '../../components/share/tabDataList';
import ListItems from '../../components/myAchievement/listItems';

class MyAchievement extends Component {
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
       /* this.tabOneCurrentContent = this.tabOneCurrentContent.concat([
            {
                "createdAt": "测试内容bc10",
                "examName": "测试内容19l11111115",
                "score": 92
            },
            {
                "createdAt": "测试内容bc11",
                "examName": "测试内容19l533333333",
                "score": 60
            },
            {
                "createdAt": "测试内容sdfsdfsdfdsf",
                "examName": "测试内容19l55555555",
                "score": 30
            },
        ]);
        this.setState({
            tabOneCurrentContent:<ListItems data={this.tabOneCurrentContent}/>
        })*/
        if (this.tabOnePage <= this.tabOneTotalPage) {
            this.props.dispatch(getMyScore({page: this.tabOnePage, size: 9}, (data) => {
                this.tabOnePage = data.currentPage + 1;
                this.tabOneTotalPage = data.totalPage;
                this.tabOneCurrentContent = this.tabOneCurrentContent.concat(this.props.myScore);
                this.setState({
                    tabOneCurrentContent:<ListItems data={this.tabOneCurrentContent}/>
                })
            }))
        }
    }

    getSecondTabData() {
        /*this.tabTwoCurrentContent = this.tabTwoCurrentContent.concat([
            {
                certifyName:'考试证书',
                pic:'./images/share/test.png'
            },{
                certifyName:'考试证书2',
                pic:'./images/share/test.png'
            }
        ]);
        this.setState({
            tabTwoCurrentContent:<CertificateItems data={this.tabTwoCurrentContent}/>
        })*/
        if (this.tabTwoPage <= this.tabTwoTotalPage) {
            this.props.dispatch(getmyCertify({page: this.tabTwoPage, size: 9}, (data) => {
                this.tabTwoPage = data.currentPage + 1;
                this.tabTwoTotalPage = data.totalPage;
                this.tabTwoCurrentContent = this.tabTwoCurrentContent.concat(this.props.myCertify);
                this.setState({
                    tabTwoCurrentContent:<CertificateItems data={this.tabTwoCurrentContent}/>
                })
            }))
        }
    }

    componentDidMount() {
        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }


    render(){
        return <div className={style.myAchievement}>
            <TitleBar title="我的成就"></TitleBar>
            <TabDataList  structList={[{
                title: '考试成绩', getData: () => {
                    this.getFirstTabData()
                },content:this.state.tabOneCurrentContent
            }, {
                title: '我的证书', getData: () => {
                    this.getSecondTabData()
                },content:this.state.tabTwoCurrentContent,
                background:'#f1f0f5'
            }]}/>
        </div>
    }
}


MyAchievement.defaultProps = {

};

function mapStateToProps(state) {
    return Object.assign({}, state.examInfo);
}

export default connect(mapStateToProps)(MyAchievement);