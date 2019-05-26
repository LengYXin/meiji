import { Image, Text, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import { AtList, AtListItem, AtBadge } from "taro-ui";
import Imgs from '../../../img';
import { User } from '../../../store';
import './index.less';
import Invitation from './invitation';

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
    navigationBarTitleText: '我的'
  }

  componentWillMount() { }

  componentWillReact() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onClickCard() {
    Taro.navigateTo({ url: "/pages/user/card/index?key=" })
  }
  onClickAddress() {
    Taro.navigateTo({ url: "/pages/user/address/index?key=" })
  }
  onClickSecurity() {
    Taro.navigateTo({ url: "/pages/user/security/index?key=" })
  }
  onClickRecord(index) {
    Taro.navigateTo({ url: `/pages/order/record/index?key=${index}` })
  }
  onClickEquity() {
    Taro.navigateTo({ url: "/pages/equity/index?key=" })
  }
  previewImage() {
    Taro.previewImage({
      urls: [Imgs.Code]
    })
  }
  onGetInviteCode() {
    // User.onGetInviteCode()
  }
  render() {
    const Info = { ...User.Info }
    // console.log(Info)
    return (
      <View className='user-core'>
        <View className="core-header">
          <View className="header-left">
            <Image className="left-img" src={Info.avatarUrl} mode="aspectFit" />
          </View>
          <View className="header-center">
            <View className="center-name">{Info.nickName}</View>
            <View className="center-img">
              <Image onClick={()=>{
               return Taro.reLaunch({ url: "/pages/user/center/index" })
              }} src={Imgs[Info.vipType]} />
            </View>
            <View className="center-time">{Info.vipExpireTimeStr} <Text>到期</Text></View>
          </View>
          <View className="header-right">
            <Image src={Imgs.VipCenter}  onClick={this.onClickEquity.bind(this)} />
            {/* {process.env.NODE_ENV === 'development' ? <Image className="tab-img" src={Imgs.tabImg} onClick={this.onClickEquity.bind(this)} /> : null} */}
          </View>
        </View>
        <View className="order-layer">
          <View className="order-my" onClick={this.onClickRecord.bind(this, 0)} >我的订单</View>
          <View className="order-full" onClick={this.onClickRecord.bind(this, 0)} >查看全部订单 ></View>
        </View>
        <View className="core-tab">
          <View className="tab-list">
            <View className="tab-txt" onClick={this.onClickRecord.bind(this, 1)}>
              <View>
                <Image className="icon-obligation" src={Imgs.obligation} />  
              </View>
              <View className="tab-label">待付款</View>
            </View>
            <View className="tab-txt" onClick={this.onClickRecord.bind(this, 2)}>
              <View>
                <AtBadge dot>
                  <Image className="icon-overhang" src={Imgs.overhang} />  
                </AtBadge>
              </View>
              <View className="tab-label">待发货</View>
            </View>
            <View className="tab-txt" onClick={this.onClickRecord.bind(this, 3)}>
              <View>
                <Image className="icon-receiving" src={Imgs.WaitReceiving} />  
              </View>
              <View className="tab-label">待收货</View>
            </View>
            <View className="tab-txt" onClick={this.onClickRecord.bind(this, 4)}>
              <View>
                <Image className="icon-return" src={Imgs.SalesReturn} />  
              </View>
              <View className="tab-label">退换货</View>
            </View>
          </View>
        </View>
        <Invitation />
        <View className="core-list">
          <AtList hasBorder={false}>
            <AtListItem title='我的卡劵' arrow='right' hasBorder={false} onClick={this.onClickCard.bind(this)} />
            <AtListItem title='收货地址' arrow='right' hasBorder={false} onClick={this.onClickAddress.bind(this)} />
            <AtListItem title='账户安全' arrow='right' hasBorder={false} onClick={this.onClickSecurity.bind(this)} />
            <AtListItem title='联系客服' arrow='right' hasBorder={false} onClick={this.previewImage.bind(this)} />
          </AtList>
        </View>
      </View>
    )
  }
}
