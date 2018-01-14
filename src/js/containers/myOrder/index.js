import React, {Component} from 'react';
import style from './index.scss';
import {connect} from 'react-redux';
import TitleBar from "../../components/share/titleBar/index";
import SliderDownLoad from '../../components/share/sliderDownLoad';
import ListItems from '../../components/myOrder/listItems'
import {getMyOrder} from '../../actions/myAction';


class MyOrder extends Component {
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


    //获取数据
    getData() {
        if (this.page <= this.totalPage) {
            this.props.dispatch(getMyOrder({page: this.page, size: 10, type: 1}, (data) => {
                this.page = data.currentPage + 1;
                this.totalPage = data.totalPage;
                this.currentContent = this.currentContent.concat(this.props.myOrder);
                this.setState({
                    currentContent: this.currentContent
                })
            }))
        }
    }

    componentDidMount() {
        this.getData();
        //设置高度
        setTimeout(() => {
            let top = this.refs.listTitle.getBoundingClientRect().top + this.refs.listTitle.offsetHeight;
            let all = document.body.offsetHeight;
            this.setState({
                contentHeight: (all - top) + 'px'
            })
        }, 500);

        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }

    render(){
        return <div className={style.myOrder}>
            <TitleBar title="我的订单"/>
            <div ref="listTitle" className={style.listTitle}>
                <div>时间</div>
                <div>名称</div>
                <div>金额</div>
                <div>状态</div>
            </div>
            <SliderDownLoad height={this.state.contentHeight} continueCallBack={()=>{this.getData()}}>
                <ListItems data={this.state.currentContent}/>
            </SliderDownLoad>
        </div>
    }
}

function mapStateToProps(state) {
    return Object.assign({}, state.myInfo);
}

export default connect(mapStateToProps)(MyOrder);