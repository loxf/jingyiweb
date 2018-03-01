import React, {Component} from 'react';
import style from './index.scss';
import SliderDownLoad from '../sliderDownLoad';

class TabDataList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            contentHeight:document.body.height+'px'
        }
    }

    //设置活动
    setActive(index) {
        if(index!=this.state.active) {
            this.setState({
                active: index,
            });
            //this.refs.sliderDownLoadData.reset();

            if(this.props.structList[index].content.length<=0){
                this.props.structList[index].getData();
            }
        }
    }

    componentDidMount() {
        //默认数据调用接口构造页面
        this.props.structList[this.state.active].getData();
        //设置高度
        setTimeout(()=>{
            let top=this.refs.tabTitle.getBoundingClientRect().top +this.refs.tabTitle.offsetHeight;
            let all=document.body.offsetHeight;
            this.setState({
                contentHeight:(all-top)+'px'
            })
        },500);
    }

    static propTypes = {
        structList: React.PropTypes.array.isRequired,//构造列表主体的回调函数,title, 标题，getData，获取数据的回调函数,content:获取后的内容
    }

    //构建标题
    structTitle() {
        return this.props.structList.map((item, index) => {
            return <div key={item.title} className={this.state.active == index ? style.active : ''} onClick={() => {
                this.setActive(index)
            }}>{item.title}</div>
        })
    }

    render() {
        return <div className={style.tabDataList}>
            <div className={style.title} ref="tabTitle">
                {this.structTitle()}
            </div>
            <div className={style.content}>
                <SliderDownLoad height={this.state.contentHeight} background={this.props.structList[this.state.active].background} continueCallBack={()=>{this.props.structList[this.state.active].getData()}}>
                    {this.props.structList[this.state.active].content}
                </SliderDownLoad>
         {/*       <SliderDownLoadData compent={this.props.compent}
                                    getData={this.props.structList[this.state.active].getData} height={this.getHeight()} ref="sliderDownLoadData"/>*/}
            </div>
        </div>
    }
}

export default TabDataList