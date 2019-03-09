import { View, Button, Textarea, Image, Text } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import './index.less';
import { User, Regular } from '../../store';
import { AtProgress } from 'taro-ui';

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
  state = {
    view: false,
    code: ""
  }
  componentWillMount() { }

  componentWillReact() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  async onGet() {
    User.onPayVip()
  }
  render() {
    return (
      <View className='home'>
        <View className="home-nav-img">
          <Image
            src='https://jdc.jd.com/img/400x400'
            mode='widthFix' />
        </View>
        <View className="home-content">
          <View className="content-header">
            <View className="header-title">
              湖丰阳澄湖大闸蟹螃蟹
            </View>
            <Image
              className='header-img'
              src='https://jdc.jd.com/img/400x400'
              mode='widthFix' /></View>
          <View className="content-address">产地：阳澄湖</View>
          <View className="content-text">
            阳澄湖大闸蟹，江苏省苏州市特产，中国国家地理标志产品。 [1-2]
            阳澄湖大闸蟹又名金爪蟹。产于苏州阳澄湖。蟹身不沾泥，俗称清水大闸蟹，体大膘肥，青壳白肚，金爪黄毛，肉质膏腻。农历9月的雌蟹、10月的雄蟹，性腺发育最佳。煮熟凝结，雌者成金黄色，雄者如白玉状，滋味鲜美。 [3-5]
            2005年5月9日，原国家质检总局批准对“阳澄湖大闸蟹”实施原产地域产品保护。 [1-2]  2018年9月25日报道，外地蟹被运到阳澄湖，贴标价翻十倍。
          </View>
        </View>
        <Image
          className='home-bottom-img'
          src='https://jdc.jd.com/img/400x400'
          mode='widthFix' />
        <View className="home-shop">
          <View className="shop-header">
            <View className="shop-title">
              湖丰阳澄湖大闸蟹螃蟹
            </View>
            <Image
              className='shop-img'
              src='https://jdc.jd.com/img/400x400'
              mode='widthFix' /></View>
          <View className="shop-address">产地：阳澄湖</View>
          <View className="shop-progress">
            <AtProgress percent={25} color='#DBC389' />
          </View>
          <View className="shop-qian">
            <View className="qian-left">
              <View className="left-num">￥735.00</View>
              <View className="left-type">全款预付</View>
            </View>
            <View className="qian-right">
              <View className="right-time">剩余 12:04:16</View>
              <Button className="right-btn">即刻购买</Button>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
