import React, {Component} from 'react';
import style from './index.scss';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom'
import TitleBar from '../../components/share/titleBar'
import {getIntegralRanking} from '../../actions/myAction';

import ListItems from '../../components/integralRanking/listItems'

class IntergralRanking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentHeight: "0px"
        }
    }

    //获取数据
    getData(){
        this.props.dispatch(getIntegralRanking({}));
    }

    componentDidMount() {
        this.getData();
        setTimeout(() => {
            this.setState({
                contentHeight: (document.body.offsetHeight - ReactDOM.findDOMNode(this.refs.title).offsetHeight - 183) + "px"
            })
        }, 0);
        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }

    render() {
        return <div className={style.intergralRanking}>
            <TitleBar ref="title" title="积分排行榜"/>
            <div className={style.headerContent}></div>
            {this.props.integralRanking&&this.props.myInit?<div className={style.userMessageContainer}>
                <div className={style.userMessage}>
                    <img src={this.props.myInit.pic}/>
                    <div>
                        <div>{this.props.myInit.nickName}</div>
                        <div><img src="./images/my/paihangbang-2.png"/><span>{'排名：' + this.props.integralRanking.myRanking}</span></div>
                    </div>
                </div>
            </div>:''}
            {this.props.integralRanking?<div className={style.content}>
                <ListItems data={this.props.integralRanking.tenTop}/>
            </div>:''}
        </div>
    }
}

IntergralRanking.defaultProps = {

};


function mapStateToProps(state) {
    return Object.assign({}, state.myInfo);
}

export default connect(mapStateToProps)(IntergralRanking)