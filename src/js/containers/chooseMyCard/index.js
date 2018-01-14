import React, {Component} from 'react';
import {connect} from "react-redux";
import style from './index.scss';
import TitleBar from "../../components/share/titleBar/index";
import BankCardItem from '../../components/chooseMyCard/bankCardItem'
import ChooseList from '../../components/share/chooseList';
import {getCardList, currentCard, unBindCard} from '../../actions/myAccountAction';
import {Toast} from 'antd-mobile';


class ChooseMyCard extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        wx.ready(() => {
            wx.hideOptionMenu();
        });
        this.props.dispatch(getCardList({page: 1, size: 1000}));
    }

    //选择银行卡
    chooseCard(index) {
        //存储获取的银行卡
        this.props.dispatch(currentCard(this.props.cardList[index]));
        this.context.router.push('withdrawalsByCard')
    }

    deleteCard(index) {
        this.props.dispatch(unBindCard({
            cardId: this.props.cardList[index].cardId
        }, () => {
            Toast.info('解绑成功', 2);
            this.props.dispatch(getCardList({page: 1, size: 1000}));
        }))
    }

    //构建卡列表
    structCardList() {
        if (this.props.cardList) {
            return this.props.cardList.map((item, index) => {
                return <BankCardItem bankName={item.bank} number={item.bankNo} key={item.bankNo}/>
            })
        }
        else {
            return ""
        }
    }

    getActive() {
        //存在选中卡时才匹配，否则默认选中第一个
        if (this.props.currentCard) {
            for (let i = 0; i < this.props.cardList.length; i++) {
                if (this.props.cardList[i].bankNo == this.props.currentCard.bankNo) {
                    return i;
                }
            }
        }
        else {
            return 0;
        }
    }

    render() {
        return <div className={style.chooseMyCard}>
            <TitleBar title="选择银行卡" right={{
                img: './images/myCard/jiahao.png', onClick: () => {
                    this.context.router.push('bindCard');
                }
            }}/>
            {this.props.cardList && this.props.cardList.length > 0 ? <div className={style.content}>
                <ChooseList delete={true} active={this.getActive()} onChange={(index) => {
                    this.chooseCard(index)
                }} onDelete={(index) => {
                    this.deleteCard(index)
                }}>
                    {this.structCardList()}
                </ChooseList>
            </div> : <div className={style.noData}>暂无银行卡</div>}

        </div>
    }
}


//使用context
ChooseMyCard.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return Object.assign({}, state.myAccountInfo);
}

export default connect(mapStateToProps)(ChooseMyCard);