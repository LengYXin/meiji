import { Button, Image, Text, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import get from 'lodash/get';
import { toJS } from 'mobx';
import { AtList, AtListItem } from 'taro-ui';
import Imgs from '../../../img';
import { Address, Orders, Products, User, EnumVipType } from '../../../store';
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
  state = {
    CouponCount: 0,
  }
  componentWillMount() { }

  componentWillReact() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() {
    const key = get(this.$router, 'params.key', '')
    User.onGetCoupon()
    Products.onGetProducts(key);
  }

  componentDidHide() { }
  onClickAddress() {
    Taro.navigateTo({ url: "/pages/user/address/index?key=Select" })
  }
  // 提交创建订单
  onCreate() {
    const address = Address.Default;
    const product = toJS(Products.details)
    if ((product.stockCount - product.salesCount) < (this.state.CouponCount + 1)) {
      return Taro.showToast({ title: "商品库存不足~", icon: "none" })
    }
    if (address.id) {
      Orders.onCreateOrder({
        cardCoupomCount: this.state.CouponCount,
        productCode: get(Products, 'details.productCode', ''),
        productCount: 1,
        shippingAddresseId: address.id
      })
    } else {
      Taro.showToast({ title: "请选择收货地址", icon: "none" })
    }
  }
  // 修改加购卷数量
  onUpdateCoupon(type: "plus" | "reduce") {
    try {
      let CouponCount = this.state.CouponCount;
      if (User.Info.vipType == EnumVipType.expVip) {
        throw "体验会员无法使用加购卷~"
      }
      if (type == "plus") {
        const product = toJS(Products.details)
        if ((product.stockCount - product.salesCount) < (CouponCount + 2)) {
          throw "商品库存不足~"
        }
        // 尊享
        if (User.Info.vipType == EnumVipType.excVip) {
          CouponCount++
        } else if (User.Info.vipType == EnumVipType.enjoyVip) {  // 优享
          if (CouponCount == 1) {
            throw "优享会员只能使用一张加购~"
          }
          if (CouponCount < User.Coupon.length) {
            CouponCount++
          } else {
            throw "加购卷数量不足~"
          }
        }



      } else {
        if (CouponCount > 0) {
          CouponCount--
        }
      }
      this.setState({ CouponCount })
    } catch (error) {
      Taro.showToast({ title: error, icon: "none" })
    }

  }
  render() {
    const product = toJS(Products.details)
    const Price = Products.toPrice(product.price);
    // 地址
    const address = Address.Default;
    // 合计
    const Total = Products.toPrice(product.price + product.price * this.state.CouponCount);
    const Couponlength = User.Coupon.length;
    const CouCount = Couponlength - this.state.CouponCount;
    const count = 1 + this.state.CouponCount;
    return (
      <View className='create'>
        <View className="create-header">
          <AtList hasBorder={false} >
            <AtListItem
              onClick={this.onClickAddress.bind(this)}
              hasBorder={false}
              arrow='right'
              title={address.receiver + "     " + Address.getHidePhone(address.phone)}
              // note={address.address}
              note={address.address}//`${address.province} ${address.city} ${address.area} `}
            />
          </AtList>
        </View>
        <View className="create-line"></View>
        <View className="create-content">
          <View className="content-left">
            <Image src={get(product.pictures, 0, '')} mode="aspectFit" />
          </View>
          <View className="content-right">
            <View className="right-name">{product.productName}</View>
            <View className="right-address"><Text>产地：</Text>{product.productOrigin}</View>
            <View className="right-money">
              <View className="money-left">
                <View className="left-qian">{Price}</View>
                <View className="left-type">全款预付</View>
              </View>
              <View className="money-rignt">
                <View className="rignt-top">
                  <Image className="rignt-jian" src={Imgs.Jian} onClick={this.onUpdateCoupon.bind(this, "reduce")} />
                  <View className="rignt-num">{count}</View>
                  <Image className="rignt-jia" src={Imgs.Jia} onClick={this.onUpdateCoupon.bind(this, "plus")} />
                </View>
                <View className="rignt-bottom">
                  {Couponlength > 0 && <View>加购劵<Text>x{CouCount}</Text></View>}
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="create-info">
          <View className="info-item">
            <View className="item-left">预计发货时间</View>
            <View className="item-right">10个工作日内</View>
          </View>
          <View className="info-item">
            <View className="item-left">商品实付</View>
            <View className="item-right">{Total}</View>
          </View>
          <View className="info-item">
            <View className="item-left">配送费</View>
            <View className="item-right">包邮</View>
          </View>
          {/* <View className="info-total">合计 {Total}</View> */}
        </View>
        <View className="create-btn">
          <View className="btn-txt">{Total}</View>
          <Button onClick={this.onCreate.bind(this)}>去支付</Button>
        </View>
      </View>
    )
  }
}
