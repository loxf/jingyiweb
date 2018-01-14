import React, {Component} from 'react';
import style from './index.scss';

class BankCardItem extends Component {
    constructor(props) {
        super(props);
    }

    //获取银行图片
    getBankImg(){
        let bankName= this.props.bankName;
        if(bankName.indexOf('工商')>=0){
            return './images/bank/gongshang.png';
        }
        else if(bankName.indexOf('光大')>=0){
            return './images/bank/guangd.png';
        }
        else if(bankName.indexOf('广发')>=0){
            return './images/bank/guangfa.png';
        }
        else if(bankName.indexOf('杭州')>=0){
            return './images/bank/hangzhou.png';
        }
        else if(bankName.indexOf('建设')>=0){
            return './images/bank/jianshe.png';
        }
        else if(bankName.indexOf('交通')>=0){
            return './images/bank/jiaotong.png';
        }
        else if(bankName.indexOf('民生')>=0){
            return './images/bank/minsheng.png';
        }
        else if(bankName.indexOf('农业')>=0){
            return './images/bank/nongye.png';
        }
        else if(bankName.indexOf('浦发')>=0){
            return './images/bank/pufa.png';
        }
        else if(bankName.indexOf('上海银行')>=0){
            return './images/bank/shanghai.png';
        }
        else if(bankName.indexOf('兴业')>=0){
            return './images/bank/xingye.png';
        }
        else if(bankName.indexOf('邮政')>=0){
            return './images/bank/youzheng.png';
        }
        else if(bankName.indexOf('招商')>=0){
            return './images/bank/zhaoshang.png';
        }
        else if(bankName.indexOf('中国银行')>=0){
            return './images/bank/zhongguoyinhang.png';
        }
        else if(bankName.indexOf('中信')>=0){
            return './images/bank/zhongxin.png';
        }
        else {
            return './images/bank/qita.png'
        }
    }

    static propTypes = {
        bankName:React.PropTypes.string,//银行名称
        number:React.PropTypes.string,//银行卡尾号
        showRate:React.PropTypes.bool,//末尾是否显示费率
    };

    render(){
        return <div className={style.container}>
            <img src={this.getBankImg()}/>
            <div>
                <div>{this.props.bankName}</div>
                <div>{`尾号${this.props.number.substr(this.props.number.length-4,4)}储蓄卡${this.props.showRate?'（费率0.6%，最低一元）':''}`}</div>
            </div>
        </div>
    }

}

export default BankCardItem
