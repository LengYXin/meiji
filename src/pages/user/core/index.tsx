import { View, Image } from '@tarojs/components';
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

  render() {
    return (
      <View className='user-core'>
        <View className="core-header">
          <View className="header-left">
            <Image className="left-img" src="" />
          </View>
          <View className="header-right">
            <View className="right-name">白叶挽青湖</View>
            <View className="right-img">
              <Image src={img} />
            </View>
            <View className="right-time">2017.12.11到期</View>
          </View>
        </View>
        <View className="core-tab">
          <Image className="tab-img" src={tabImg} />
          <View className="tab-list">
            <View className="tab-txt">全部订单</View>
            <View className="tab-txt">待付款</View>
            <View className="tab-txt">待发货</View>
            <View className="tab-txt">已发货</View>
            <View className="tab-txt">已完成</View>
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
            <AtListItem title='卡劵' arrow='right' hasBorder={false} />
            <AtListItem title='收货地址' arrow='right' hasBorder={false} />
            <AtListItem title='账户安全' arrow='right' hasBorder={false} />
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
