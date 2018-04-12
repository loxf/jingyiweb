import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';
import TitleBar from '../../components/share/titleBar';
import SortList from '../../components/share/sortList';
import ProductItem from '../../components/Home/productItem';
import ItemList from '../../components/share/itemList';
import config from '../../config';
import urlOperation from '../../utils/urlOperation';
import {getProductList, getProductType} from '../../actions/productAction'
import { Tabs, WhiteSpace,Toast } from 'antd-mobile';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    //跳转到对应的课程和活动详情
    toDetail(type, id) {
        switch (type) {
            case 'OFFER':
                this.context.router.push(`packageDetail?id=${id}`);
                break;
            case 'CLASS':
                this.context.router.push(`lessonDetail?id=${id}`);
                break;
            case 'ACTIVE':
                this.context.router.push(`activityDetail?id=${id}`);
                break;
        }
    }

    componentWillUnmount() {
        wx.showOptionMenu();
    }

    componentDidMount() {
        //获取分类
        this.props.dispatch(getProductType({size: 20},() => {
            let productTypes = this.props.productTypes;
            this.props.dispatch(getProductList({catalogId:productTypes[0].catalogId,size: 5, sortType: 'HOT'}));
        }));
        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }
    //构建商品列表
    structProductList() {
        return this.props.productList.map((item, index) => {
            return <ProductItem key={item.offerId} imgUrl={config.imgPublicPath + item.offerPic} title={item.offerName}
                                showVipIcon={true} freeType={item.freeType}
                                time={item.createdAt} teacher={item.teachers}
                                count={item.playTime} onClick={() => {
                this.toDetail(item.offerType, item.offerId)
            }}/>
        })
    }
    renderContent = tab =>{
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            {this.props.productList ? 
            <div className={style.productsContent}>
                {/* <div className={style.title}>
                    <div></div>
                    <div>课程</div>
                </div> */}
                {this.structProductList()}
                {/* <div className={style.more} onClick={() => {
                    this.context.router.push('/productList')
                }}>查看更多
                </div> */}
            </div> : ''}
        </div>
    };
    tabChange = (data) => {
        this.props.dispatch(getProductList({catalogId:data.id,size: 1000, sortType: 'HOT'}));
    }
    render() {
        let pro_tabs = this.props.productTypes||[];
        let tabs = pro_tabs.map((v,i) => {
            return {
                title:v.catalogName,
                id:v.catalogId
            }
        })
        return <div className={style.activityList}>
            <TitleBar title="课程列表" right={{
                img: './images/share/home.png',
                onClick: () => {
                    this.context.router.push('/');
                }
            }}/>
            <div className={style.tabContainer}>
                <WhiteSpace />
                <Tabs onChange = {this.tabChange} tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}>
                    {this.renderContent}
                </Tabs>
            </div>
        </div>
    }
}

//使用context
ProductList.contextTypes = {
    router: React.PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return Object.assign({}, state.productInfo);
}


export default connect(mapStateToProps)(ProductList)

// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import style from './index.scss';
// import TitleBar from '../../components/share/titleBar';
// import SortList from '../../components/share/sortList';
// import ProductItem from '../../components/Home/productItem';
// import ItemList from '../../components/share/itemList';
// import config from '../../config';
// import urlOperation from '../../utils/urlOperation';
// import {getProductList, getProductType} from '../../actions/productAction'

// class ProductList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             content: '',
//             productActive: -1,//商品类型默认选中项
//             load: false,//数据初始化完成
//         };
//         this.page = 1;//当前页面
//         this.totalPage = 10000000;//总页面数，默认取尽量大的数，等服务端数据返回后设置为真实值
//         this.currentContent = [];
//         this.urlOperation = new urlOperation();
//     }

//     //跳转到对应的课程和活动详情
//     toDetail(type, id) {
//         switch (type) {
//             case 'OFFER':
//                 this.context.router.push(`packageDetail?id=${id}`);
//                 break;
//             case 'CLASS':
//                 this.context.router.push(`lessonDetail?id=${id}`);
//                 break;
//             case 'ACTIVE':
//                 this.context.router.push(`activityDetail?id=${id}`);
//                 break;
//         }
//     }


//     //构建列表主体内容,additionalData,追加的参数，clear：为true时清空原有数据重新加载
//     structListContent(additionalData, clear) {
//         //true时重新初始化
//         if (clear) {
//             this.page = 1;//当前页面
//             this.totalPage = 10000000;
//             this.currentContent = [];
//         }
//         if (this.page <= this.totalPage) {
//             let sendObj = Object.assign({page: this.page, size: 10}, additionalData);
//             this.props.dispatch(getProductList(sendObj, (data) => {
//                 this.page = data.currentPage + 1;
//                 this.totalPage = data.totalPage;
//                 this.currentContent = this.currentContent.concat(this.props.productList);
//                 this.setState({
//                     content: <ItemList>
//                         {this.currentContent.map((item, index) => {
//                             return <ProductItem showVipIcon={true} key={item.offerId}
//                                                 imgUrl={config.imgPublicPath + item.offerPic} freeType={item.freeType}
//                                                 offerType={item.offerType}
//                                                 title={item.offerName} time={item.createdAt} teacher={item.teachers}
//                                                 count={item.playTime} price={item.price} onClick={() => {
//                                 this.toDetail(item.offerType, item.offerId)
//                             }}></ProductItem>
//                         })}
//                     </ItemList>
//                 });
//             }));
//         }
//     }

//     componentWillUnmount() {
//         wx.showOptionMenu();
//     }

//     componentDidMount() {
//         //获取分类
//         this.props.dispatch(getProductType({}, () => {

//             let productType = this.urlOperation.getParameters()['productType'];
//             let productTypes = this.structProductTypeObj();
//             if (productType) {
//                 for (let i = 0; i < productTypes.length; i++) {
//                     if (productType == productTypes[i].val) {
//                         this.setState({
//                             productActive: i,
//                         });
//                         break;
//                     }
//                 }
//             }
//             //加载完成
//             this.setState({
//                 load: true,
//             });
//         }));
//         wx.ready(() => {
//             wx.hideOptionMenu();
//         });
//     }

//     structProductTypeObj() {
//         let productTypearray = [{
//             dataname: 'catalogId',
//             val: '',
//             text: '全部',
//         }];
//         for (let item of this.props.productTypes) {
//             productTypearray.push({
//                 dataname: 'catalogId',
//                 val: item.catalogId,
//                 text: item.catalogName.length <= 10 ? item.catalogName : (item.catalogName.substr(0, 10) + '...'),
//             })
//         }
//         return productTypearray;
//     }

//     render() {
//         return <div className={style.activityList}>
//             <TitleBar title="课程列表" right={{
//                 img: './images/share/home.png',
//                 onClick: () => {
//                     this.context.router.push('/');
//                 }
//             }}/>
//             <div className={style.listContent}>
//                 {this.state.load ?
//                     <SortList firstTab={{active: this.state.productActive, data: this.structProductTypeObj()}}
//                               secondTab={{
//                                   active: -1, data: [{dataname: 'sortType', val: '', text: '全部'},
//                                       {dataname: 'sortType', val: 'DATE', text: '最新'},
//                                       {dataname: 'sortType', val: 'HOT', text: '热门'}]
//                               }}
//                               thirdTab={{
//                                   active: -1, data: [{dataname: 'filter', val: '', text: '全部'},
//                                       {dataname: 'filter', val: 'NONE', text: '免费'},
//                                       {dataname: 'filter', val: 'VIP', text: 'vip'},
//                                       {dataname: 'filter', val: 'SVIP', text: 'svip'},
//                                       {dataname: 'filter', val: 'OFFER', text: '套餐'},
//                                       {dataname: 'filter', val: 'CLASS', text: '课程'}]
//                               }}
//                               secondTabDataName="order"
//                               getData={(additionalData, clear) => {
//                                   this.structListContent(additionalData, clear)
//                               }} content={this.state.content}
//                     /> : ''}
//             </div>
//         </div>
//     }
// }

// //使用context
// ProductList.contextTypes = {
//     router: React.PropTypes.object.isRequired
// };


// function mapStateToProps(state) {
//     return Object.assign({}, state.productInfo);
// }


// export default connect(mapStateToProps)(ProductList)