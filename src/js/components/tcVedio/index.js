import React, {Component} from 'react';
import style from './index.scss';
import ReModal from '../../components/common/reModal'

class TcVedio extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        mainMedia: React.PropTypes.string,//视频id
        mediaType:React.PropTypes.string,//视频类型
        coverpic: React.PropTypes.string,//封面图片
        pause: React.PropTypes.func,//暂停回调
        play: React.PropTypes.func,//视频播放
        ended: React.PropTypes.func,//视频播放完毕
        canPlay: React.PropTypes.bool,//能否播放
        id: React.PropTypes.string,//容器id
    };

    //初始化播放器
    componentDidMount() {
        if(this.props.mainMedia&&this.props.mediaType) {
            let option={
                coverpic: this.props.coverpic,
                listener: (msg) => {
                    if (msg.type == 'play') {
                        this.props.play();
                    }
                    else if (msg.type == 'pause') {
                        this.props.pause();
                    }
                    else if (msg.type == 'ended') {
                        this.props.ended();
                    }
                }
            };
            option[this.props.mediaType]=this.props.mainMedia;
            var player = new TcPlayer(this.props.id, option);
        }
        else{
            ReModal.alert('视频不存在',()=>{
                history.back();
            });
        }
    }

    render() {
        return <div className={style.vedioContainer}>
            <div id={this.props.id}>
            </div>
            {!this.props.canPlay ? <div className={style.mask} onClick={(e) => {
                e.stopPropagation()
            }}></div> : ''}
        </div>
    }
}

export default TcVedio;