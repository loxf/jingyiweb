import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';
import TitleBar from '../../components/share/titleBar'
import ExamItem from '../../components/exam/examItem';

class Exam extends Component {
    constructor(props) {
        super(props);
        this.examData = [{
            question: 'Q1：水电费水电费等所发生的范德萨发生东sdfsdffd方闪电',
            answers: ["水电费", "发生的", "对对对"],
            answer: -1
        }, {
            question: 'Q2：水电费水电费等所发生的范德萨发生东sdfsdffd方闪电',
            answers: ["水电费", "发生的", "对对对"],
            answer: -1
        }, {
            question: 'Q3：水电费水电费等所发生的范德萨发生东sdfsdffd方闪电',
            answers: ["水电费", "发生的", "对对对"],
            answer: -1
        }, {
            question: 'Q4：水电费水电费等所发生的范德萨发生东sdfsdffd方闪电',
            answers: ["水电费", "发生的", "对对对"],
            answer: -1
        }, {
            question: 'Q5：水电费水电费等所发生的范德萨发生东sdfsdffd方闪电',
            answers: ["水电费", "发生的", "对对对"],
            answer: -1
        }, {question: 'Q6：水电费水电费等所发生的范德萨发生东sdfsdffd方闪电',
            answers: ["水电费", "发生的", "对对对"],
            answer: -1},]
        this.state={
            activeItem:0,
        }
    }

    //上一题
    lastQuestion(){
        if(this.state.activeItem>0) {
            this.setState({
                activeItem: this.state.activeItem - 1
            })
        }
    }

    //下一题
    nextQuestion(){
        this.setState({
            activeItem:this.state.activeItem+1
        })
    }

    render() {
        let {question,answers,answer}=this.examData[this.state.activeItem];
        return <div className={style.exam}>
            <TitleBar ref="title" title="考试"/>
            <ExamItem initAnswer={answer} key={'answerItem'+this.state.activeItem} question={question} answers={answers} onChange={(active) => {
                this.examData[this.state.activeItem].answer=active;
            }}/>

            <div className={style.buttonGroup}>
                <button onClick={()=>{this.lastQuestion()}}>上一题</button>
                {this.state.activeItem<=this.examData.length-2?<button onClick={()=>{this.nextQuestion()}}>下一题</button>:<button className={style.submit}>提交</button>}
            </div>
        </div>
    }
}

Exam.defaultProps = {}

export default Exam