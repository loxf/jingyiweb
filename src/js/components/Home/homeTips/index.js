/**
 * Created by 小敏哥 on 2017/8/10.
 */
import React, {Component} from 'react';
import style from './index.scss';
class HomeTips extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,//是否显示
        };
        this.setTipsStatus=this.setTipsStatus.bind(this);
        //监听滚动事件
        window.addEventListener('scroll',this.setTipsStatus,false);
    }

    static propTypes = {
        carNumber:React.PropTypes.string,//车牌号码
        days:React.PropTypes.number,//天数
        state:React.PropTypes.number,//车辆状态
    };

    carMessageDictionary(state,days) {
        switch (state) {
            case -1:
                return {
                    message: '距年检预约还有',
                    days: '？天'
                };
            case 0:
                return {
                    message: '距年检预约还有',
                    days: days+'天'
                };
            case 1:
                return {
                    message: '距年检有效期截止还剩',
                    days: days+'天'
                };
            case 2:
                return {
                    message: '已逾期',
                    days:days+'天',
                    messageEnd:'，仍可免检',
                };
            case 3:
                return {
                    message: '已逾期',
                    days: days+'天',
                    messageEnd:'，需上线检测',
                };
            case 4:
                return {
                    message: '已严重逾期(连续逾期两次)',
                    days: ''
                };
            case 5:
                return {
                    message: '已报废，请勿驾驶',
                    days:''
                };
            case 6:
                return{
                    message: '年检正在办理中',
                    days:''
                };
        }
    }


    //设置显示状态
    setTipsStatus(e){
        let showStatus=document.body.scrollTop>350;
        this.setState({
            show:showStatus
        });
    }

    componentWillUnmount(){
        window.removeEventListener('scroll',this.setTipsStatus,false);
    }

    //动态切换显示样式
    getMainClass() {
        return this.props.carNumber&&this.state.show ? style.tipsContainer : style.tipsContainer + ' ' + style.hide;
    }

    render() {
        let carMessage=this.carMessageDictionary(this.props.state,this.props.days);
        return <div className={this.getMainClass()}>
            {this.props.carNumber+carMessage.message+carMessage.days+(carMessage.messageEnd?carMessage.messageEnd:'')}
        </div>
    }
}
export default HomeTips