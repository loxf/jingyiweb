import React, {Component} from 'react';
import style from './index.scss';

class SliderDownLoad extends Component {
    constructor(props) {
        super(props);
        this.shouldLoad=true;
    }

    static propTypes = {
        height:React.PropTypes.string.isRequired,//高度
        continueCallBack:React.PropTypes.func//向下滑动回调函数
    };

    containerScroll(e){
        let bottom=e.target.scrollHeight-e.target.offsetHeight-e.target.scrollTop;
        if(bottom>50){
            this.shouldLoad=true;
        }
        if(bottom<10&&this.shouldLoad){
            this.shouldLoad=false;
            this.props.continueCallBack&&this.props.continueCallBack();
        }
    }

    componentDidMount(){
    }

    render(){
        return <div className={style.sliderDownLoad} style={{height:this.props.height}} onScroll={(e)=>{this.containerScroll(e)}}>
            {this.props.children}
        </div>
    }

}
export default SliderDownLoad;