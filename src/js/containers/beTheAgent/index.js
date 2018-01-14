import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';
import InputItem from '../../components/share/inputItem';
import ItemList from '../../components/share/itemList';
import SubmitButton from '../../components/share/submitButton';
import TitleBar from "../../components/share/titleBar/index";
import DropDownChangeContent from '../../components/share/dropDownList/dropDownChangeContent';
import {beAgent,getArea} from '../../actions/homeAction'
import {Toast} from 'antd-mobile';
require('../../../styles/antStyleAdapt.scss');

import AddressPicker from '../../components/share/addressPicker';
import {getHtml} from '../../actions/aboutAction'

class BeTheAgent extends Component {
    constructor(props) {
        super(props);
        this.state={
            currentArea:'选择区域',
            agentType:-1,
            name:'',
            phone:'',
            province:'',
            city:'',
            tipsContent:'',
        }
    }

    //参数映射
    getAgentCode(index) {
        (index<0)&&(index=0);
        let dic = ['AGENT_TEXT', 'PARTNER_TEXT', 'COMPANY_TEXT'];
        return dic[index];
    }

    //获取代理商描述
    getAgentTips(){
        this.props.dispatch(getHtml({
            catalog:'PAY',
            configCode:this.getAgentCode(this.state.agentType-1),
        },(result)=>{
            this.setState({
                tipsContent:result
            })
        }))
    }


    componentDidMount(){
        wx.ready(() => {
            wx.hideOptionMenu();
        });
        //获取区域数据
        this.props.dispatch(getArea({type:3}));
        this.getAgentTips();
    }

    //提交数据
    submit(){
        let {agentType,name,phone,province,city}=this.state;
        if(agentType==-1||!name||!phone||!province||!city){
            Toast.info('请输入完整信息',2);
            return;
        }
        if(phone.length!=11){
            Toast.info('请输入正确的电话号码',2);
            return;
        }
        this.props.dispatch(beAgent({city:city,phone:phone,province:province,realName:name,type:agentType},()=>{
            Toast.info('成功成为代理商',2);
            setTimeout(()=>{
                this.context.router.replace('/');
            },2000)
        }))
    }

    //构造地址
    filterAddress(array){
        let result='';
        for(let item of array){
            result+=' '+item.split(',')[0];
        }
        return result;
    }

    //姓名值改变
    nameChange(value){
        this.setState({
            name:value
        })
    }

    //电话改变
    phoneChange(value){
        this.setState({
            phone:value
        })
    }

    createMarkup() { return {__html: this.state.tipsContent}; };

    render() {

        return <div className={style.container}>
            <TitleBar share={false} title="成为代理商"/>
            <div className={style.commonItem}>
                <DropDownChangeContent title="代理类型" list={this.props.angentType} onChange={(index)=>{this.setState({agentType:index+1},()=>{
                    this.getAgentTips();
                })}}/>
            </div>
            <div className={style.commonItem}>
                <ItemList>
                    <InputItem text="姓名" placeholder="请输入姓名" onChange={(value)=>{this.nameChange(value)}}/>
                    <InputItem text="手机号码" placeholder="请输入手机号码" type='number' onChange={(value)=>{this.phoneChange(value)}}/>
                    {this.props.areaData?<AddressPicker regionData={this.props.areaData}
                                   initialValue={[]} colCount={3} onChange={(cityArray) => {
                                       this.setState({
                                           currentArea:this.filterAddress(cityArray),
                                           province:cityArray[0].split(',')[1],
                                           city:cityArray[1]?cityArray[1].split(',')[1]:'',
                                       })
                    }}>
                        <div className={style.addressItem}><div className={style.addressTitle}>所在区域</div><div className={style.addressContent}>{this.state.currentArea}</div></div>
                    </AddressPicker>:''}
                </ItemList>
            </div>
            <div className={style.buttonGroup}>
            <SubmitButton onClick={()=>{this.submit()}}>提交申请</SubmitButton>
            </div>

            <div className={style.angentTips}>
                <div className={style.angentTipsTitle}>申请条件</div>
                <div className={style.tipsConetnt}>
                    <div  dangerouslySetInnerHTML={this.createMarkup()}></div>
                </div>
                <img className={style.leftIcon} src="./images/toBeAgent/yinhao.png"/>
                <img className={style.rightIcon} src="./images/toBeAgent/yinhao-you.png"/>
            </div>


        </div>
    }
}


//使用context
BeTheAgent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

BeTheAgent.defaultProps = {
    angentType: [{text: '代理商'}, {text: '合伙人'}, {text: '分公司'}],

};
function mapStateToProps(state) {
    return Object.assign({}, state.homeInfo);
}
export default connect(mapStateToProps)(BeTheAgent);