import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';
import TitleBar from '../../components/share/titleBar'
import ProductTypeItem from '../../components/productType/productTypeItem'
import {getProductType} from '../../actions/productAction'
import config from '../../config';


class ProductType extends Component {
    constructor(props) {
        super(props);
    }

    structList() {
        return this.props.productTypes ? this.props.productTypes.map((item, index) => {
            return <ProductTypeItem key={item.catalogId} title={item.catalogName} imgUrl={config.imgPublicPath + item.pic}
                                    onClick={() => {
                                        this.context.router.push(`productList?productType=${item.catalogId}`)
                                    }}/>
        }) : '';
    }

    componentDidMount() {
        this.props.dispatch(getProductType({}));
        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }


    render() {
        return <div className={style.productType}>
            <TitleBar title="课程分类"/>
            {this.structList()}
        </div>
    }
}

ProductType.contextTypes = {
    router: React.PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return Object.assign({}, state.productInfo);
}


export default connect(mapStateToProps)(ProductType)