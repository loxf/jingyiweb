import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';
import TitleBar from '../../components/share/titleBar'
import ListItems from '../../components/incomeDetail/listItems'
import SliderDown from '../../components/share/sliderDownLoad';
import {getConsumplistList} from '../../actions/myAccountAction';

class ConsumptionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentHeight:document.body.height+'px',
            content:[],
        };
        this.page = 1;//当前页面
        this.totalPage = 10000000;//总页面数，默认取尽量大的数，等服务端数据返回后设置为真实值
    }

    componentDidMount() {
        setTimeout(()=>{
            let top=this.refs.listTitle.getBoundingClientRect().top +this.refs.listTitle.offsetHeight;
            let all=document.body.offsetHeight;
            this.setState({
                contentHeight:(all-top)+'px'
            })
        },500);

        this.getData();

        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }


    //获取数据
    getData(){
        if (this.page <= this.totalPage) {
            let sendObj = Object.assign({page: this.page, size: 20,type:3});
            this.props.dispatch(getConsumplistList(sendObj, (data) => {
                this.page = data.currentPage + 1;
                this.totalPage = data.totalPage;
                this.setState({
                    content:this.state.content.concat(this.props.consumptionList)
                });
            }));
        }
    }

    render() {
        return <div className={style.container}>
            <TitleBar ref="title" title="消费记录" share={false}/>
            <div ref="listTitle" className={style.listTitle}>
                <div>时间</div>
                <div>名称</div>
                <div>金额</div>
            </div>
            {/*<SliderDownLoadData height={this.state.contentHeight} getData={(completeCallBack) => {
                setTimeout(() => {
                    completeCallBack([{'time': '2017-05-01', 'name': '购买课程', 'money': '36.5'}, {
                        'time': '2017-05-01',
                        'name': '购买课程',
                        'money': '36.5'
                    }, {'time': '2017-05-01', 'name': '购买课程', 'money': '36.5'}, {
                        'time': '2017-05-01',
                        'name': '购买课程',
                        'money': '36.5'
                    }, {'time': '2017-05-01', 'name': '购买课程', 'money': '36.5'}])
                }, 1000)
            }} compent={ListItems} initData={[{
                'time': '2017-05-01',
                'name': '购买课程',
                'money': '36.5'
            }, {'time': '2017-05-01', 'name': '购买课程', 'money': '36.5'}, {
                'time': '2017-05-01',
                'name': '购买课程',
                'money': '36.5'
            }, {'time': '2017-05-01', 'name': '购买课程', 'money': '36.5'}, {
                'time': '2017-05-01',
                'name': '购买课程',
                'money': '36.5'
            }, {'time': '2017-05-01', 'name': '购买课程', 'money': '36.5'}]}> </SliderDownLoadData>*/}
            {this.state.content.length>0?<SliderDown height={this.state.contentHeight} continueCallBack={()=>{this.getData()}}>
                <ListItems data={this.state.content}/>
            </SliderDown>:<div className={style.noData}>暂无数据</div>}
        </div>
    }
}



function mapStateToProps(state) {
    return Object.assign({}, state.myAccountInfo);
}

export  default connect(mapStateToProps)(ConsumptionList);