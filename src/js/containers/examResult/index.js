import React, {Component} from 'react';
import {connect} from 'react-redux';
import TitleBar from '../../components/share/titleBar'
import style from './index.scss';


class ExamResult extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={style.examResult}>
            <TitleBar ref="title" title="考试成绩"/>
            <div className={style.content}>
                <div className={style.top}>
                    <div className={style.circle}>
                        <div className={style.count}>
                            <div>11</div>
                            <div>分</div>
                        </div>
                        <div className={style.status}>不合格</div>
                    </div>
                </div>
                <div className={style.middle}>
                    <div>最高分</div>
                    <div>98分</div>
                </div>
                <div className={style.bottom}>
                    <div>最低分</div>
                    <div>10分</div>
                </div>
            </div>
        </div>
    }
}

export default ExamResult;