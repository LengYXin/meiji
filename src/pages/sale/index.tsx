import { View, Image } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import { Products } from '../..//store';
import './index.less';
import { toJS } from 'mobx';

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
    navigationBarTitleText: '美季',
    // 下拉刷新
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark"
  }
  // 下拉刷新
  async onPullDownRefresh() {
    await Products.onOldData()
    Taro.stopPullDownRefresh()
  }
  // 滚动加载
  onReachBottom() {
    Products.onNewData()
  }

  componentWillMount() { }

  componentWillReact() {
  }

  componentDidMount() {
    Products.onGetProducts()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const dataSource = toJS(Products.dataSource)
    console.log(dataSource)
    return (
      <View className='index'>
        {dataSource.map(data => {
          return <View key={data.key}>
            <View className="time-title" >
              <View >
                {data.title}
              </View>
            </View>
            {
              data.list.map(item => {
                return (
                  <View className='products-item' key={item.id}>
                    <View className="title">{item.summary}</View>
                    <View className="cd">产地：阳澄湖</View>
                    <View className="info">阳澄湖大闸蟹，江苏省苏州市特产，中国国家地理标志产品。 [1-2]</View>
                    <View className="img">
                      <Image src="" mode="aspectFit" />
                    </View>
                  </View>
                )
              })
            }
          </View>
        })}
      </View>
    )
  }
}
