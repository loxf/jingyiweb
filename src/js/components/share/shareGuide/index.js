import React, {Component} from 'react';
import style from './index.scss';
class ShareGuide extends Component {
    constructor(props) {
        super(props);
        this.state={
            show:false,
        };
        this.show=this.show.bind(this);
    }

    static propTypes = {
        hideCallBack:React.PropTypes.func,//蒙层关闭回调
    }

     show(){
        this.setState({
            show:true
        })
    }

    hide(){
        this.setState({
            show:false
        });
        this.props.hideCallBack&&this.props.hideCallBack();
    }


    render(){
        let isXcx = (window.__wxjs_environment === 'miniprogram')
        return <div onClick={()=>{this.hide()}} className={this.state.show?style.shareGuide:style.hide}>
            <img  src={isXcx?"./images/share/guidIcon_xcx.png":"./images/share/guidIcon.png"}/>
        </div>
    }
}

export default ShareGuide;