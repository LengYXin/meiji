import { Image, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import lodash from 'lodash';
import { toJS } from 'mobx';
import { Products } from '../..//store';
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
    Products.onNewData()
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
                    <View className="title">{item.productName}</View>
                    <View className="cd">产地：{item.productOrigin}</View>
                    <View className="info">{item.summary}</View>
                    <View className="img">
                      <Image src={lodash.get(item, 0, '')} mode="aspectFit" />
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
