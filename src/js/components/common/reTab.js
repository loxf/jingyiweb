/**
 * Created by 小敏哥 on 2017/6/16.
 */
import React, {Component} from 'react';
import style from './reTab.scss';
class ReTab extends Component {
    constructor(props) {
        super(props);
        this.state={
            active:0
        };
    }

    //设置选中项
    setActive(active){
        this.setState({
            active:active
        });
    }

    //渲染标题
    renderTitle(){
        return this.props.children.map((item,i)=>{
            return <div key={'reTabTitleItem'+i} className={this.state.active==i?style.reTabTitleItem+' '+style.activeTitle:style.reTabTitleItem} onClick={()=>{this.setActive(i)}}><div>{item.props.reTabTitle}</div></div>
        });
    }

    test(){
        alert('sdf');
    }

    //渲染主体
    renderContent(){
        return this.props.children.map((item,i)=>{
            return <div key={'reTabContentItem'+i} className={this.state.active==i?style.reTabContentItem+' '+style.activeContent:style.reTabContentItem}>{item}</div>
        });
    }

    getMainClass(){
        return this.props.className?this.props.className+' '+style.reTabContainer:style.reTabContainer;
    }

    render() {
        return <div className={this.getMainClass()}>
            <div className={style.reTabTitles}>{this.renderTitle()}</div>
            <div className={style.reTabContents}>{this.renderContent()}</div>
        </div>
    }
}

export default ReTab;