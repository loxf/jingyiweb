import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';
import InputItem from '../../components/share/inputItem';
import ItemList from '../../components/share/itemList';
import SubmitButton from '../../components/share/submitButton';
import TitleBar from "../../components/share/titleBar/index";
import DropDownChangeContent from '../../components/share/dropDownList/dropDownChangeContent'
import {getArea} from '../../actions/homeAction'
import {bindCard,getBankList} from '../../actions/myAccountAction';
import {Toast} from 'antd-mobile';
import AddressPicker from '../../components/share/addressPicker';

class BindCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentArea: '选择省份',
            bank:'',
            province: '',
            city:'',
            branch:'',
            carNumber:'',
            userName:'',
            phone:'',
            bankCode:'',
        }
    }

    //回到首页
    goHome() {
        history.pushState({}, '', '');
        let backLength = -1 * (history.length - 1);
        history.go(backLength);
    }

    componentDidMount() {
        //获取区域数据
        this.props.dispatch(getArea({type: 2}));
        this.props.dispatch(getBankList({}));
        wx.ready(() => {
            wx.hideOptionMenu();
        });
    }

    //构造地址
    filterAddress(array) {
        let result = '';
        for (let item of array) {
            result += ' ' + item.split(',')[0];
        }
        return result;
    }

    //提交绑卡请求
    submit(){
        if(!(this.state.bank&&this.state.province&&this.state.userName&&this.state.branch&&this.state.carNumber&&this.state.phone)){
            Toast.info("请按要求完善信息", 2);
        }
        else{
            this.props.dispatch(bindCard({
                bank:this.state.bank,
                bankCode:this.state.bankCode,
                bankNo:this.state.carNumber,
                city:this.state.city,
                phone:this.state.phone,
                province:this.state.province,
                userName:this.state.userName,
                zhName:this.state.branch,
            },()=>{
                Toast.info("绑卡成功", 2);
                setTimeout(()=>{
                    history.back();
                },2000)
            }))
        }
    }

    structBankList(){
        if(this.props.bankList){
            return this.props.bankList.map((item,index)=>{
                return {text:item.name};
            })
        }
        else{
            return [];
        }
    }

    render() {
        return <div className={style.container}>
            <TitleBar share={false} title="新的银行卡" right={{
                img: './images/share/home.png', onClick: () => {
                    this.goHome()
                }
            }}/>
            <div className={style.pageItem}>
                <DropDownChangeContent onChange={(index,bankName) => {
                    this.setState({
                        bank:bankName,
                        bankCode:this.props.bankList[index].code,
                    });
                }} list={this.structBankList()} title="银行"/>
            </div>
            <div className={style.pickerContent}>
                {this.props.areaData ? <AddressPicker regionData={this.props.areaData}
                                                      initialValue={[]} colCount={2} onChange={(cityArray) => {
                    this.setState({
                        currentArea: this.filterAddress(cityArray),
                        province: cityArray[0].split(',')[1],
                        city: cityArray[1].split(',')[1],
                    })
                }}>
                    <div className={style.addressItem}>
                        <div className={style.addressTitle}>所在区域</div>
                        <div className={style.addressContent}>{this.state.currentArea}</div>
                    </div>
                </AddressPicker> : ''}
            </div>
            <div className={style.pageItem}>
                <ItemList>
                    <InputItem text="支行名称" placeholder="请输入支行名称" onChange={(value)=>{
                        this.setState({
                            branch:value,
                        })
                    }}/>
                    <InputItem text="卡号" placeholder="银行卡号" onChange={(value)=>{
                        this.setState({
                            carNumber:value,
                        })
                    }}/>
                    <InputItem text="持卡人" placeholder="清楚输入持卡人姓名" onChange={(value)=>{
                        this.setState({
                            userName:value,
                        })
                    }}/>
                    <InputItem text="手机号码" placeholder="请输入预留手机号码" onChange={(value)=>{
                        this.setState({
                            phone:value,
                        })
                    }}/>
                </ItemList>
            </div>
            <div className={style.buttonGroup}>
                <SubmitButton onClick={()=>{this.submit()}}>完成</SubmitButton>
            </div>
        </div>
    }
}

BindCard.defaultProps = {
   // bankList: [{text: '工商银行'}, {text: '工商银行'}, {text: '工商银行'}, {text: '工商银行'}, {text: '工商银行'}, {text: '工商银行'}, {text: '工商银行'}, {text: '工商银行'}, {text: '工商银行'},]
}

function mapStateToProps(state) {
    return Object.assign({}, state.homeInfo,state.myAccountInfo);
}

export default connect(mapStateToProps)(BindCard);