/**
 * Created by 小敏哥 on 2017/3/27.
 * 
* karin 添加：setTransparentTitle， on 2017/5/4.
 */
class AlipayJSOperation {
	constructor() {
		//支付宝环境是否准备就绪
		this.aliReady = window.AlipayJSBridge ? true : false;
	}


	//统一兼容方法
	readyAndCall(operation) {
		if (this.aliReady) {
			operation();
		}
		else {
			document.addEventListener('AlipayJSBridgeReady', operation, false);
		}
	}

	//关闭整个页面
	closeView() {
		this.readyAndCall(() => {
			AlipayJSBridge.call('popWindow');
		})
	}

	// 设置标题颜色
	setBarColor(color) {
		this.readyAndCall(() => {
			//支付宝需要先将颜色转化为十进制
			let colorValue = parseInt(color.replace('#', ''), 16);
			AlipayJSBridge.call("setTitleColor", {
				color: colorValue,
				reset: false //(可选,默认为false)  是否重置title颜色为默认颜色。&nbsp;
			});
		});
	}

	//设置图标按钮
	setMenuAsIconButton(imgSrc) {
		this.readyAndCall(() => {
			AlipayJSBridge.call('setOptionMenu', {
				icon: imgSrc,
				redDot: '-1', // -1表示不显示，0表示显示红点，1-99表示在红点上显示的数字
			});
		});
	}

	//设置右侧按钮回调事件（单按钮）
	//此处增加防止事件重复绑定的产生的bug
	setMenuButtonEvent(callBack) {
		this.readyAndCall(() => {
			if (AlipayJSOperation.listener != null) {
				//首先解绑函数，避免事件多次绑定导致多次执行
				document.removeEventListener('optionMenu', AlipayJSOperation.listener, false);
			}
			document.addEventListener('optionMenu', callBack, false);
			AlipayJSOperation.listener = callBack;
		});
	}

	///设置右侧按钮显示状态(true：显示，false：隐藏)
	setRightButtonStatus(show) {
		this.readyAndCall(() => {
			show ? AlipayJSBridge.call('showOptionMenu') : AlipayJSBridge.call('hideOptionMenu');
		});
	}

	//设置标题
	setTitle(text) {
		this.readyAndCall(() => {
			AlipayJSBridge.call('setTitle', {
				title: text,
			});
		});
	}

	//设置标题背景不透明
	setTransparentTitle(text) {
		this.readyAndCall(() => {
			AlipayJSBridge.call('setTransparentTitle', {
				transparentTitle: text
			}, function () { });
		});
	}
	//点击左箭头 返回按钮触发的事件
	setLeftButtonStatus(callBack) {
		this.readyAndCall(() => {
			//首先解绑函数，避免事件多次绑定导致多次执行
			this.removeLeftButtonEvent();
			document.addEventListener('back', callBack, false);
			AlipayJSOperation.setNer = callBack;
		});
	}

	//解绑当前绑定事件
	removeLeftButtonEvent() {
		if (AlipayJSOperation.setNer != null) {
			document.removeEventListener('back', AlipayJSOperation.setNer, false);
		}
	}
}
AlipayJSOperation.listener = null;
AlipayJSOperation.setNer = null;

export default new AlipayJSOperation();