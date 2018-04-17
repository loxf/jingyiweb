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
        this.state = {
            lessionTypesCurrent: -1,
            showSignButton: true,
            allTypeShow:false
        };
        this.urlOperation = new urlOperation();
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
        //获取传参类型
        let productType = this.urlOperation.getParameters()['productType'];
        //获取分类
        this.props.dispatch(getProductType({size: 20},() => {
            let productTypes = this.props.productTypes;
            let typeId = productType?productType:productTypes[0].catalogId;
            this.props.dispatch(getProductList({catalogId:typeId,size: 1000}));
        }));
        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }
    //构建商品类型
    structProductType(limit) {
        let lessionTypes = this.props.productTypes||[];
        if(limit) lessionTypes = lessionTypes.slice(0,6);
        //获取传参类型
        let productType = this.urlOperation.getParameters()['productType'];
        // let lessionTypes = [{catalogName:"分类一",catalogId:"1"},{catalogName:"分类一分类一分类一分类一",catalogId:"2"},{catalogName:"分类一",catalogId:"3"},{catalogName:"分类一",id:"4"},{catalogName:"分类一",id:"5"},{catalogName:"分类一",id:"6"},{catalogName:"分类一",id:"7"},];
        let typeList = lessionTypes.map((item, index) => {
            if(this.state.lessionTypesCurrent == -1){
                return <div key={index} onClick={this.tabChange.bind(null,item.catalogId,index)} className={productType == item.catalogId?style.tabTitleItemActive:style.tabTitleItem}>{item.catalogName}</div>
            }else{
                return <div key={index} onClick={this.tabChange.bind(null,item.catalogId,index)} className={this.state.lessionTypesCurrent == index?style.tabTitleItemActive:style.tabTitleItem}>{item.catalogName}</div>
            }
        })
        if(!limit) typeList.push(<div key={typeList.length+1} onClick={this.tabChange.bind(null,"",typeList.length+1)} className={this.state.lessionTypesCurrent == typeList.length+1?style.tabTitleItemActive:style.tabTitleItem}>全部分类</div>)
        return typeList;
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
    renderTabTitle = () =>{
        let lessionTypes = this.props.productTypes||[];
        // let lessionTypes = [{catalogName:"分类一",catalogId:"1"},{catalogName:"分类一分类一分类一分类一",catalogId:"2"},{catalogName:"分类一",catalogId:"3"},{catalogName:"分类一",id:"4"},{catalogName:"分类一",id:"5"},{catalogName:"分类一",id:"6"},{catalogName:"分类一",id:"7"},];
        if (this.state.allTypeShow) {
            return  <div>
                        <div className={style.lessionTypeListAll}>
                            {this.structProductType()}
                        </div>
                        <div className={style.typeBtn} onClick={this.closeTypeShow}><img src="./images/home/close_menu.png"/><span>点击收起</span></div>
                    </div>
        }else{
            if (lessionTypes.length<=2) {
                return <div className={style.lessionTypeListAll}>
                    {this.structProductType()}
                </div>
            }else if (lessionTypes.length<=5) {
                return <div className={style.lessionTypeListAll}>
                    {this.structProductType()}
                </div>
            }else{
                return  <div>
                            <div className={style.lessionTypeListAll}>
                                {this.structProductType({limit:true})}
                            </div>
                            <div className={style.typeBtn} onClick={this.allTypeShow}><img src="./images/home/open_menu.png"/><span>点击查看更多</span></div>
                        </div>
            }
        }
    };
    renderContent = () =>{
        let productList = this.props.productList||[];
        return productList.length>0 ? 
            <div className={style.productsContent}>
                {this.structProductList()}
            </div> : <div className={style.none}>该分类暂无内容</div>
    };
    allTypeShow = () =>{
        this.setState({
            allTypeShow:true
        })
    }
    closeTypeShow = () => {
        this.setState({
            allTypeShow:false
        })
    }
    tabChange = (id,index) => {
        if(index!=this.state.lessionTypesCurrent){
            this.props.dispatch(getProductList({catalogId:id,size: 1000}));
            this.setState({
                lessionTypesCurrent:index
            })
        }
    }
    render() {
        return <div className={style.activityList}>
            <TitleBar title="课程列表" right={{
                img: './images/share/home.png',
                onClick: () => {
                    this.context.router.push('/');
                }
            }}/>
            <div className={style.tabContainer}>
                <div className={style.tabTitle}>
                    {this.renderTabTitle()}
                </div>
                <div className={style.tabContent}>
                    {this.renderContent()}
                </div>
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