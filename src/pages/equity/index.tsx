import { Button, Text, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import Equity from '../../components/equity';
import NiuPai from '../../components/niupai';
import { User, EnumVipType } from '../../store';
import priceConfig from '../../price.config';
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
    navigationBarTitleText: '会员权益'
  }

  componentWillMount() { }

  componentWillReact() {
  }

  componentDidMount() {
    Taro.showShareMenu({
      withShareTicket: true
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onPayVip(type) {
    User.onPayVip(type)
  }
  render() {
    const expVipdisabled = priceConfig.expVip.disabled || (User.Info.vipType != EnumVipType.nonVip && User.Info.vipType != EnumVipType.expVip);
    const enjoyVipdisabled = priceConfig.enjoyVip.disabled || (User.Info.vipType != EnumVipType.nonVip && User.Info.vipType != EnumVipType.enjoyVip);
    const excVipdisabled = priceConfig.excVip.disabled || (User.Info.vipType != EnumVipType.nonVip && User.Info.vipType != EnumVipType.excVip);

    return (
      <View className='index'>
        <NiuPai />
        <Equity />
        <View className='at-row at-row--wrap'>
          <View className='at-col at-col-8'><Text>体验会员</Text>
            <Text>{priceConfig.expVip.discount && <Text className="text-delete">{priceConfig.expVip.original}</Text>} {priceConfig.expVip.present}</Text>
            <Text>/ 月</Text></View>
          <View className='at-col at-col-4'><Button onClick={this.onPayVip.bind(this, EnumVipType.expVip)} disabled={expVipdisabled}>购买</Button></View>
        </View>
        <View className='at-row at-row--wrap'>
          <View className='at-col at-col-8'><Text>优享会员</Text>
            <Text >{priceConfig.enjoyVip.discount && <Text className="text-delete">{priceConfig.enjoyVip.original}</Text>} {priceConfig.enjoyVip.present}</Text>
            <Text>/ 年</Text>
          </View>
          <View className='at-col at-col-4'><Button onClick={this.onPayVip.bind(this, EnumVipType.enjoyVip)} disabled={enjoyVipdisabled}>购买</Button></View>
        </View>
        <View className='at-row at-row--wrap'>
          <View className='at-col at-col-8'><Text>尊享会员</Text>
            <Text >{priceConfig.excVip.discount && <Text className="text-delete">{priceConfig.excVip.original}</Text>} {priceConfig.excVip.present}</Text>
            <Text>/ 年</Text>
          </View>
          <View className='at-col at-col-4'><Button onClick={this.onPayVip.bind(this, EnumVipType.excVip)} disabled={excVipdisabled}>购买</Button></View>
        </View>
      </View>
    )
  }
}
