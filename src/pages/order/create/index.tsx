import { View, Image, Text, Button } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import './index.less';
import { AtList, AtListItem } from 'taro-ui';
import jia from '../../../img/img50.png'
import jian from '../../../img/img51.png'
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

  componentWillMount() { }

  componentWillReact() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='create'>
        <View className="create-header">
          <AtList hasBorder={false}>
            <AtListItem
              hasBorder={false}
              arrow='right'
              note='描述信息'
              title='标题文字标题文字标题文字标题文字标题文字'
            />
          </AtList>
        </View>
        <View className="create-line"></View>
        <View className="create-content">
          <View className="content-left">
            <Image src="" />
          </View>
          <View className="content-right">
            <View className="right-name">湖丰阳澄湖大闸蟹螃蟹</View>
            <View className="right-address"><Text>产地：</Text>阳澄湖</View>
            <View className="right-money">
              <View className="money-left">
                <View className="left-qian">￥2.300</View>
                <View className="left-type">全款预付</View>
              </View>
              <View className="money-rignt">
                <View className="rignt-top">
                  <Image className="rignt-jian" src={jian} />
                  <View className="rignt-num">1</View>
                  <Image className="rignt-jia" src={jia} />
                </View>
                <View className="rignt-bottom">
                  <View>加购劵<Text>x2</Text></View>
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
            <View className="item-right">￥2300</View>
          </View>
          <View className="info-item">
            <View className="item-left">配送费</View>
            <View className="item-right">包邮</View>
          </View>
          <View className="info-total">合计￥2300</View>
        </View>
        <View className="create-btn">
          <View className="btn-txt">￥2300</View>
          <Button>去支付</Button>
        </View>
      </View>
    )
  }
}
