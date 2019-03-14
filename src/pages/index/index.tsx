import { Button, Image, Navigator, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import head from 'lodash/head';
import { toJS } from 'mobx';
import Equity from '../../components/equity';
import NiuPai from '../../components/niupai';
import Imgs from "../../img";
import { Products, User } from '../../store';
import './index.less';


@observer
export default class extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *  
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 stßring
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '美季MEIJI'
  }

  componentWillMount() { }

  componentWillReact() {
  }

  componentDidMount() {
    Taro.showShareMenu({
      withShareTicket: true
    })
    User.onInit()
  }
  componentWillUnmount() { }

  componentDidShow() {
    User.onWxLogin()
  }
  componentDidHide() { }
  previewImage() {
    Taro.previewImage({
      urls: [Imgs.Code]
    })
  }
  async onClick(e) {
    // User.onAuth()
    await User.onGetAuthSetting()
    console.log(User.isUserInfoAuto, User.AutoData.access_token)
    if (User.isUserInfoAuto) {
      if (User.AutoData.access_token) {

        User.onGetUserInfo();
      } else {
        Taro.navigateTo({ url: "/pages/login/index" })
      }
    }
  }
  render() {
    if (!(Products.RecommendPruduct && Products.RecommendPruduct.id)) {
      return <View></View>
    }
    const products = toJS(Products.RecommendPruduct);
    const pictures = [...products.pictures];
    const imghead = head(pictures);
    return (
      <View className='index'>
        <Image className="img-block img-sp" src={imghead} mode="widthFix" />
        <View className="view-padding">
          <View className="font-title">{products.productName} </View>
          <View className="font-lable">产地：{products.productOrigin}</View>
          <View className="font-text">{products.summary}</View>
        </View>
        <View className="info">
          <NiuPai />
          <Equity />
          <View className="code-body" onClick={this.previewImage.bind(this)}>
            <Image src={Imgs.Code} className="c-icon" />
            <View className="c-kf">
              <Image src={Imgs.KF} className="c-kf-img" />
              联系客服
                </View>
          </View>
        </View>

        <View className="view-fixed-bottom">
          <Button openType="getUserInfo" onClick={this.onClick.bind(this)} >开启味觉之旅</Button>
        </View>
      </View>
    )
  }
}
