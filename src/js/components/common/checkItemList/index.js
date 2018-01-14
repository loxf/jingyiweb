/**
 * Created by 小敏哥 on 2017/8/11.
 */
import React, {Component} from 'react';
import ItemList from '../itemList';
import CkeckBox from '../checkBox/checkBoxItem';
import style from './index.scss';
class CheckItemList extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedIndex:props.initValue?props.initValue:0
        }
    }

    static propTypes = {
        checkedCallBack: React.PropTypes.func,//点击后回调
        initValue:React.PropTypes.number,//默认选择项
    };


    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedIndex:nextProps.initValue
        })
    }

    setSelected(index){
        this.setState({
            selectedIndex:index,
        });
        this.props.checkedCallBack&&this.props.checkedCallBack(index);
    }

    //构建列表
    structList(){
        return this.props.children?this.props.children.map((item,index)=>{
            return <div key={'checkItem'+index} className={style.checkItem}>
                <div className={style.itemContent}>
                {item}
                </div>
                {this.props.children.length>1?<CkeckBox checked={this.state.selectedIndex==index} type="radio" checkedCallBack={()=>{this.setSelected(index)}} forceChecked={this.state.selectedIndex==index}/>:''}
            </div>
        }):''
    }

    render(){
        return <div className={style.checkItemList}>
            <ItemList borderPaddingLeft="15px" borderPaddingRight="15px">
                {this.structList()}
            </ItemList>
        </div>
    }
}

export default CheckItemList;