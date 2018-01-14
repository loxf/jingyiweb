/**
 * Created by 小敏哥 on 2017/4/21.
 */
import React, {Component} from 'react';
import jsApi from '../../utils/cx580.jsApi';
import style from './pageBar.scss';
class PageBar extends Component {
    constructor(props) {
        super(props);
        //由app调用
       /* window.cxyControlTitleLayout = function () {
            jsApi.call({
                "commandId": "",
                "command": "controlTitleLayout",
                "data": {
                    "showStatus": "hide",
                }
            }, (data) => {
            });
        };*/
        //返回webview时关闭原生导航栏
        window.cxyPageResume = function () {
            if(props.appPageResume){
                props.appPageResume();
            }
            else{
                    jsApi.call({
                        "commandId": "",
                        "command": "controlTitleLayout",
                        "data": {
                            "showStatus": "hide",
                        }
                    }, (data) => {
                    });
            }
        }
    }


    static propTypes = {
        back: React.PropTypes.func,//自定义后退方法
        title: React.PropTypes.string,//标题
        isHome: React.PropTypes.bool,//是否首页，点击直接关闭webview
        appPageResume:React.PropTypes.func//app从其他地方跳转到当前页面时的自定义方法，可选
    };


    componentDidMount() {
        if (navigator.userAgent.indexOf("appname_cxycwz") > -1) {
            setTimeout(() => {
                jsApi.call({
                    "commandId": "",
                    "command": "controlTitleLayout",
                    "data": {
                        "showStatus": "hide",
                    }
                }, (data) => {
                });
            }, 200)
        }
    }



    //返回
    goBack() {
        if (this.props.back) {
            this.props.back();
        }
        else {
            if (this.props.isHome) {
                jsApi.call(
                    {
                        "commandId": "",
                        "command": "close"
                    });
            }
            else {
                //为了使history.length靠谱，必须推入一个空栈
                history.pushState({}, '', '');
                if(history.length>=3){
                    history.go(-2);
                }
                else{
                    //当前没有可后退页面时直接关闭
                    jsApi.call(
                        {
                            "commandId": "",
                            "command": "close"
                        });
                }
            }
        }
    }

    render() {
        return navigator.userAgent.indexOf("appname_cxycwz") > -1 ? <div className={style.container}>
                <div className={style.pageBar}>
                    <button onClick={() => {
                        this.goBack();
                    }} className={style.pageButton}><img src="./images/back.png"/></button>
                    <div>{this.props.title}</div>
                </div>
            </div> : <div></div>
    }
}
export default PageBar;