import React, {Component} from 'react';
import ChooseItem from '../chooseItem';
import config from '../../../config';
import style from './index.scss';


class ExamItem extends Component {
    constructor(props) {
        super(props);
        this.titleDic = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
        this.state = {
            active: props.initAnswer >= 0 ? props.initAnswer : -1,//单选选中项
            actives: props.initAnswers.length > 0 ? props.initAnswers : [],//多选选中项
        }
    }

    static propTypes = {
        initAnswer: React.PropTypes.number,//单选初始选项
        initAnswers: React.PropTypes.array,//多选初始选项
        isMult: React.PropTypes.bool,//是否多选
        question: React.PropTypes.string,//题目
        answers: React.PropTypes.array,//答案列表
        pics:React.PropTypes.array,//题目相关图片
        onChange: React.PropTypes.func,//选项切换
    };

    //渲染单选
    renderSingle() {
        return this.props.answers && this.props.answers.length > 0 ? this.props.answers.map((item, index) => {
            let title = this.titleDic[index];
            return <ChooseItem title={title} text={item} active={this.state.active == index} key={index}
                               onClick={() => {
                                   this.setState({
                                       active: index,
                                   });
                                   this.props.onChange(index);
                               }
                               }/>
        }) : ''
    }

    //多选点击
    multClick(chooseItem) {
        let actives = this.state.actives;
        let index=actives.indexOf(chooseItem);
        //存在时取消选择
        if (index > -1) {
            actives.splice(index,1);
        }
        else{
            actives.push(chooseItem);
        }
        this.setState({
            actives:actives
        });
        this.props.onChange(actives);
    }


    //渲染多选
    renderMult() {
        return this.props.answers && this.props.answers.length > 0 ? this.props.answers.map((item, index) => {
            let title = this.titleDic[index];
            return <ChooseItem title={title} text={item} active={this.state.actives.indexOf(index)>-1} key={index}
                               onClick={() => {
                                   this.multClick(index);
                               }
                               }/>
        }) : ''
    }

    //构建答案列表
    structAnswers() {
        return <div>
            {this.props.isMult ? this.renderMult() : this.renderSingle()}
        </div>
    }

    renderPic(){
        return this.props.pics&&this.props.pics.length>0?this.props.pics.map((item,index)=>{
            return <img key={item} src={config.imgPublicPath+item}/>
        }):''
    }

    render() {
        return <div className={style.examItem}>
            <p className={style.question}>{this.props.question}</p>
            <div className={style.imgContainer}>{
                this.renderPic()
            }</div>
            <div className={style.answers}>{this.structAnswers()}</div>
        </div>
    }
}

export default ExamItem;