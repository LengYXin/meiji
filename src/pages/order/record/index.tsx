import { View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import './index.less';
import { AtTabs, AtTabsPane } from 'taro-ui'
import Card from './card'

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
    navigationBarTitleText: '我的订单'
  }

  componentWillMount() { }

  componentWillReact() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  state = {
    current: parseInt(this.$router.params.key),

  }
  handleClick(value) {
    this.setState({
      current: value
    })
  }
  render() {
    const tabList = [{ title: '全部订单' }, { title: '待付款' }, { title: '待发货' }, { title: '待收货' }, { title: '已完成' }]
    return (
      <View className="record">
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <Card data={this.state.current} />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <Card data={this.state.current} />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <Card data={this.state.current} />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            <Card data={this.state.current} />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={4}>
            <Card data={this.state.current} />
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
