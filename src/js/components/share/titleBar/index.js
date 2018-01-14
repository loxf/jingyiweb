import React, {Component} from 'react';
import style from './index.scss';

class TitleBar extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        title: React.PropTypes.string,//标题
        right:React.PropTypes.object,//右侧按钮，img:图标，onClick:点击事件
        rightText:React.PropTypes.object,//右侧文字按钮，text:文字，onClick:点击事件
        back:React.PropTypes.func,//自定义后退事件
    };

    //渲染右侧按钮
    renderRightButton(){
        if(this.props.right){
            return <img src={this.props.right.img} onClick={this.props.right.onClick}/>
        }
        else if(this.props.rightText){
            return <div className={style.rightText}  onClick={this.props.rightText.onClick}>{this.props.rightText.text}</div>
        }
        else{
            return <div className={style.rightSpace}></div>
        }
    }

    back(){
        if(this.props.back){
            this.props.back();
        }
        else{
            history.back();
        }
    }

    render() {
        return <div className={style.container}>
            <div className={style.bar}>
                <img src="./images/share/fanhui.png" onClick={()=>{this.back()}}/>
                <div className={style.title}>{this.props.title}</div>
                {this.renderRightButton()}
            </div>
        </div>
    }
}

export default TitleBar