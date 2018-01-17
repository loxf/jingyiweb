import React, {Component} from 'react';
import style from './index.scss';
import ShareGuide from '../../../components/share/shareGuide';

class BottomButton extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        btns: React.PropTypes.array.isRequired,//按钮列表，enable：按钮是否可用，onClick：按钮点击事件，name：按钮文字

    };


    buttonClick(buttonData) {
        if (buttonData.code == 'CANNOT_BUY') {
            return;
        }
        else if (buttonData.code == 'SHARE_FRIEND') {
            window.scrollTo(0, document.body.scrollHeight);
            this.refs.shareGuide.show();
        }
        else if (buttonData.code == 'BUY_NOW') {
            this.context.router.push(`confirmOrder?type=${buttonData.proeuctType}&id=${buttonData.offerId}`);
        }
        else {
            this.context.router.push(`confirmOrder?type=VIP&id=${buttonData.offerId}`);
        }
    }

    structButtons() {
        let btns = this.props.btns;
        if (btns.length == 2) {
            return btns.length > 0 ? <div className={style.buttonGroup}>
                <button className={btns[0].enable ? style.firstBtn : style.firstBtn + ' ' + style.unable}
                        onClick={() => {
                            btns[0].enable && this.buttonClick(btns[0]);
                        }}>{btns[0].price ? (btns[0].name + '（￥' + btns[0].price + '）') : btns[0].name}</button>
                <button className={btns[1].enable ? style.secondBtn : style.secondBtn + ' ' + style.unable}
                        onClick={() => {
                            btns[1].enable && this.buttonClick(btns[1]);
                        }}>{btns[1].price ? (btns[1].name + '（￥' + btns[1].price + '）') : btns[1].name}</button>
            </div> : <div></div>
        }
        else {
            return btns.length > 0 ?
                <button className={btns[0].enable ? style.singleBtn : style.singleBtn + ' ' + style.unable}
                        onClick={() => {
                            btns[0].enable && this.buttonClick(btns[0]);
                        }}>{btns[0].price ? (btns[0].name + '（￥' + btns[0].price + '）') : btns[0].name}</button> :
                <div></div>
        }
    }

    render() {
        return <div className={style.container}>
            <div className={style.fixedContainer}>
                <ShareGuide ref="shareGuide" hideCallBack={() => {
                    window.scrollTo(0, 0)
                }}/>
                {this.structButtons()}
            </div>
        </div>
    }

}

//使用context
BottomButton.contextTypes = {
    router: React.PropTypes.object.isRequired
};


export default BottomButton