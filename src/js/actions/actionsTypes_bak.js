/*
* 这里定义所有的action类型
* */

//订单相关
export const USE_COUPON = 'USE_COUPON'; //使用优惠券
export const ORDER_INFO = 'ORDER_INFO'; //用户订单信息
export const COUPON_LIST = 'COUPON_LIST'; //优惠券列表
export const PAY_SCRIPT = 'PAY_SCRIPT'; //优惠券列表

//首页相关
export const YEARLY_CHECK_INFO = 'YEARLY_INSPECTION_INFO'; //年检详细信息
export const PROCE_DURES = 'PROCE_DURES'; //年检详细信息
export const CAR_LIST = 'CAR_LIST'; //车辆列表
export const CURRENT_CAR_INDEX = 'CURRENT_CAR_INDEX'; //选中车牌
export const POSITION = 'POSITION'; //定位位置
export const HOME_PUBLIC_DATA='HOME_PUBLIC_DATA';//与其他页面的共享数据

//上线检年检资料及联系地址
export const OVER_LINE_ORDER_DETAIL='OVER_LINE_ORDER_DETAIL';
export const OVER_LINE_DOCS='OVER_LINE_DOCS';

// 年检手续相关
export const VIOLATION_CHECK_INFO ='VIOLATION_CHECK_INFO'; //年检手续-车辆的违章条数//详情
export const TAX_CHECK_INFO ='TAX_CHECK_INFO'; //年检手续-车辆的违章条数//详情
export const GET_VAILL_INFO ='GET_VAILL_INFO'; //年检手续-免检时，请求数据拿到所需资料
export const CHECK_ASSOCIATED_INFO='CHECK_ASSOCIATED_INFO'; //被选中的资料条件

//选择寄送方式

export const ADD_LIST = 'ADD_LIST';

//年检提醒
export const ADD_CAR_INFO = 'ADD_CAR_INFO'; //添加车辆信息
export const UPDATE_CAR_INFO = 'UPDATE_CAR_INFO'; //更新车辆信息

//图片上传
export const TEST_IMG='TEST_IMG';
export const INSURANCE_IMG='INSURANCE_IMG';//交强险
export const IDCARD_OBVERSE_IMG='IDCARD1_IMG';//身份证正面
export const IDCARD_BACK_IMG='IDCARD2_IMG';//身份证反面
export const TAX_IMG='TAX_IMG';//车船税
export const LICENSE_OBVERSE_IMG='LICENSE1_IMG';//行驶证正面
export const LICENSE_BACK_IMG='LICENSE2_IMG';//行驶证反面
export const USERANDCARD_IMG='USERANDCARD_IMG';//用户手持身份证

//上传结果
export const UPLOAD_RESULT='UPLOAD_RESULT';