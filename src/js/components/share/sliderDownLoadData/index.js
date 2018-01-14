import React, {Component} from 'react';
import ScrollContainer from '../scrollContainer/scrollContainer'

class SliderDownLoadData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initData: this.props.initData?this.props.initData:[],
            contentHeight:'0px'
        }
    }

    static propTypes = {
        initData:React.PropTypes.array,//初始数据
        compent:React.PropTypes.func.isRequired,//列表组件
        getData:React.PropTypes.func.isRequired,//获取数据的函数，需要一个回调函数，并传入获取的数据
        height:React.PropTypes.string//高度
    }

    structContent() {
        return <this.props.compent data={this.state.initData}></this.props.compent>
    }

    componentDidMount(){
        //如无指定初始化数据则自动获取一次数据
        if(!this.props.initData||this.props.initData==[]){
            this.getDataComplete();
        }
    }

    //props改变时重新初始化数据
    componentWillReceiveProps(){
        this.setState({
            initData:[]
        },this.getDataComplete());
    }

    getHeight(){
        //如无指定高度则取标题栏之后的所有高度
        if(!this.props.height) {
           return (document.body.offsetHeight -48) + "px";
        }
        else
        {
            return this.props.height;
        }
    }

    //'松开手获取数据
    getDataComplete(complete) {
        this.props.getData((data) => {
            this.setState({
                initData: this.state.initData.concat(data)
            });
            complete&&complete();
        });
    }

    reset(){
        this.refs.scrollContainer.reset();
    }

    render() {
        return <ScrollContainer width="100%" height={this.getHeight()} noScaleTop={true} ref="scrollContainer"
                                bottomText={{before: "上拉加载数据", middle: "释放加载数据", after: "正在加载数据"}}
                                bottomReleaseEvent={(complete) => {
                                    this.getDataComplete(complete)
                                }}>
            {this.structContent()}
        </ScrollContainer>
    }
}

export default SliderDownLoadData