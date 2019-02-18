import { Image, Navigator, View, Text, Button } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import Imgs from '../../img';
import './index.less';
export default class extends Component<any, any> {
    render() {
        return (
            <View className="com-niupai">
                <Image src={Imgs.Icon}/>
                <Image src={Imgs.Niupai}/>
            </View>

        )
    }
}

