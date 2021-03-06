import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import get from 'lodash/get';
import { toJS } from 'mobx';
import { Products } from '../..//store';
import Details from '../../components/details';
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
    navigationBarTitleText: '美季MEIJI',
    // 下拉刷新
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark"
  }
  // 下拉刷新
  async onPullDownRefresh() {
    Taro.showLoading({ title: "加载中~", mask: true })
    const key = get(this.$router, 'params.key', '')
    await Products.onGetProducts(key);
    Taro.stopPullDownRefresh()
    Taro.hideLoading()
  }
  componentWillMount() { }

  componentWillReact() {
  }
  componentWillUnmount() {
    console.log("componentWillUnmount")
    Products.onUnmountProducts()
  }
  onShareAppMessage() {
    return {
      title: `${get(Products.details, 'productName', '')} 产地：${get(Products.details, 'productOrigin', '')} `
    }
  }
  componentDidShow() {
    if (this.isDidHide) {
      return
    }
    Taro.showShareMenu({
      withShareTicket: true,
    })
    // Taro.updateShareMenu({
    //   updateShareMenu
    // })
    const key = get(this.$router, 'params.key', '')
    Products.onGetProducts(key);
  }
  isDidHide = false;
  componentDidHide() {
    console.log("componentDidHide")
    this.isDidHide = true;
  }
  render() {
    const key = get(this.$router, 'params.key', '')
    const canBuy = get(this.$router, 'params.canBuy', true)
    const hideShop = canBuy === false || canBuy === "false";
    const products = toJS(Products.details)
    return (
      <Details data={products} hideShop={hideShop} key={key} />
    )
  }
}
