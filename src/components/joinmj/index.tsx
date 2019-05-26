import { Image, View, Text } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import Imgs from '../../img';
import './index.less';
export default class extends Component<any, any>{
    render() {
        return (
            <View className="joinmj">
                <View className="join-title">
                    <View className="join-colorBlock" />
                    <View className="join-textBlock"><Text className="join-text">加入美季会员</Text></View>
                </View>
                <View className="join-course">
                    <View className="course-left">
                        <View className="left-cantainer">
                            <Image className="course-icon" src={Imgs.IconTag} />
                        </View>
                    </View>
                    <View className="course-middle">
                        <View className="middle-text">01.使用手机验证码登录</View>
                        <View className="middle-text">02.购买或输入邀请码成为会员</View>
                        <View className="middle-text">03.挑选喜欢的食材下单购买</View>
                        <View className="middle-text">04.阅读食用手册,尽享美食之旅</View>
                    </View>
                    <View className="course-right">
                        <View className="right-cantainer">
                            <Image className="vip-icon" src={Imgs.vipGift} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

