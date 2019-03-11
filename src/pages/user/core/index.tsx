import { Image, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import { AtList, AtListItem } from "taro-ui";
import Imgs from '../../../img';
import { User } from '../../../store';
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
    console.log("aaa")
    Taro.navigateTo({ url: "/pages/equity/index?key=" })
  }
  previewImage() {
    Taro.previewImage({
      urls: [Imgs.Code]
    })
  }
  onGetInviteCode() {
    User.onGetInviteCode()
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
          <View className="header-right">
            <View className="right-name">{Info.nickName}</View>
            <View className="right-img">
              {/* <Image src={img} /> */}
              {Info.vipType}
            </View>
            <View className="right-time">{Info.vipExpireTimeStr}</View>
          </View>
        </View>
        <View className="core-tab">
          <Image className="tab-img" src={Imgs.tabImg} onClick={this.onClickEquity.bind(this)} />
          <View className="tab-list">
            <View className="tab-txt" onClick={this.onClickRecord.bind(this, 0)}>全部订单</View>
            <View className="tab-txt" onClick={this.onClickRecord.bind(this, 1)}>待付款</View>
            <View className="tab-txt" onClick={this.onClickRecord.bind(this, 2)}>待发货</View>
            <View className="tab-txt" onClick={this.onClickRecord.bind(this, 3)}>已发货</View>
            <View className="tab-txt" onClick={this.onClickRecord.bind(this, 4)}>已完成</View>
          </View>
        </View>
        <View className="invitation">
          <View className="invitation-title">
            邀请码
          </View>
          <View className="invitation-updata">
            <View className="updata-list">
              <Image className="list-img" src={Imgs.upYesImg} onClick={this.onGetInviteCode.bind(this)} />
            </View>
            <View className="updata-list">
              <Image className="list-img" src={Imgs.upYesImg} onClick={this.onGetInviteCode.bind(this)} />
            </View>
            <View className="updata-list">
              <Image className="list-img" src={Imgs.upNoImg} onClick={this.onGetInviteCode.bind(this)} />
              <Image className="list-img-s" src={Imgs.SuoImg} />
            </View>
          </View>
        </View>
        <View className="core-list">
          <AtList hasBorder={false}>
            <AtListItem title='卡劵' arrow='right' hasBorder={false} onClick={this.onClickCard.bind(this)} />
            <AtListItem title='收货地址' arrow='right' hasBorder={false} onClick={this.onClickAddress.bind(this)} />
            <AtListItem title='账户安全' arrow='right' hasBorder={false} onClick={this.onClickSecurity.bind(this)} />
          </AtList>
        </View>
        <View className="core-code">
          <Image className="code-img" src={Imgs.Code} onClick={this.previewImage.bind(this)} />
          <View className="code-txt">
            <Image className="txt-img" src={Imgs.KF} />联系客服
        </View>
        </View>
      </View>
    )
  }
}
