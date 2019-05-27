import { View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import get from 'lodash/get';
import toInteger from 'lodash/toInteger';
import { AtTabs } from 'taro-ui';
import Loading from '../../../components/loading';
import { Orders } from '../../../store';
import Card from './card';
import './index.less';
@observer
export default class extends Component<{ key: any }, any>{

  /**
   * 指定config的类型声明为: Taro.Config
   *  
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '我的订单',
    // 下拉刷新
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark"
  }
  // 下拉刷新
  async onPullDownRefresh() {
    await Orders.dataSource.getPagingData(true, true)
    Taro.stopPullDownRefresh()
  }
  // 滚动加载
  onReachBottom() {
    Orders.dataSource.getPagingData()
  }
  componentWillMount() { }

  componentWillReact() {
  }

  componentDidMount() { }

  componentWillUnmount() { }
  urls = [
    '/api/v1/Orders',
    '/api/v1/Orders/Status/pendingPayment',
    '/api/v1/Orders/Status/toBeDelivered',
    '/api/v1/Orders/Status/shipped',
    '/api/v1/OrderBack',
  ]
  componentDidShow() {
    Taro.pageScrollTo({ scrollTop: 0 })
    Orders.dataSource.onReset({}, this.urls[this.state.current])
    Orders.dataSource.getPagingData(true, true)
  }
  getKey() {
    return parseInt(get(this.$router, 'params.key', 0))
  }
  componentDidHide() { }
  state = {
    current: this.getKey()
  }
  //  待付款            待收货            代发货   已完成       关闭   取消      用户取消
  // pendingPayment, toBeDelivered, shipped, completed, close, cancel, cancelByUser
  handleClick(value) {
    this.setState({
      current: value
    });
    Orders.dataSource.onReset({}, this.urls[value])
    Orders.dataSource.getPagingData(true, true)
  }
  render() {
    const tabList = [{ title: '全部订单' }, { title: '待付款' }, { title: '待发货' }, { title: '待收货' }, { title: '退换货' }];
    const PagingData = [...Orders.dataSource.PagingData];
    const loadingVis = Orders.dataSource.PagingLoading;
    return (
      <View className="record">
        <AtTabs  current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        </AtTabs>
        {PagingData.map(data => {
          return <Card data={data} key={data.orderNO} />
        })}
        <Loading visible={loadingVis} />
      </View>
    )
  }
}
