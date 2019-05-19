import { Image, Navigator, View, Text, Button } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import './index.less';
import Imgs from '../../img';

export default class extends Component{
    constructor () {
        super(...arguments)
        this.state = {
          level: 0,
          data: [
            {
                title: '甄选商品',
                subheading: '全球精尖货',
                img: Imgs.IconLock
            },{
                title: '全额退款',
                subheading: '不满意任意退',
                img: Imgs.IconCoin
            },{
                title: '新奇体验',
                subheading: '新品免费尝',
                img: Imgs.IconFree
            },{
                title: '好友福利',
                subheading: '邀请码分享',
                img: Imgs.IconFriend
            },{
                title: '美食之旅',
                subheading: '线下分享会',
                img: Imgs.IconCate
            },{
                title: '专送速达',
                subheading: '美食不等待',
                img: Imgs.IconFriend
            }]
        }
    }
     componentWillReceiveProps(nextProps) {
         if(nextProps.level!== this.state.level) {
             this.setState({
                 level: nextProps.level
             })
         }
     }

    render() {
        return (
            <View className="equities-body">
                <View className="caption">
                    <Text className="caption-left">会员权益</Text>
                    <Text className="caption-right">查看详细权益 > </Text>
                </View>
                <View className="item-container">
                    {this.state.data.map((item, index)=>{
                        return (<View key={index} className="item">
                            <View className={this.state.level===0 && index<1||this.state.level===1 && index<4 || this.state.level===2 ? 'item-flag' : ' item-flag item-disable' 
                            }><Image className="item-img" src={item.img} /></View>
                            <View className="item-describe">
                                <View className="item-title"><Text>{item.title}</Text></View>
                                <View className="item-subheading"><Text>{item.subheading}</Text></View>
                            </View>
                        </View>)
                    })}
                </View>
            </View>
        )
    }
}

