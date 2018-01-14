import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChooseItem from '../chooseItem';
import style from './index.scss';

class ExamItem extends Component {
    constructor(props) {
        super(props);
        this.titleDic = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
        this.state={
            active:props.initAnswer>=0?props.initAnswer:0
        }
    }

    static propTypes = {
        initAnswer:React.PropTypes.number,//初始选项
        question: React.PropTypes.string,//题目
        answers: React.PropTypes.array,//答案列表
        onChange:React.PropTypes.func,//选项切换
    };

    //构建答案列表
    structAnswers() {
        return this.props.answers && this.props.answers.length > 0 ? this.props.answers.map((item, index) => {
            let title = this.titleDic[index];
            return <ChooseItem title={title} text={item} active={this.state.active==index} key={index} onClick={()=>{
                this.setState({
                    active:index,
                });
                this.props.onChange(index);
            }
            }/>
        }) : ''
    }

    render() {
        return <div className={style.examItem}>
            <p className={style.question}>{this.props.question}</p>
            <div className={style.answers}>{this.structAnswers()}</div>
        </div>
    }
}

export default ExamItem;