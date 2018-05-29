import React, {Component} from 'react';
import style from './index.scss';
import config from '../../../config';

class TeacherList extends Component {
    constructor(props) {
        super(props);
    }
    renderTitle = (title) => {
        let titleArr = title.split(",");
        return titleArr.map((v,i)=>{
            return <div key={"teacher"+i} className={style.position}>{v}</div>
        })
    }
    structTeacherList(){
        return this.props.teachers.map((item,index)=>{
            return <div className={style.teacherItem} key={index}>
                <img src={config.imgPublicPath+item.pic}/>
                <div className={style.message}>
                    <div className={style.name}>{item.name}</div>
                    {this.renderTitle(item.title)}
                </div>
            </div>
        })
    }

    render() {
        return <div className={style.container}>
            <div className={style.title}>讲师</div>
            <div className={style.content}>
                {this.structTeacherList()}
            </div>
        </div>
    }
}

export default TeacherList;