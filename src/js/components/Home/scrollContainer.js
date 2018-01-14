/**
 * Created by 小敏哥 on 2017/4/9.
 */
import React, {Component} from 'react';
import style from './scrollContainer.scss';
class ScrollContainer extends Component {
    constructor(props) {
        super(props);
        //是否拖动状态
        this.isDrag = false;
        //触摸点是否已经初始化
        this.inited = false;
        //拖动目标坐标
        this.targetY = 0;
        //触摸点坐标;
        this.touchMoveY = 0;
        this.state = {
            targetTop: 0,
            bottomText: this.props.bottomText ? this.props.bottomText.before : '',//底部上拉提示文字
            topText: this.props.topText ? this.props.topText.before : '',//顶部下拉提示文字
            height: this.props.height
        };
        /*绑定当前上下文*/
        this.startTouch = this.startTouch.bind(this);
        this.moveTouch = this.moveTouch.bind(this);
        this.endTouch = this.endTouch.bind(this);
        this.topReleaseEvent = this.topReleaseEvent.bind(this);
        this.checkFocus = this.checkFocus.bind(this);
        this.checkBlur = this.checkBlur.bind(this);
    }

    static propTypes = {
        width: React.PropTypes.string.isRequired,//容器宽度，可以为任意合法单位，需要传入单位
        height: React.PropTypes.string.isRequired,//容器高度，支持除百分比之外的其他单位，需要传入单位
        maxMove: React.PropTypes.number,//设置到达临界点的距离，到达临界点之后下拉或者上拉会变慢，无需传入参数，默认为px
        noScaleTop: React.PropTypes.bool,//设置是容器否允许下拉，默认为true，允许下拉刷新之类的操作
        noScaleBottom: React.PropTypes.bool,//设置容器是否允许上拉，默认为true
        topText: React.PropTypes.object,//设置下拉之后的显示文字，包括before，middle,after三个字段，分别表达开始，到达临界点，执行完回调之后的提示文字,例如{ before: "上拉查看详情", middle: "释放查看详情", after: "正在跳转" }
        bottomText: React.PropTypes.object,//设置上拉之后的显示文字，包括before，middle,after三个字段，分别表达开始，到达临界点，执行完回调之后的提示文字,例如{ before: "上拉查看详情", middle: "释放查看详情", after: "正在跳转" }
        bottomReleaseEvent: React.PropTypes.func,//设置上拉到达临界点之后释放手指之后的回调函数，此函数有一个入参函数，执行完回调函数之后需要回调这个函数通知控件执行已完成
        topReleaseEvent: React.PropTypes.func,//设置上拉到达临界点之后释放手指之后的回调函数，此函数有一个入参函数，执行完回调函数之后需要回调这个函数通知控件执行已完成
        background:React.PropTypes.string,//设置下拉后显示的背景，默认为#F1F1F1
    };


    //点击开始
    startTouch(e) {
        //主动失去焦点
        var result = this.looseBlurWhileMoving();
        //如果此处执行失去焦点的操作，则不做初始化，在touchmove里面检测后再初始化主要是为了防止键盘回弹之后点击点获取有问题
        if (!result) {
            this.setState({
                bottomText: this.props.bottomText ? this.props.bottomText.before : '',
                topText: this.props.topText ? this.props.topText.before : ''
            });
            this.isDrag = true;
            this.targetY = parseInt(this.refs.scrollContent.offsetTop + 0);
            this.touchMoveY = e.touches[0].pageY;
            this.inited = true;
        }
        //失去焦点后输入法消失，导致页面下坠，此时的触摸点不正确
        else {
            this.isDrag = true;
            this.inited = false;
        }
    }

    //手指滑动
    moveTouch(e) {
        //e.preventDefault();
        if (this.isDrag && this.inited) {
            //此处用于兼容部分浏览器向上滑动到尽头离开屏幕没有触发touchend事件
            if(e.touches[0].pageY<=0){
                this.endTouch(e);
                return;
            }
            //设置拉动到顶点或底部时最大再拉动多长距离会缓速拉动
            let maxMove = this.props.maxMove ? this.props.maxMove : 30;
            let parentHeight = this.refs.scrollContainer.offsetHeight;
            let height = this.refs.scrollContent.offsetHeight;
            //拉动距离
            let move = e.touches[0].pageY - this.touchMoveY;

            e.preventDefault();
            if (this.props.noScaleTop && this.targetY + move > 0) {
                this.setState({
                    targetTop: 0
                });
                return;
            }
            if (this.props.noScaleBottom && move < 0 && this.refs.scrollContent.offsetTop <= parentHeight - height) {
                this.setState({
                    targetTop: parentHeight - height
                });
                return;
            }
            //顶点设置缓速
            move = this.targetY + move > maxMove ? maxMove + move / 10 : move;
            //底端设置缓速
            move = this.targetY + move < parentHeight - height - maxMove ? ((parentHeight - height - maxMove - this.targetY) + move / 10) : move;
            //下拉到尽头改变描述文字
            if (this.targetY + move > maxMove) {
                this.setState({
                    topText: this.props.topText ? this.props.topText.middle : ''
                })
            }
            else {
                this.setState({
                    topText: this.props.topText ? this.props.topText.before : ''
                })
            }
            //上拉到尽头改变描述文字
            if (this.targetY + move < parentHeight - height - maxMove) {
                this.setState({
                    bottomText: this.props.bottomText ? this.props.bottomText.middle : ''
                })
            }
            else {
                this.setState({
                    bottomText: this.props.bottomText ? this.props.bottomText.before : ''
                })
            }
            let length = this.targetY + move;
            this.setState({
                targetTop: length
            });
        }
        //在第一个滑动触摸点重新初始化
        else if (this.isDrag) {
            e.preventDefault();
            this.setState({
                bottomText: this.props.bottomText ? this.props.bottomText.before : '',
                topText: this.props.topText ? this.props.topText.before : '',
                targetTop: 0
            });
            this.targetY = parseInt(this.refs.scrollContent.offsetTop + 0);
            this.touchMoveY = e.touches[0].pageY;
            this.inited = true;
        }
    }


    //点击结束
    endTouch(e) {
        let parentHeight = this.refs.scrollContainer.offsetHeight;
        let height = this.refs.scrollContent.offsetHeight;
        if (this.refs.scrollContent.offsetTop < parentHeight - height && this.refs.scrollContent.offsetTop > parentHeight - height - this.props.maxMove) {
            //未达到临界点直接缩回
            this.setState({
                targetTop: parentHeight - height
            });
        }
        else if (this.refs.scrollContent.offsetTop <= parentHeight - height - this.props.maxMove) {
            //达到临界点不完全缩回，显示文字
            this.setState({
                targetTop: parentHeight - height - this.props.maxMove
            });
            //触发释放事件
            this.bottomReleaseEvent();
        }
        if (this.refs.scrollContent.offsetTop > 0 && this.refs.scrollContent.offsetTop < this.props.maxMove) {
            //未达到临界点直接缩回
            this.setState({
                targetTop: 0
            });
        }
        else if (this.refs.scrollContent.offsetTop >= this.props.maxMove) {
            //达到临界点不完全缩回，显示文字
            this.setState({
                targetTop: this.props.maxMove
            });
            this.topReleaseEvent();
        }
        //离开手指后改变状态
        this.isDrag = false;
    }

    //上拉释放事件
    bottomReleaseEvent() {
        let parentHeight = this.refs.scrollContainer.offsetHeight;
        let height = this.refs.scrollContent.offsetHeight;
        var hasEvent = typeof (this.props.bottomReleaseEvent) != 'undefined';
        if (hasEvent) {
            this.setState({
                bottomText: this.props.bottomText ? this.props.bottomText.after : ''
            });
            this.props.bottomReleaseEvent(() => {
                //事件结束后弹回原位
                this.setState({
                    targetTop: parentHeight - height
                });
            });
        }
        else {
            this.setState({
                targetTop: parentHeight - height
            });
        }
    }

    //下拉释放事件
    topReleaseEvent() {
        var hasEvent = typeof (this.props.topReleaseEvent) != 'undefined';
        if (hasEvent) {
            this.setState({
                topText: this.props.topText ? this.props.topText.after : ''
            });
            this.props.topReleaseEvent(
                () => {
                    //事件结束后弹回原位
                    this.setState({
                        targetTop: 0
                    })
                }
            );
        }
        else {
            this.setState({
                targetTop: 0
            })
        }
    }

    //控件内是否有输入组件为focus状态，如为focus状态拉动时直接回弹
/*    hasFocus() {
        return this.refs.scrollContainer.contains(document.activeElement) && document.activeElement.tagName.toUpperCase() == 'INPUT'
    }*/


    //兼容性操作，键盘弹起时将overflow设置为visible，防止键盘使页面变形
    checkFocus(e) {
        if (e.target.value != undefined) {
            this.refs.scrollContainer.style.overflow = "visible"
        }
    }

    //兼容性操作，失去焦点时恢复原状
    checkBlur(e) {
        if (e.target.value != undefined) {
            this.refs.scrollContainer.style.overflow = "scroll";
        }
    }

    //兼容性操作，针对safari，滚动时主动失去焦点，防止输入法让页面变形,同时防止用户主动取消输入法时style.overflow 没有设置为"scroll"
    looseBlurWhileMoving() {
        if (this.refs.scrollContainer.contains(document.activeElement)) {
            document.activeElement.blur();
            return true;
        }
        return false;
    }

    render() {
        let containerStyle = {
            width: this.props.width,
            height: this.state.height
        };
        //动态设置背景
        if(this.props.background){
            containerStyle.background=this.props.background;
        }
        let contentStyle = {
            top: this.state.targetTop + 'px',
            left: '0px',
            minHeight: this.props.height
        };
        return <div className={style.scrollContainer} onFocus={this.checkFocus} onBlur={this.checkBlur}
                    style={containerStyle} ref="scrollContainer">
            <div className={style.topText}>{this.state.topText}</div>
            <div className={style.scrollContent} style={contentStyle} ref="scrollContent" onTouchStart={this.startTouch}
                 onTouchMove={this.moveTouch} onTouchEnd={this.endTouch}>
                {this.props.children}
            </div>
            <div className={style.bottomText}>{this.state.bottomText}</div>
        </div>
    }
}
export default ScrollContainer