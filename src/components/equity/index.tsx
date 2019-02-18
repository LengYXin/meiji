import { View,Image } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import Imgs from '../../img';

import 'taro-ui/dist/weapp/css/index.css';
import './index.less';
export default class extends Component<any, any> {
    render() {
        return (
            <View className="equity-body">
                <View className="title">会员礼遇</View>
                <View className="th">
                    <View className='at-row at-row--wrap'>
                        <View className='at-col at-col-3'></View>
                        <View className='at-col at-col-3'>
                            <View>体验会员 </View>
                            <View>￥69</View>
                        </View>
                        <View className='at-col at-col-3'>
                            <View>优享会员  </View>
                            <View>￥399</View>
                        </View>
                        <View className='at-col at-col-3'>
                            <View>尊享会员  </View>
                            <View>￥3999</View>
                        </View>
                    </View>
                </View>
                <View className="tr">
                    <View className='at-row at-row--wrap'>
                        <View className='at-col at-col-3'>时间</View>
                        <View className='at-col at-col-3'>月</View>
                        <View className='at-col at-col-3'>年</View>
                        <View className='at-col at-col-3'>年</View>
                    </View>
                    <View className='at-row at-row--wrap'>
                        <View className='at-col at-col-3'>限购</View>
                        <View className='at-col at-col-3'>1/份</View>
                        <View className='at-col at-col-3'>2/份</View>
                        <View className='at-col at-col-3'>无</View>
                    </View>
                    <View className='at-row at-row--wrap'>
                        <View className='at-col at-col-3'>限量食材</View>
                        <View className='at-col at-col-3'></View>
                        <View className='at-col at-col-3'><Image src={Imgs.Duigou} className="img-g"/></View>
                        <View className='at-col at-col-3'><Image src={Imgs.Duigou} className="img-g"/></View>
                    </View>
                    <View className='at-row at-row--wrap'>
                        <View className='at-col at-col-3'>专送</View>
                        <View className='at-col at-col-3'></View>
                        <View className='at-col at-col-3'><Image src={Imgs.Duigou} className="img-g"/></View>
                        <View className='at-col at-col-3'><Image src={Imgs.Duigou} className="img-g"/></View>
                    </View>
                    <View className='at-row at-row--wrap'>
                        <View className='at-col at-col-3'>生日特权</View>
                        <View className='at-col at-col-3'></View>
                        <View className='at-col at-col-3'></View>
                        <View className='at-col at-col-3'><Image src={Imgs.Duigou} className="img-g"/></View>
                    </View>
                    <View className='at-row at-row--wrap'>
                        <View className='at-col at-col-3'>管家服务</View>
                        <View className='at-col at-col-3'></View>
                        <View className='at-col at-col-3'></View>
                        <View className='at-col at-col-3'><Image src={Imgs.Duigou} className="img-g"/></View>
                    </View>

                </View>
                <View className="text-bot">
                    更多礼遇，敬请期待...
               </View>
            </View>

        )
    }
}

