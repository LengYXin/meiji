import { Button, Image, Navigator, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import NiuPai from '../../components/niupai';
import Equity from '../../components/equity';
import Imgs from "../../img";
import './index.less';
import { User, Regular } from '../../store';

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

  componentDidMount() {
    User.onAuth()
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  // onClick() {
  //   Taro.showToast({ title: "请求中", icon: "none" })
  //   User.onAuth()
  // }
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
          <Equity />
          <View className="code-body">
            <Image src={Imgs.Code} className="c-icon" />
            <View className="c-kf">
              <Image src={Imgs.KF} className="c-kf-img" />
              联系客服
                </View>
          </View>
        </View>

        <View className="view-fixed-bottom">
          <Navigator url="/pages/login/index">
            <Button >开启味觉之旅</Button>
          </Navigator>
        </View>

      </View>
    )
  }
}
