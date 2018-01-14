import React, {Component} from 'react';
import style from './index.scss';
import userHelper from '../../../js/utils/userHelper';

class LeVedio extends Component {
    constructor(props) {
        super(props);
        this.player= new CloudVodPlayer();
        window.vedioCallBack=(type,data)=>{
            if(type=='videoPause'){
                this.props.pause();
            }
            else if(type=='videoStart'){
                this.props.start();
            }
            else if(type=='videoResume'){
                this.props.resume();
            }
        }
    }

    static propTypes = {
        vedioId:React.PropTypes.string,//视频id
        pause:React.PropTypes.func,//暂停回调
        start:React.PropTypes.func,//视频开始回调
        resume:React.PropTypes.func,//视频恢复
        canPlay:React.PropTypes.bool,//能否播放
    };

    componentDidMount() {
        this.player.init(Object.assign(userHelper.getLecloudConfig(),{vu:this.props.vedioId,}), this.props.id);//创建播放器的实例
        this.player.sdk.pauseVideo();//实例调用方法
    }

    render() {
        return <div className={style.vedioContainer}>
            <div id={this.props.id}>
            </div>
            {!this.props.canPlay?<div className={style.mask} onClick={(e)=>{e.stopPropagation()}}></div>:''}
        </div>
    }
}

export default LeVedio;