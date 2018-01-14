import React, {Component} from 'react';
import style from './index.scss';
import {connect} from "react-redux";
import {getHtml} from '../../actions/aboutAction'
import TitleBar from '../../components/share/titleBar'
import UrlOperation from '../../utils/urlOperation';


class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentHeight:document.body.height+'px',
            title:'',
        };
        this.urlOperation=new UrlOperation();
    }

    //获取富文本
    getHtml(){
        let type=this.urlOperation.getParameters().type;
        let catalog='';
        let configCode='';
        if(type=='aboutUs'){
            this.setState({
                title:'静怡简介'
            });
            catalog='COM';
            configCode='COMPANY_SIMPLE_INFO'
        }
        else{
            this.setState({
                title:'联系我们'
            });
            catalog='COM';
            configCode='COMPANY_LINK'
        }
        this.props.dispatch(getHtml({catalog:catalog,configCode:configCode}));
    }

    componentDidMount() {
        this.getHtml();
        setTimeout(() => {
            let top = 48;
            let all = document.body.offsetHeight;
            this.setState({
                contentHeight: (all - top) + 'px'
            })
        }, 500);
    }

    createMarkup() { return {__html: this.props.htmlData}; };

    render(){
        let styles={height:this.state.contentHeight};
        return <div>
            <TitleBar ref="title" title={this.state.title}/>
            <div className={style.content} style={styles} dangerouslySetInnerHTML={this.createMarkup()}></div>
        </div>
    }
}

function mapStateToProps(state) {
    return Object.assign({}, state.htmlInfo);
}

export default connect(mapStateToProps)(About);