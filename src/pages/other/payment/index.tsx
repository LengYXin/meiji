import { View, Button,Text } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
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
    navigationBarTitleText: '首页'
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
      <View className='payment'>
        <View className='payment-box'>
          <View className='box-title'>恭喜您，支付成功啦~</View>
          <View className='box-txt'>您已成功支付<Text>￥2.300</Text>元</View>
          <View className='box-txt'>订单编号：<Text>34765676543456</Text></View>
        </View>
        <View className="payment-btn">
          <Button>返回首页</Button>
          <Button>查看订单</Button>
        </View>
      </View>
    )
  }
}
