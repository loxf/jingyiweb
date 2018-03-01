import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';
import {getQuestions, submit} from '../../actions/examAction'
import UrlOperation from '../../utils/urlOperation';
import TitleBar from '../../components/share/titleBar'
import ExamItem from '../../components/exam/examItem';
import {Toast} from 'antd-mobile'

class Exam extends Component {
    constructor(props) {
        super(props);
        this.urlOperation = new UrlOperation();
        this.state = {
            activeItem: 0,
            examData: [],
        }
    }

    //上一题
    lastQuestion() {
        if (this.state.activeItem > 0) {
            this.setState({
                activeItem: this.state.activeItem - 1
            })
        }
    }

    //下一题
    nextQuestion() {
        if (this.state.examData[this.state.activeItem].answer === -1 || this.state.examData[this.state.activeItem].answer === []) {
            return;
        }
        this.setState({
            activeItem: this.state.activeItem + 1
        }, () => {
            console.log(this.state.examData)
        })
    }

    componentDidMount() {
        this.props.dispatch(getQuestions({
            offerId: this.urlOperation.getParameters().id,
        }, () => {
            let questions = [];

            for (let item of this.props.examQuestions) {
                questions.push({
                    question: item.title,
                    answers: item.options,
                    mult: item.type == 'MULT',
                    answer: item.type == 'MULT' ? [] : -1,
                    questionId: item.questionId,
                    pics: item.pics,
                    score: item.score,
                })
            }
            this.setState({
                examData: questions
            })
        }))
    }

    getAnswers() {
        let answers = [];
        for (let item of this.state.examData) {
            answers.push({
                questionId: item.questionId,
                answer: Array.isArray(item.answer) ? item.answer.sort((a, b) => {
                    return a - b
                }).toString() : item.answer
            })
        }
        return answers;
    }

    submitResult() {
        if (this.state.examData[this.state.activeItem].answer === -1 || this.state.examData[this.state.activeItem].answer === []) {
            return;
        }
        this.props.dispatch(submit({
            offerId: this.urlOperation.getParameters().id,
            answers: JSON.stringify(this.getAnswers()),
        }, (result) => {
            Toast.info('提交成功', 2);
            setTimeout(() => {
                this.context.router.replace('examResult')
            }, 2000);
        }));
    }

    renderExam() {
        let {question, answers, answer, mult, pics, score} = this.state.examData[this.state.activeItem];
        return <div>
            <TitleBar ref="title" title="考试"/>
            <ExamItem initAnswer={mult ? -1 : answer} key={'answerItem' + this.state.activeItem} pics={pics ? pics : []}
                      question={'Q' + (this.state.activeItem + 1) + '：' + question + '（' + (mult ? '多选，' : '单选，') + score + '分）'}
                      isMult={mult} initAnswers={mult ? answer : []}
                      answers={answers} onChange={(active) => {
                this.state.examData[this.state.activeItem].answer = active;
            }}/>
            <div className={style.space}></div>
            <div className={style.buttonGroup}>
                <button onClick={() => {
                    this.lastQuestion()
                }}>上一题
                </button>
                {this.state.activeItem <= this.state.examData.length - 2 ? <button onClick={() => {
                    this.nextQuestion()
                }}>下一题</button> : <button className={style.submit} onClick={this.submitResult.bind(this)}>提交</button>}
            </div>
        </div>
    }

    render() {
        return <div className={style.exam}>
            {this.state.examData.length > 0 ? this.renderExam() : <div></div>}
        </div>
    }
}


//使用context
Exam.contextTypes = {
    router: React.PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return Object.assign({}, state.examInfo);
}

export default connect(mapStateToProps)(Exam)