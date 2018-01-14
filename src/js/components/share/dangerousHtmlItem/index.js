import React, {Component} from 'react';
import style from './index.scss';

class DangerousHtmlItem extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        title:React.PropTypes.string.isRequired,//标题
        inner:React.PropTypes.string.isRequired,//富文本
    }

    createMarkup() { return {__html: this.props.inner}; };

    render(){
        return <div className={style.container}>
            <div className={style.title}>{this.props.title}</div>
            <div className={style.content}  dangerouslySetInnerHTML={this.createMarkup()}></div>
        </div>
    }
}

export default DangerousHtmlItem