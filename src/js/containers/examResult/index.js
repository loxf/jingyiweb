import React, {Component} from 'react';
import {connect} from 'react-redux';
import TitleBar from '../../components/share/titleBar'
import style from './index.scss';


class ExamResult extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.score===undefined){
            history.back();
        }
    }

    render() {
        return <div className={style.examResult}>
            <TitleBar ref="title" title="考试成绩"/>
            <div className={style.content}>
                <div className={style.top}>
                    <div className={style.circle}>
                        <div className={style.count}>
                            <div>{this.props.score}</div>
                            <div>分</div>
                        </div>
                        <div className={style.status}>{this.props.desc}</div>
                    </div>
                </div>
                <div className={style.middle}>
                    <div>最高分</div>
                    <div>{this.props.highest}分</div>
                </div>
                <div className={style.bottom}>
                    <div>最低分</div>
                    <div>{this.props.lowest}分</div>
                </div>
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    return Object.assign({}, state.examInfo.examResult);
}

export default connect(mapStateToProps)(ExamResult);