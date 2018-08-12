/**
 * Created by 小敏哥on 2017/3/9.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Toast, Popup} from 'antd-mobile';
import {
    getCarList,
    checkInspection,
    currentCarIndex,
    homePublicData,
    addCar,
    getWeixinConfig,
    getCityName,
    getViewUri,
    getSliderTips
} from '../../actions/homeAction_bak';
import {updateMessage} from '../../actions/calculatorAction';
import {carPrefix} from '../../actions/carPrefixList';
import {
    CarNumberItem,
    HomePageHeader,
    EmptyCarNumberItem,
    MeansureAgain,
} from '../../components/Home';
import Carousel  from 'nuka-carousel';
import SliderBottom from '../../components/Home/sliderBottom'
import CarPrefixList from '../../components/carPrefixList/pro';
import PageBar from '../../components/common/pageBar';
import FooterAlert from '../../components/Home/FooterAlert'
import ButtonWithCxytj from '../../components/common/buttonWithCxytj';
import AlipayJSOperation from '../../utils/alipayJSOperation';
import style from './index.scss';
import userHelper from '../../utils/userHelper'
import ReModal from '../../components/common/reModal';
import MessageContent from '../../components/Home/messageContent';
import HomeTips from '../../components/Home/homeTips';
import NotYetTips from '../../components/calculatorOfYearlyCheck/notYetTips';
import TipsBar from '../../components/Home/tipsBar';
import typeOfBrowser from '../../utils/typeOfBrowser';


class Home extends Component {

    constructor(props) {
        super(props);
        this.hasLocation = false;
        this.state = {
            emptyCurrent: false,//滑动列表选中新建车辆
            currentCarNumber: '',
            sliderItem: [],
            newCarNumberCache: '',//新增车牌号码缓存
            allowDate: this.getAllowDate(),//设置允许年检日期
            carPrefix: this.props.carPrefix, //给个默认前缀
            show: false,
            list: [], //车牌前缀
            buttonText: '',//底部按钮文字
            sliderTipsText:'',//滚动提示文字
        };
        this.checkInspection = this.checkInspection.bind(this);
        this.goToComfirmOrder = this.goToComfirmOrder.bind(this);
        this.structSlider = this.structSlider.bind(this);
        this.addCar = this.addCar.bind(this);
        this.getName = this.getName.bind(this);
        this.getProvinces = this.getProvinces.bind(this);
        this.getButtonText = this.getButtonText.bind(this);
        //尽可能快的屏蔽微信分享
        this.WeXinOperation();
        //this.backOperation();
        this.getLocation();
    }

    //获取当前位置
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(location => {
                if (location.coords.longitude && location.coords.latitude) {
                    this.hasLocation = true;
                    this.props.dispatch(getCityName({
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude
                    }));
                }
                else {
                    this.hasLocation = false;
                }
            }, error => {
                this.hasLocation = false;
            });
        }
        else {
            this.hasLocation = false;
        }
    }

    getAllowDate() {
        var date = new Date();
        date.setFullYear(date.getFullYear() - 5);
        date.setDate(date.getDate() + 20);
        return date;
    }


    //获取当前选中的车辆
    getCurrentCar(index) {
        if (this.props.carList.cars[index]) {
            //滑动到新增车辆是，this.props.currentCarIndex并不会改变，所以滑动到新增车辆时currentCarIndex并不与控件的实际相对应，停留在上一个值，
            // 导致新增车辆后this.props.currentCarIndex和index的值相同，无法引发组件刷新，此处强制修改值为0，再赋值回去，即可引发刷新
            if (this.props.currentCarIndex == index && index == 0) {
                this.props.dispatch(currentCarIndex(1))
            }
            this.props.dispatch(currentCarIndex(index));
            setTimeout(() => {
                this.setState({
                    emptyCurrent: false
                });
            }, 0)
        }
        else if (index == this.props.carList.cars.length) {
            setTimeout(() => {
                this.setState({
                    emptyCurrent: true
                });
            }, 0)
        }
        setTimeout(() => {
            //切换时动态修改底部文字
            this.getButtonText();
        }, 0);
    }


    //弹出确认页
    showCurrentopup(carId,carNumber, tipsMessage, state) {
        let goToCalculator = state == -1;
        let props = {
            carNum: carNumber,
            tipsMessage: tipsMessage,
            buttonText: goToCalculator ? '补充车辆信息' : '我已知晓',
            go: () => {
                if (goToCalculator) {
                    this.context.router.push(`/updateCarInfo/${carNumber}/${carId}`);
                }
                Popup.hide(); //隐藏
            }
        };
        Popup.show(<FooterAlert {...props} />, {animationType: 'slide-up'});
    }

    //过线检文案提示
    showOverLineMeansure(carNumber, tipsMessage, url) {
        let props = {
            carNum: carNumber,
            tipsMessage: tipsMessage,
            buttonText: '前往办理',
            go: () => {
                this.context.router.push(url);
                Popup.hide(); //隐藏
            }
        };
        Popup.show(<FooterAlert {...props} />, {animationType: 'slide-up'});
    }


    /**
     * 显示
     * @param carNum 车牌号码
     * @param num 天数
     */
    //弹出详细信息
    //isNew:标识当前车辆是否为新增加的车辆
    showPopup() {
        /*let current = this.props.carList.cars[this.props.currentCarIndex];
         if (current.state != 0) {
         this.showCurrentopup(current)
         }
         else {
         this.showMeansure(current);
         }*/
        //逻辑改变，仅当车辆状态不确实时才弹框确认，其余直接判断后跳转
        /*let current = this.props.carList.cars[this.props.currentCarIndex];
         if (this.props.carList.cars[this.props.currentCarIndex].state == -1) {
         this.showCurrentopup(current)
         }
         else {*/
        //逻辑再次改变，修改为验证能否办理之后再确定是否弹窗
        this.goToComfirmOrder();
        /*}*/
    }

    //缓存新车号码
    cacheNewCarNumber(value) {
        this.setState({
            newCarNumberCache: this.state.carPrefix + value
        });
    }

    //增加车牌
    addCar(callBack) {
        var newCarNummber = this.state.newCarNumberCache;
        this.props.dispatch(addCar({carNumber: newCarNummber}, () => {
            this.props.dispatch(getCarList({}, () => {
                for (let i = 0; i < this.props.carList.cars.length; i++) {
                    if (this.props.carList.cars[i].carNumber == newCarNummber) {
                        //添加车辆后默认选中该车辆
                        this.getCurrentCar(i);
                    }
                }
                //此处用于更新当前选中车辆后再弹出窗口
                callBack();
            }));
        }))
    }


    //立即办理
    doItNow() {
        //新增车辆
        if (this.state.emptyCurrent) {
            var inputValue = this.state.newCarNumberCache.substr(1, this.state.newCarNumberCache.length - 1);
            if (inputValue == '') {
                Toast.info("请输入车牌号码！", 1);
                return;
            }
            var pattern = /^[A-Za-z][A-Za-z0-9港澳]{5,6}$/;
            if (!pattern.test(inputValue)) {
                Toast.info("请输入正确的车牌号码", 1);
                return;
            }
            this.setState({
                newCarNumberCache: this.state.newCarNumberCache.toUpperCase()
            });
            this.addCar(() => {
                //清空车辆缓存，防止下次误调
                this.setState({
                    newCarNumberCache: ''
                });
                this.showPopup();
            });
        }
        //正常套路
        else if (this.props.carList.cars[this.props.currentCarIndex].bizFlag != 3) {
            this.showPopup();
        }

    }


    scrollHtml() {
        window.scrollTo(0, 150);
    }


    getName(name) {//用户修改车牌前缀后保存车牌前缀
        if (name == 1) {
            this.setState({
                show: true,
            })
        } else if (name) {
            this.setState({
                show: false,
                carPrefix: name,
            })
        } else if (!name) {
            this.setState({
                show: false,
            })
        }
    }

    //点击车辆信息卡
    carNumberItemClick() {
        var current = this.props.carList.cars[this.props.currentCarIndex];
        let currentState = current.state;
        if (currentState == 0 || currentState == 5) {
            let option = {
                carNumber: current.carNumber,
                carId: current.carId,
                registerDate: current.registerDate,
                nextDate: current.nextDate,
                state: currentState,
                days: current.days,
                buttonClick: () => {
                    ReModal.close();
                }
            };
            ReModal.showComponent(<MessageContent {...option}/>)
        }
        else {
            this.doItNow();
        }
    }

    //构建走马灯
    structSlider() {
        var domList = [];
        var thar = this;
        if (this.props.carList) {
            /* return this.props.carList.cars.map((item,i)=>{
             return <CarNumberItem key={"CarNumberItem"+i} state={item.state} days={item.days} carNumber={item.carNumber} remainingTime="18" onClick={()=>{this.showPopup()}}/>
             })*/
            for (let i = 0; i < this.props.carList.cars.length; i++) {
                let item = this.props.carList.cars[i];
                domList.push(<CarNumberItem key={item.carId} state={item.state} days={item.days}
                                            carNumber={item.carNumber} carId={item.carId} remainingTime="18" onClick={(e) => {
                    this.carNumberItemClick();
                }}/>);
            }
        }
        //小于三辆车才显示新增车辆
        if (this.props.carList.cars.length < 3) {
            domList.push(<EmptyCarNumberItem onClick={this.scrollHtml}
                                             carPrefix={thar.state.carPrefix}
                                             show={this.state.show}
                                             getName={this.getName}
                                             key={"CarNumberItem" + this.props.carList.cars.length} onBlur={(value) => {
                this.cacheNewCarNumber(value)
            }}/>);
        }
        return domList;
    }

    //检查车辆是否支持年检代办
    checkInspection(callBack) {
        this.props.dispatch(checkInspection({
            carNumber: this.props.carList.cars[this.props.currentCarIndex].carNumber,
            carId: this.props.carList.cars[this.props.currentCarIndex].carId
        }, (result) => {
            callBack(result);
        }))
    }

    //弹出定位提示
    showMeansure(continueCallBack) {
        let attrs = {
            city: this.props.position,
            cancel: () => {
                Popup.hide();
            },
            continue: () => {
                Popup.hide();
                continueCallBack();
            }
        };
        Popup.show(<MeansureAgain {...attrs}/>, {animationType: 'slide-up'});
    }

    //去往订单确认页
    goToComfirmOrder() {
        this.checkInspection((result) => {
            var currentCar = this.props.carList.cars[this.props.currentCarIndex];
            //状态为6表示已下单，点击直接跳转到年检手续确认页
            if (currentCar.state == 6) {
                this.props.dispatch(getViewUri({orderId: this.props.carList.cars[this.props.currentCarIndex].orderId}, (url) => {
                    this.context.router.push('/' + url);
                }));
            }
            else if (result.bizFlag == '1' || result.bizFlag == '2') {
                //粤牌车检测到过线检时弹框提示
                if (result.bizFlag == '2' && currentCar.carNumber.indexOf('粤') >= 0 && result.msg) {

                    ReModal.confirm(result.msg,()=>{
                        this.context.router.push(`/confirmOrder/${currentCar.carId}/${encodeURIComponent(currentCar.carNumber)}/${result.bizFlag}`);
                    },()=>{
                    },{okText:'前往办理'});
                    return;
                }

                //7,9,10,10这几种状态监测到定位不在广州时弹出二次确认框
                if (this.hasLocation && this.props.position && this.props.position.indexOf('广州') < 0 && (result.state == 7 || result.state == 9 || result.state == 10 || result.state == 11)) {
                    this.showMeansure(() => {
                        this.context.router.push(`/confirmOrder/${currentCar.carId}/${encodeURIComponent(currentCar.carNumber)}/${result.bizFlag}`);
                    });
                }
                else {
                    //正常套路
                    this.context.router.push(`/confirmOrder/${currentCar.carId}/${encodeURIComponent(currentCar.carNumber)}/${result.bizFlag}`);
                }
            }
            else {
                //验证不通过时弹窗
               // this.showCurrentopup(currentCar.carId,currentCar.carNumber, result.msg, result.state);

                if(result.state==0){
                    //未进入年检周期时做特殊弹窗处理
                    if(result.registerDate&&result.checkDate){
                        ReModal.showOnlyComponent(<NotYetTips registerDate={result.registerDate} expiryDate={result.checkDate} close={()=>{
                            ReModal.close();
                        }} updateCallback={()=>{
                            ReModal.close();
                            this.props.dispatch(updateMessage({
                                carId: currentCar.carId,
                                carNumber: currentCar.carNumber,
                                registerDate: result.registerDate,},()=>{
                                this.props.dispatch(getCarList({}));
                            }));
                        }}/>);
                    }
                    else{
                        ReModal.confirm(result.msg,()=>{
                            this.context.router.push(`/updateCarInfo/${currentCar.carNumber}/${currentCar.carId}`);
                        },()=>{
                        },{okText:'重新计算'})
                    }
                }
                else if(result.state==-1){
                    ReModal.alert(result.msg,()=>{
                        this.context.router.push(`/updateCarInfo/${currentCar.carNumber}/${currentCar.carId}`);
                    },{okText:'补充车辆信息'})
                }
                else{
                    ReModal.alert(result.msg,()=>{
                    },{okText:'我已知晓'});
                }
            }
        })
    }

    //根据后端的数据更改按钮显示
    getMainButtonClass() {
        return this.state.emptyCurrent || (this.props.carList.cars.length > 0 && this.props.carList.cars[this.props.currentCarIndex].bizFlag != 3) ? '' : style.unableButton
    }


    //获取省份列表
    getProvinces() {
        let getData = {
            cityName: userHelper.getUserIdAndToken().city || '',
            longitude: userHelper.getUserIdAndToken().lng || '',
            latitude: userHelper.getUserIdAndToken().lat || '',
            // userType:'APP',
            // visitChannel: 'APP',
        };

        this.props.dispatch(carPrefix(getData, (res) => {
            let data = res.data.provinceList;
            this.setState({
                list: data, //前缀列表
                carPrefix: data[0].provinceName, //默认前缀
            })
        }));
    }


    homeInit() {
        //首页隐藏标题栏右键
        AlipayJSOperation.setRightButtonStatus(false);
        AlipayJSOperation.setTitle('办理年检');
        //设置标题颜色
        /*AlipayJSOperation.setBarColor('#4D75FF');*/
        /*AlipayJSOperation.setLeftButtonStatus(this.closeAll);*/
        document.querySelector("title").innerHTML = "办理年检";
        //数据源保留上次离开状态
        this.props.dispatch(currentCarIndex(this.props.currentCarIndex));
        this.props.dispatch(getCarList({}, () => {
            this.getProvinces();
            this.getButtonText();
        }));
        this.props.dispatch(getSliderTips({positionCode:'sy'},(result)=>{
            this.setState({
                sliderTipsText:result.title,
            });
        }));
    }

    WeiXinConfig(config) {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: config.appId, // 必填，公众号的唯一标识
            timestamp: config.timestamp, // 必填，生成签名的时间戳
            nonceStr: config.nonceStr, // 必填，生成签名的随机串
            signature: config.signature,// 必填，签名，见附录1
            jsApiList: ['hideOptionMenu', 'closeWindow'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }

    //微信屏蔽分享功能
    WeXinOperation() {
        if (typeOfBrowser.getChannelOfBrowser() == 'weixin') {
            this.props.dispatch(getWeixinConfig({signUrl: location.href}, (result) => {
                this.WeiXinConfig(result);
                //切换页面时再次触发微信配置
                window.addEventListener('hashchange', (e) => {
                    this.WeiXinConfig(result);
                }, false);
            }))
        }
    }

    /*
     backOperation() {
     if (location.host.indexOf('localhost') < 0) {
     var parameters = urlOperation.getParameters();

     if (!parameters.userId && !parameters.token) {
     if (parameters.orderId) {
     history.back();
     return;
     }
     history.back();
     wx.ready(() => {
     wx.closeWindow();
     });
     }
     }
     }*/


        componentDidMount() {
        //阿里城市服务url默认不传参数，直接赋值alipay_city
        /*let detailUserType = urlOperation.getParameters().detailUserType ? urlOperation.getParameters().detailUserType : 'alipay_city';
         localStorage.setItem('detailUserType', detailUserType);*/

        /*if (detailUserType == 'alipay_city' || detailUserType == 'qq_city'|| detailUserType == 'alipay_carService') {
         this.props.dispatch(checkIfOrderPay({}, (orderId) => {
         if (orderId) {
         var href = window.location.href.split('?')[0].replace('#/', '');
         window.location.replace(`${href}#/orderDetails/?OutTradeNo=${orderId}`);
         }
         else {
         this.homeInit();
         }
         }))
         }
         else {*/
        this.homeInit();
        // }

    }

    //离开首页时缓存变量方便其他页面调用
    componentWillUnmount() {
        //当前绑定的事件仅限首页使用，卸载时解绑
        AlipayJSOperation.removeLeftButtonEvent();
        //缓存变量供其他页面使用
        if (this.props.carList.cars.length > 0 && !this.state.emptyCurrent) {
            var currentCar = this.props.carList.cars[this.props.currentCarIndex];
            this.props.dispatch(homePublicData({
                carNumber: currentCar.carNumber,
                days: currentCar.days,
                carCode: currentCar.carCode,
                engineNumber: currentCar.engineNumber,
                carId: currentCar.carId
            }));
        }
    }


    //跳转到办理流程详情页
    goToProcessDetail() {
        this.context.router.push('/processDetail');
    }

    //上拉跳转
    /*   goToProcessDetailBySlider(callBack) {
     setTimeout(() => {
     }, 500)
     this.context.router.push('/processDetail');
     window.cxytj.recordUserBehavior({
     eventId: 'insepection_processdetail_slider',
     eventType: '2', //事件类型
     eventTime: '',  //触发时间
     });
     callBack();
     }*/

    //动态改变底部按钮文字
    getButtonText() {
        //状态为6时车辆已办理过
        if (!this.state.emptyCurrent && this.props.carList && this.props.carList.cars.length > 0 && this.props.carList.cars[this.props.currentCarIndex].state == '6') {
            this.setState({
                buttonText: this.props.carList.cars[this.props.currentCarIndex].msg
            })
        }
        else {
            this.setState({
                buttonText: '立即办理'
            })
        }
    }


    render() {
        //定义办理流程数据源
        let processData = {
            title: '办理流程',
            content: [
                {
                    imgUrl: './images/pic_A.png',
                    text: '准备资料'
                },
                {
                    imgUrl: './images/pic_B.png',
                    text: '寄送资料'
                },
                {
                    imgUrl: './images/pic_C.png',
                    text: '年审办理'
                },
                {
                    imgUrl: './images/pic_D.png',
                    text: '办理完成'
                },
            ]
        };
        let Decorators = [{
            component: () => <div></div>,
            position: 'CenterLeft',
            style: {
                display: 'none'
            }
        }, {
            component: () => <div></div>,
            position: 'CenterLeft',
            style: {
                display: 'none'
            }
        }, {
            component: () => <SliderBottom all={this.props.carList.cars.length}
                                           current={this.props.currentCarIndex}></SliderBottom>,
            position: 'BottomCenter',
            style: {
                bottom: '-20px'
            }
        }];
        let {state, carNumber, days}=this.props.carList.cars[this.props.currentCarIndex] ? this.props.carList.cars[this.props.currentCarIndex] : {};
        return (
            <div className={style.outerContainer}>
                <PageBar title="办理年检" isHome={true}/>
                {this.state.emptyCurrent == false && this.props.carList.cars[this.props.currentCarIndex] ?
                    <HomeTips carNumber={carNumber} days={days} state={state}/> : ''}
                <div className={style.homeContainer}>
                    {/*头部开始*/}
                    <HomePageHeader />
                    {/* 头部结束*/}
                    <TipsBar text={this.state.sliderTipsText}/>
                    <article className={style.condition}>
                        <h1>免检办理条件<span className={style.tips}>（不满足条件车辆需上线检测）</span></h1>
                        <p>1、7座以下（不含7座）的蓝牌车，即普通家用小轿车；</p>
                        <p>{'2、' + this.state.allowDate.getFullYear() + '年' + (this.state.allowDate.getMonth() + 1) + '月' + this.state.allowDate.getDate() + '日后购买的车辆；'}</p>
                        <p>3、免检期内未发生过致人伤亡事故的车辆</p>
                    </article>
                    <div className={style.sliderContainer}>
                        <div className={style.carouselContainer}>
                            <Carousel slideIndex={this.props.currentCarIndex} className="my-carousel"
                                      afterSlide={index => {
                                          this.getCurrentCar(index)
                                      }} decorators={Decorators}>
                                {this.structSlider()}

                            </Carousel>
                        </div>
                    </div>
                    <div className={style.processContainer}>
                        {/*<ProcessImageList data={processData}></ProcessImageList>*/}
                        <div className={style.processTitle}>办理流程</div>
                        <div className={style.processPic}>
                            <img src="./images/pic_process.png"/>
                        </div>
                        <div className={style.processText}>
                            <div>添加车辆</div>
                            <div>智能匹配</div>
                            <div>一键下单</div>

                            <div>极速代办</div>
                        </div>
                        <div className={style.sliderMessage}><img src="./images/icon_up.png"/>
                            <div>查看详细办理流程</div>
                        </div>
                    </div>
                    <div className={style.about}>
                        <div><img src="./images/logo.png"/></div>
                        <div className={style.aboutText}>此服务由车行易提供</div>
                        <div className={style.aboutText}>020-62936789</div>
                    </div>
                </div>

                {/*</ScrollContainer>*/}
                <div className={style.buttonDiv}>
                    <ButtonWithCxytj  onClick={() => {
                        this.doItNow()
                    }} className={this.getMainButtonClass()}>{this.state.buttonText}</ButtonWithCxytj>
                    <CarPrefixList
                        getName={this.getName}
                        show={this.state.show}
                        list={this.state.list}
                    />

                </div>
            </div>
        )
    }
}

//使用context
Home.contextTypes = {
    router: React.PropTypes.object.isRequired
};

Home.defaultProps = {
    carPrefix: '京',
    carList: {
        cars: []
    }
};


function mapStateToProps(state) {
    return Object.assign({}, state.homeInfo);
}

export default connect(mapStateToProps)(Home)
