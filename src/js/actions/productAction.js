import {ALL_PRODUCT_LIST,ALL_PRODUCT_TYPE,PRODUCT_DETAIL,PRODUCT_HTML,ACTIVITY_DETAIL,PACKAGE_DETAIL,ORDER_DETAIL} from './actionsTypes'
import commonAction from './commonAction';

export const productList = data => ({type: ALL_PRODUCT_LIST, data: data}); //商品列表
export const productTypes = data => ({type: ALL_PRODUCT_TYPE, data: data}); //商品分类
export const productDetail = data => ({type: PRODUCT_DETAIL, data: data}); //商品详情
export const productHtml = data => ({type: PRODUCT_HTML, data: data}); //商品详情
export const activityDetail = data => ({type: ACTIVITY_DETAIL, data: data}); //活动详情
export const packageDetail = data => ({type: PACKAGE_DETAIL, data: data}); //套餐详情
export const confirmOrderDetail = data => ({type: ORDER_DETAIL, data: data}); //订单详情

//获取商品列表
export const getProductList=(data,callBack)=> {
    return commonAction.simplePost(data,'api/offer/list',productList,callBack);
};

//获取商品列表
export const getProductType=(data,callBack)=> {
    return commonAction.simplePost(data,'api/offer/catalog',productTypes,callBack);
};

//获取商品详情
export const getProductDetail=(data,callBack)=> {
    return commonAction.simplePost(data,'api/offerClass/detail',productDetail,callBack);
};

//获取活动详情
export const getActivityDetail=(data,callBack)=> {
    return commonAction.simplePost(data,'api/active/detail',activityDetail,callBack);
};

//获取商品富文本介绍
export const getHtml=(data,callBack)=> {
    return commonAction.simplePost(data,'api/html/getHtml',productHtml,callBack);
};

//获取套餐详情
export const getPackageDetail=(data,callBack)=> {
    return commonAction.simplePost(data,'api/offer/detail',packageDetail,callBack);
};

//发送观看视频信息
export const sendVedioMessage=(data,callBack)=> {
    return commonAction.simplePost(data,'api/video/watch',undefined,callBack);
};

//余额支付接口
export const payOrder=(data,callBack)=> {
    return commonAction.simplePost(data,'api/order/pay',undefined,callBack);
};

//初始化订单
export const initOrder=(data,callBack)=> {
    return commonAction.simplePost(data,'api/order/init',confirmOrderDetail,callBack);
};

//下单
export const createOrder=(data,callBack)=> {
    return commonAction.simplePost(data,'api/createOrder',undefined,callBack);
};
//查询订单状态
export const queryOrder=(data,callBack)=> {
    return commonAction.simplePost(data,'api/queryOrder',undefined,callBack);
};