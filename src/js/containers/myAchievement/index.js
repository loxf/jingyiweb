import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './index.scss';
import TitleBar from '../../components/share/titleBar';
import TabDataList from '../../components/share/tabDataList';

class MyAchievement extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return <div className={style.myAchievement}>
            <TitleBar title="我的成就"></TitleBar>

        </div>
    }
}

export default MyAchievement