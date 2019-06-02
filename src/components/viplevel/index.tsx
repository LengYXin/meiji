import { Image, Navigator, View, Text, Button } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import './index.less';
export default class Viplevel extends Component<any, any>{
    state = {
        // activeLevel: this.props.level,
        upgradepoints: this.props.upgradepoints,
        vipType: this.props.vipType,
        data: [
            {
                title: '体验会员',
                price: '￥20/月',
                serves: ['无门槛加入', '轻奢新感受'],
            }, {
                title: '优享会员',
                price: '￥399/年',
                serves: ['升级要求:', '体验会员', '消费满1000元']
            }, {
                title: '尊享会员',
                price: '￥3999/年',
                serves: ['升级要求:', '优享会员', '消费满3000元', '新品决策命中四次']
            }]
    }
    setLevel = (index) => {
        if (index == this.props.level) {
            return
        }
        let flag = false;
        console.log("TCL: Viplevel -> setLevel -> this.state.vipType", this.state.vipType)
        if (this.state.vipType === 'expVip' && index < 2) {
            if (this.state.upgradepoints < 1000 || this.state.upgradepoints === 1000 && index > 1) {
                return;
            } else {
                flag = true;
            }
        } else if (this.state.vipType === 'enjoyVip') {
            if (this.state.upgradepoints < 4000 && index > 1) {
                return;
            } else {
                flag = true;
            }
        } else if (this.state.vipType === 'excVip') {
            flag = true;
        }
        if (flag) {
            this.props.onChangeLevel(index);
        }
    }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.level !== this.state.activeLevel) {
    //         this.setState({
    //             activeLevel: nextProps.level
    //         })
    //     }
    // }
    render() {
        // console.log("TCL: Viplevel -> render -> this.state.activeLevel", this.state.activeLevel)
        return (
            <View className="level-body">
                {this.state.data.map((item, index) => {
                    return (
                        <View key={index} className={index === this.props.level ? 'level-item active' : 'level-item'} onClick={() => {
                            this.setLevel(index)
                        }}>
                            <View className='item-caption'>
                                <Text>{item.title}</Text>
                            </View>
                            <View className='item-price'>
                                <Text>{item.price}</Text>
                            </View>
                            <View>
                                <View className='item-service'>
                                    {item.serves.map((o, i) => {
                                        return (<View key={i}>{o}</View>)
                                    })}
                                </View>
                            </View>
                        </View>)
                })
                }
            </View>
        )
    }
}

