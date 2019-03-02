import { View, Image, Navigator } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import { AtList, AtListItem } from "taro-ui"
import './index.less';
import img from '../../../img/img47.png'
import tabImg from '../../../img/img70.png'
import upNoImg from '../../../img/img66.png'
import upYesImg from '../../../img/img65.png'
import SuoImg from '../../../img/img31.png'
import code from '../../../img/code.png'
import kf from '../../../img/kf.png'
import { User, DateFormat } from '../../../store';


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
            <View className="right-time">{Info.vipExpireTime > 0 ? DateFormat(Info.vipExpireTime, "yyyy.mm.dd") + '到期' : ''}</View>
          </View>
        </View>
        <View className="core-tab">
          <Image className="tab-img" src={tabImg} onClick={this.onClickEquity.bind(this)} />
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
              <Image className="list-img" src={upYesImg} />
            </View>
            <View className="updata-list">
              <Image className="list-img" src={upYesImg} />
            </View>
            <View className="updata-list">
              <Image className="list-img" src={upNoImg} />
              <Image className="list-img-s" src={SuoImg} />
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
          <Image className="code-img" src={code} />
          <View className="code-txt">
            <Image className="txt-img" src={kf} />联系客服
        </View>
        </View>
      </View>
    )
  }
}
