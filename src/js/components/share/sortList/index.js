import React, {Component} from 'react';
import ChooseList from '../chooseList'
import style from './index.scss';
import SliderDownLoad from '../sliderDownLoad';

class SortList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstTab: false,
            secondTab: false,
            thircTab: false,
            firstTabText: this.props.firstTab.active != -1 ? this.props.firstTab.data[this.props.firstTab.active].text : '全部',
            secondTabText: this.props.secondTab.active != -1 ? this.props.secondTab.data[this.props.secondTab.active].text : '排序',
            thirdTabText: this.props.thirdTab.active != -1 ? this.props.thirdTab.data[this.props.thirdTab.active].text : '筛选',
            contentHeight: document.body.height + 'px'
        };
        this.data = {};
        this.orderVal = 1;
    }

    static propTypes = {
        getData: React.PropTypes.func.isRequired,//构造列表主体的回调函数
        content: React.PropTypes.node,//父节点传过来的列表主体
        firstTab: React.PropTypes.object,//第一个下拉列表相关数据，text显示文字，dataname对应请求参数的名字
        secondTab: React.PropTypes.object,//第二个下拉列表相关数据，text显示文字，dataname对应请求参数的名字
        thirdTab: React.PropTypes.object,//第三个下拉列表相关数据，text显示文字，dataname对应请求参数的名字
        secondTabDataName: React.PropTypes.string,//第二个tab对应的接口参数名字
    };

    //设置选中项文字
    setTabText(tabIndex, text) {
        if (tabIndex == 1) {
            this.setState({
                firstTabText: text
            });
        }
        else if (tabIndex == 2) {
            this.setState({
                secondTabText: text
            });
        }
        else {
            this.setState({
                thirdTabText: text
            });
        }
    }


    //通过默认参数获取数据
    getInitData() {
        let data = {};
        let dataName = '';
        let val = '';
        if (this.props.firstTab.active != -1) {
            dataName = this.props.firstTab.data[this.props.firstTab.active].dataname;
            val= this.props.firstTab.data[this.props.firstTab.active].val;
            data[dataName]=val;
        }
        if (this.props.secondTab.active != -1) {
            dataName = this.props.secondTab.data[this.props.secondTab.active].dataname;
            val= this.props.secondTab.data[this.props.secondTab.active].val;
            data[dataName]=val;
        }

        if (this.props.secondTab.active != -1) {
            dataName = this.props.thirdTab.data[this.props.thirdTab.active].dataname;
            val= this.props.thirdTab.data[this.props.thirdTab.active].val;
            data[dataName]=val;
        }
        this.props.getData(data);
    }

    componentDidMount() {
        //默认数据调用接口构造页面
        this.getInitData();
        setTimeout(() => {
            let top = this.refs.sortListTitle.getBoundingClientRect().top + this.refs.sortListTitle.offsetHeight;
            let all = document.body.offsetHeight;
            this.setState({
                contentHeight: (all - top) + 'px'
            })
        }, 500);
    }

    //构建请求接口的数据并回调
    structCallBackData(tabIndex, activeItem) {
        this.setState({
            firstTab: false,
            secondTab: false,
            thirdTab: false,
        });
        if (activeItem) {
            this.setTabText(tabIndex, activeItem.text);
            this.data[activeItem.dataname] = activeItem.val;
        }
        this.props.getData && this.props.getData(this.data, true);
    }


    //根据传入的数组构建下拉菜单,tabIndex，菜单类型1，2,3分别代表第一二和第三个菜单
    structMenu(list, tabIndex) {
        return <ChooseList active={list.active} delete={false} onChange={(active) => {
            this.structCallBackData(tabIndex, list.data[active]);
        }}>
            {
                list.data.map((item, index) => {
                    return <div className={style.menuItem} key={item.text}>{item.text}</div>
                })
            }
        </ChooseList>
    }

    //控制第一个下拉显示或隐藏
    showFirstMenu() {
        this.setState({
            firstTab: !this.state.firstTab,
            secondTab: false,
            thirdTab: false,
        })
    }

    //控制第二个下拉显示或隐藏
    showSecondMenu() {
        this.setState({
            firstTab: false,
            secondTab: !this.state.secondTab,
            thirdTab: false,
        })
    }

    //控制第三个下拉显示或隐藏
    showThirdMenu() {
        this.setState({
            firstTab: false,
            secondTab: false,
            thirdTab: !this.state.thirdTab,
        })
    }

    //设置tab第二项排序
    setOrder() {
        this.orderVal = this.orderVal == 1 ? 2 : 1;
        this.data[this.props.secondTabDataName] = this.orderVal;
        this.props.getData && this.props.getData(this.data);
    }

    getFirstMenuClass() {
        return this.state.firstTab ? style.menu : style.menu + ' ' + style.hide
    }

    getSecondMenuClass() {
        return this.state.secondTab ? style.menu : style.menu + ' ' + style.hide
    }

    getThirdMenuClass() {
        return this.state.thirdTab ? style.menu : style.menu + ' ' + style.hide
    }


    render() {
        return <div className={style.sortList}>
            <div className={style.sortListTitle} ref="sortListTitle">
                <div onClick={() => {
                    this.showFirstMenu()
                }}>
                    <div className={style.left}>{this.state.firstTabText}</div>
                    <img className={style.firstImg} src="./images/share/shangsanjiao.png"/>
                </div>
                <div onClick={() => {
                    this.showSecondMenu()
                }}>
                    <div className={style.left}>{this.state.secondTabText}</div>
                    <div className={style.imgGroup}>
                        <img src="./images/share/shangsanjiao.png"/>
                        <img src="./images/share/xiasanjiao.png"/>
                    </div>
                </div>
                <div onClick={() => {
                    this.showThirdMenu()
                }}>
                    <div className={style.left}>{this.state.thirdTabText}</div>
                    <img className={style.lastImg} src="./images/share/shuaixuan.png"/>
                </div>
            </div>
            <SliderDownLoad height={this.state.contentHeight} continueCallBack={() => {
                this.props.getData(this.data)
            }}>
                {this.props.content}
            </SliderDownLoad>
            <div className={this.getFirstMenuClass()}>{this.structMenu(this.props.firstTab, 1)}</div>
            <div className={this.getSecondMenuClass()}>{this.structMenu(this.props.secondTab, 2)}</div>
            <div className={this.getThirdMenuClass()}>{this.structMenu(this.props.thirdTab, 3)}</div>
        </div>
    }
}

export default SortList
