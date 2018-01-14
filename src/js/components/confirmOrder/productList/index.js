import React, {Component} from 'react';
import style from './index.scss';
import config from '../../../config';


class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state={
            active:0,
        }
    }

    static propTypes = {
        productList:React.PropTypes.array,//商品信息列表
        onChange:React.PropTypes.func,//选择回调
    };

    setActive(index){
        this.setState({
            active:index
        });
        this.props.onChange&&this.props.onChange(index);
    }

    structProductList(){
        return this.props.productList.map((item,index)=>{
            return <div className={style.productItem} key={item.offerId}  onClick={()=>{this.setActive(index)}}>
                <div className={style.content}>
                    <img className={style.check} src={this.state.active==index?'./images/confirmOrder/xuanzhong.png':'./images/confirmOrder/weixuanzhong.png'}/>
                    <img className={style.productImg} src={config.imgPublicPath+item.pic}/>
                    <div className={style.message}>
                        <div>{item.offerName}</div>
                        <div>{'￥'+item.price}</div>
                    </div>
                </div>
                <div className={style.bottomMessage}>
                    {item.descList?<div><span>●</span>{'  '+item.descList[0]}</div>:<div></div>}
                    {item.descList?<div><span>●</span>{'  '+item.descList[1]}</div>:<div></div>}
                </div>
            </div>
        });
    }

    render(){
        return <div className={style.productList}>
            {this.structProductList()}
        </div>
    }
}

export default ProductList
