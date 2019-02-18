import { Image, Navigator, View, Text, Button } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import Imgs from '../../img';
import './index.less';
export default class extends Component<any, any> {
    render() {
        return (
            <View className="niupai-body">
                <View className="c-title">
                    <Image src={Imgs.Icon} className="c-icon" />
                    <Text>美季MEIJI</Text>
                </View>
                <View className="c-text">
                    <Image src={Imgs.Niupai} className="c-niupai" />
                    <View className="c-text-1">甄选全球食材</View>
                    <View className="c-text-2">专注提供当季最优选</View>
                </View>
            </View>

        )
    }
}

