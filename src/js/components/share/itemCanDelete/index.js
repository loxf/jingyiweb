import React, {Component} from 'react';
import style from './index.scss';

class ItemCanDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: 0
        };
        this.startPosition = 0;//起始点击位置
        this.movingLength = 0;//移动距离，正负区分
        this.direction=true;//true为向右滑动，false为向左滑动
        this.setStartPosition = this.setStartPosition.bind(this);
        this.moving = this.moving.bind(this);
        this.movingEnd = this.movingEnd.bind(this);
    }

    //获取起始位置
    setStartPosition(e) {
        this.startPosition = e.targetTouches[0].clientX;
    }

    static propTypes = {
        onDelete:React.PropTypes.func,//删除回调
    }

    moving(e) {
        if ((e.targetTouches[0].clientX - this.startPosition) + this.movingLength >= -65 && (e.targetTouches[0].clientX - this.startPosition) + this.movingLength <= 0) {
            this.movingLength = (e.targetTouches[0].clientX - this.startPosition) + this.movingLength;
            this.direction=e.targetTouches[0].clientX - this.startPosition>0;
            this.setState({
                left: this.movingLength
            });
        }
    }

    movingEnd(e) {
        if(!this.direction){
            this.movingLength=-65;
            this.setState({
                left: -65
            });
        }
        else{
            this.movingLength=0;
            this.setState({
                left: 0
            });
        }
    }

    render() {
        return <div className={style.itemCanDelete}>
            <div className={style.itemContainer} style={{left: this.state.left + 'px'}}
                 onTouchStart={this.setStartPosition} onTouchMove={this.moving} onTouchEnd={this.movingEnd}>
                <div className={style.content}>{this.props.children}</div>
                <div className={style.delete} onClick={()=>{this.props.onDelete&&this.props.onDelete()}}><img src="./images/share/lajitong.png"/></div>
            </div>
        </div>
    }
}

export default ItemCanDelete

