import React, {Component} from 'react';
import style from './index.scss';
import config from '../../../config';

class PackageList extends Component {
    constructor(props) {
        super(props);
    }

    //跳转到对应的课程和活动详情
    toDetail(type, id) {
        switch (type) {
            case 'OFFER':
                this.context.router.push(`packageDetail?id=${id}`);
                break;
            case 'CLASS':
                this.context.router.push(`lessonDetail?id=${id}`);
                break;
            case 'ACTIVE':
                this.context.router.push(`activityDetail?id=${id}`);
                break;
            case 'VIP':
                this.context.router.push('confirmOrder?type=VIP&id=OFFER001&otherId=OFFER002');
                break;
        }
    }


    structList(data){
        return data.map((item)=>{
            return <div className={style.item} key={item.offerId} onClick={()=>{
                this.toDetail(item.offerType,item.offerId);
            }}>
                <div className={style.itemTitle}>{item.offerName}</div>
                <div className={style.tips}></div>
                <div className={style.price}>￥{item.price?item.price:0}</div>
                {item.canBuy&&this.props.isPlay==0?<button>购买</button>:''}
            </div>
        })
    }

    render(){
        return <div className={style.container}>
            <div className={style.title}>{this.props.listTitle}</div>
            <div className={style.content}>
                {this.structList(this.props.listData)}
            </div>
        </div>
    }
}


//使用context
PackageList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default PackageList