import { View, Image, Button, Navigator } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import Imgs from "../../img";
import NiuPai from '../../components/niupai'
import './index.less';

@observer
export default class extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *  
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '美季'
  }

  componentWillMount() { }

  componentWillReact() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <Image className="img-block img-sp" src="" mode="aspectFit" />
        <View className="view-padding">
          <View className="font-title">湖丰阳澄湖大闸蟹螃蟹 </View>
          <View className="font-lable">产地：阳澄湖</View>
          <View className="font-text">阳澄湖大闸蟹，江苏省苏州市特产，中国国家地理标志产品。 [1-2]</View>
        </View>
        <View className="info">
          <NiuPai />
        </View>
        <Image className="img-block" src={Imgs.Code} mode="aspectFit" />
        <View className="view-fixed-bottom">
          <Navigator url="/pages/home/index" openType="switchTab">
            <Button>开启味觉之旅</Button>
          </Navigator>
        </View>

      </View>
    )
  }
}
