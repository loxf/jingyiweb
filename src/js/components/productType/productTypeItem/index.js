import React, {Component} from 'react';
import style from './index.scss';

class ProductTypeItem extends Component {
    constructor(props) {
        super(props);
    }



    render(){
        return <div className={style.productTypeItem} onClick={()=>{this.props.onClick&&this.props.onClick()}}>
            <img src={this.props.imgUrl}/>
            <div className={style.bottom}>
                <div>{this.props.title}</div>
                <button>查看商品</button>
            </div>
        </div>
    }
}

export default ProductTypeItem