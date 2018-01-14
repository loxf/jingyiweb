/*选择列表，带下划线*/

import React, {Component} from 'react';
import style from './index.scss';
import ItemCanDelete from '../../share/itemCanDelete';

class ChooseListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: typeof(props.active)!='undefined'?props.active:0
        }
    }

/*
    componentWillReceiveProps(nextProps){
        this.setState({
            active: nextProps.active
        });
    }
*/

    componentDidMount() {
        //当传入actives时调用setActive，以便触发外层的变化
        if(this.props.active){
            this.setState({
                active: this.props.active
            });
        }
    }

    setActive(index) {
        this.setState({
            active: index
        });
        this.props.onChange && this.props.onChange(index);
    }

    static propTypes = {
        active:React.PropTypes.number,//默认选中项，-1为不选中
        onChange: React.PropTypes.func,//改变后回调函数
        delete: React.PropTypes.bool,//是否支持删除
        tickImg: React.PropTypes.string,//打钩图片
        onDelete:React.PropTypes.func,//删除后回调
    };

    structList() {
        return !this.props.delete ? this.props.children.map((item, index) => {
            if(item) {
                return <div key={index}
                            className={this.props.children.length - 1 == index ? (style.listItem + ' ' + style.last) : style.listItem}
                            onClick={() => {
                                this.setActive(index)
                            }}>
                    <div>{item}</div>
                    <div>{this.state.active == index ?
                        <img className={style.choose}
                             src={this.props.tickImg ? this.props.tickImg : "./images/toBeAgent/duigou.png"}/> : ''}</div>
                </div>
            }
        }) : this.props.children.map((item, index) => {
            if(item) {
                return <ItemCanDelete key={index} onDelete={() => {
                    this.props.onDelete && this.props.onDelete(index)
                }}>
                    <div
                        className={this.props.children.length - 1 == index ? (style.listItem + ' ' + style.last) : style.listItem}
                        onClick={() => {
                            this.setActive(index)
                        }}>
                        <div>{item}</div>
                        <div>{this.state.active == index ?
                            <img className={style.choose}
                                 src={this.props.tickImg ? this.props.tickImg : "./images/toBeAgent/duigou.png"}/> : ''}</div>
                    </div>
                </ItemCanDelete>
            }
        })
    }


    render() {
        return <div className={style.chooseList}>
            {this.structList()}
        </div>
    }
}

export default ChooseListItem;