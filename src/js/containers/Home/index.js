import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import style from './index.scss';
import Carousel from 'nuka-carousel';
import SliderBottom from '../../components/Home/sliderBottom'
import IconMenu from '../../components/Home/iconMenu';
import ActivityItem from '../../components/Home/activityItem';
import ProductItem from '../../components/Home/productItem';
import BottomMenu from '../../components/share/bottomMenu';
import {
    getInitData,
    getActivityData,
    getTypeOfLession,
    getProductList,
    userSign,
    getUserInfo,
    scrollPosition
} from '../../actions/homeAction'
import {shareCallBack} from '../../actions/weixinAction'
import cookiesOperation from '../../utils/cookiesOperation';
import config from '../../config';
// import ReModal from '../../components/common/reModal';

/*import LeVedio from '../../components/leVedio';*/
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recommendCurrent: 0,
            lessionTypesCurrent: 0,
            showSignButton: true,
            allTypeShow:false
        };
        // this.checkAndDoWeixinOperation();
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


    //构建头部跑马灯
    structHeaderSlider() {
        return this.props.initData ? this.props.initData.recommend.map((item, index) => {
            return <img key={item.objId} src={config.imgPublicPath + item.pic} onClick={() => {
                this.toDetail(item.type, item.objId)
            }}/>
        }) : <img/>;
    }

    //构建活动滑动模块
    structActivitySlider() {
        return this.props.activityList.map((item) => {
            return <ActivityItem key={item.activeId} imgUrl={config.imgPublicPath + item.pic} title={item.activeName}
                                 time={`${item.activeStartTime}至${item.activeEndTime}`}
                                 address={item.addr} onClick={() => {
                this.toDetail('ACTIVE', item.activeId)
            }}></ActivityItem>
        })
    }

    //构造商品类型列表
    // structLessonSlider() {
    //     return this.props.lessionTypes.map((item) => {
    //         return <div className={style.lessonItem} key={item.catalogId} onClick={() => {
    //             this.context.router.push(`productList?productType=${item.catalogId}`)
    //         }}>
    //             <img src={config.imgPublicPath + item.indexPic}/>
    //             <div>{item.catalogName}</div>
    //         </div>
    //     })
    // }

    structLinksSlider() {
        return this.props.initData.friendLink.map((item, index) => {
            return <a href={item.url} key={index}><img src={config.imgPublicPath + item.pic}/></a>
        });
    }
    //构建商品类型
    structProductType(limit) {
        let lessionTypes = this.props.lessionTypes||[];
        if(limit) lessionTypes = lessionTypes.slice(0,6);
        // let lessionTypes = [{catalogName:"分类一",catalogId:"1"},{catalogName:"分类一分类一分类一分类一",catalogId:"2"},{catalogName:"分类一",catalogId:"3"},{catalogName:"分类一",id:"4"},{catalogName:"分类一",id:"5"},{catalogName:"分类一",id:"6"},{catalogName:"分类一",id:"7"},];
        return lessionTypes.map((item, index) => {
            return <div key={index} onClick={this.tabChange.bind(null,item.catalogId,index)} className={this.state.lessionTypesCurrent == index?style.tabTitleItemActive:style.tabTitleItem}>{item.catalogName}</div>
        })
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

    //检查初始化状态并执行微信sdk
    checkAndDoWeixinOperation() {
        if (sessionStorage.getItem('weixinConfigReady') == 'true') {
            this.weixinOperation();
        }
        else {
            document.addEventListener('weixinConfigReady', () => {
                this.weixinOperation();
            }, false)
        }
    }

    //操作微信sdk
    weixinOperation() {
        wx.ready(() => {
            let custId = cookiesOperation.getCookie('JY_CUST_ID');
            wx.onMenuShareTimeline({
                title: sessionStorage.getItem('shareTitle'), // 分享标题
                link: location.href + '?recommend=' + custId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'https://www.jingyizaixian.com/images/share/logo.jpg', // 分享图标
                success: () => {
        
                    this.props.dispatch(shareCallBack({
                        detailName: '静怡雅学文化',
                        shareObj: location.href,
                        type: 'INDEX'
                    }))
                },
                cancel: function () {
                }

            });

            wx.onMenuShareAppMessage({
                title: sessionStorage.getItem('shareTitle'), // 分享标题
                desc: sessionStorage.getItem('shareDesc'), // 分享描述
                link: location.href + '?recommend=' + custId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'https://www.jingyizaixian.com/images/share/logo.jpg', // 分享图标
                success: () => {
        
                    this.props.dispatch(shareCallBack({
                        detailName: '静怡雅学文化',
                        shareObj: location.href,
                        type: 'INDEX'
                    }))
                },
                cancel: function () {
                }

            });
        });
    }

    //初始化
    componentDidMount() {
        this.weixinOperation();
        this.props.dispatch(getInitData({}));
        this.props.dispatch(getActivityData({page: 1, size: 4}));
        // this.props.dispatch(getProductList({size: 5, sortType: 'HOT'}));
        this.props.dispatch(getTypeOfLession({size: 20},() => {
            let lessionTypes = this.props.lessionTypes;
            this.props.dispatch(getProductList({catalogId:lessionTypes[0].catalogId,size: 5, sortType: 'HOT'}));
        }));
        this.props.dispatch(getUserInfo({}));
        if (this.props.scrollPosition) {
            window.scrollTo(0, this.props.scrollPosition);
        }
        // ReModal.alert('已经没有了！');
        // alert("123");
    }

    componentWillUnmount(){
        this.props.dispatch(scrollPosition(document.documentElement.scrollTop));
    }

    userSign() {
        this.props.dispatch(userSign({signType: 0}, () => {
            this.setState({
                showSignButton: false
            })
        }));
    }
    renderTabTitle = () =>{
        let lessionTypes = this.props.lessionTypes||[];
        // let lessionTypes = [{catalogName:"分类一",catalogId:"1"},{catalogName:"分类一分类一分类一分类一",catalogId:"2"},{catalogName:"分类一",catalogId:"3"},{catalogName:"分类一",id:"4"},{catalogName:"分类一",id:"5"},{catalogName:"分类一",id:"6"},{catalogName:"分类一",id:"7"},];
        if (this.state.allTypeShow) {
            return  <div>
                        <div className={style.lessionTypeListAll}>
                            {this.structProductType()}
                        </div>
                        <div className={style.typeBtn} onClick={this.closeTypeShow}><img src="./images/home/close_menu.png"/><span>点击收起</span></div>
                    </div>
        }else{
            if (lessionTypes.length<=3) {
                return <div className={style.lessionTypeListAll}>
                    {this.structProductType()}
                </div>
            }else if (lessionTypes.length<=6) {
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
                {this.props.productList.length>=5?<div className={style.more} onClick={() => {
                    this.context.router.push('/productList')
                }}>查看更多
                </div>:""}
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
        // this.setState({
        //     lessionTypesCurrent:index
        // })
        if(index!=this.state.lessionTypesCurrent){
            this.props.dispatch(getProductList({catalogId:id,size: 5}));
            this.setState({
                lessionTypesCurrent:index
            })
        }
    }
    render() {
        //头部跑马灯底部小圆圈标记配置
        let headerSliderDecorators = [{
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
            component: () => <SliderBottom all={this.props.initData ? this.props.initData.recommend.length : 0}
                                           current={this.state.recommendCurrent}
                                           currentColor="#ffffff"></SliderBottom>,
            position: 'BottomCenter',
        }];
        //课程分类跑马灯底部小圆圈标记配置
        // let lessonSliderDecorators = [{
        //     component: () => <div></div>,
        //     position: 'CenterLeft',
        //     style: {
        //         display: 'none'
        //     }
        // }, {
        //     component: () => <div></div>,
        //     position: 'CenterLeft',
        //     style: {
        //         display: 'none'
        //     }
        // }, {
        //     component: () => <SliderBottom all={this.props.lessionTypes.length}
        //                                    current={this.state.lessionTypesCurrent}
        //                                    currentColor="#fc266d"></SliderBottom>,
        //     position: 'BottomCenter',
        //     style: {
        //         bottom: '-15px'
        //     }
        // }];
        //活动跑马灯底部小圆圈标记配置
        let activitySliderDecorators = [{
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
            component: () => <div></div>,
            position: 'BottomCenter',
            style: {
                display: 'none'
            }
        }];
        return <div className={style.container}>
            {this.props.initData ? <div className={style.headerContainer}>
                {!this.props.initData.isSign && this.state.showSignButton ?
                    <button className={style.signButton} onClick={() => {
                        this.userSign()
                    }}>签到</button> : ''}
                <Carousel wrapAround={true} autoplay={true} className="my-carousel" decorators={headerSliderDecorators}
                          afterSlide={index => {
                              this.setState({
                                  recommendCurrent: index,
                              })
                          }}>
                    {this.structHeaderSlider()}
                </Carousel>
            </div> : ''}
            {this.props.userInfo ? <IconMenu initData={this.props.initData}  userInfo={this.props.userInfo}/> : ''}
            {this.props.activityList && this.props.activityList.length > 0 ? <div className={style.activityContent}>
                <div className={style.title}>
                    <div></div>
                    <div>活动</div>
                </div>

                <div className={style.activitySliderContainer}>
                    <div className={style.activityCarouselContainer}>
                        <Carousel className="my-carousel" decorators={activitySliderDecorators} slidesToShow={2}>
                            {this.structActivitySlider()}
                        </Carousel>
                    </div>
                </div>
            </div> : ''}

            {/* {this.props.lessionTypes ? <div className={style.lessonContent}>
                <div className={style.lessonTitle}>
                    <div className={style.title}>
                        <div></div>
                        <div>课程分类</div>
                    </div>
                    <Link to={'/productType'}>更多</Link>
                </div>

                <div className={style.lessonSliderContainer}>
                    <Carousel className="my-carousel" decorators={lessonSliderDecorators} afterSlide={index => {
                        this.setState({
                            lessionTypesCurrent: index,
                        })
                    }}>
                        {this.structLessonSlider()}
                    </Carousel>
                </div>
            </div> : ''} */}
            <div className={style.tabContainer}>
                <div className={style.tabTitle}>
                    {this.renderTabTitle()}
                </div>
                <div className={style.tabContent}>
                    {this.renderContent()}
                </div>
            </div>
            {/* {this.props.productList ? 
            <div className={style.productsContent}>
                <div className={style.title}>
                    <div></div>
                    <div>课程</div>
                </div>
                {this.structProductList()}
                <div className={style.more} onClick={() => {
                    this.context.router.push('/productList')
                }}>查看更多
                </div>
            </div> : ''} */}

            {this.props.initData ? <div className={style.links}>
                <div className={style.title}>
                    <div></div>
                    <div>友情链接</div>
                </div>
                <div className={style.linksContent}>
                    <Carousel className="my-carousel" decorators={activitySliderDecorators} slidesToShow={3}>
                        {this.structLinksSlider()}
                    </Carousel>
                </div>
            </div> : ''}

            <div className={style.aboutUs}>
                <div className={style.aboutItem}>
                    <img src="./images/home/jianjie.png"/>
                    <div><Link to={'/about?type=aboutUs'}>静怡简介</Link></div>
                </div>
                <div className={style.aboutItem}>
                    <img src="./images/home/lianxiwoemn.png"/>
                    <div><Link to={'/about?type=callUs'}>联系我们</Link></div>
                </div>
            </div>
            <BottomMenu active={0}/>
        </div>
    }
}


//使用context
Home.contextTypes = {
    router: React.PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return Object.assign({}, state.homeInfo);
}

export default connect(mapStateToProps)(Home)