import { Button, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import get from 'lodash/get';
import { AtList, AtListItem, AtSwipeAction } from 'taro-ui';
import Loading from '../../../components/loading';
import { Address } from '../../../store';
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
    navigationBarTitleText: '收货地址',
    // 下拉刷新
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark"
  }
  // 下拉刷新
  async onPullDownRefresh() {
    await Address.dataSource.getPagingData(true, true)
    Taro.stopPullDownRefresh()
  }
  // 滚动加载
  onReachBottom() {
    Address.dataSource.getPagingData()
  }
  state = {
    isOpened: -1
  }
  componentWillMount() { }

  componentWillReact() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() {
    Taro.pageScrollTo({ scrollTop: 0 })
    Address.dataSource.getPagingData(true, true)
  }

  componentDidHide() { }

  onAppend(item) {
    if (item == "add") {
      Address.Details = {};
      return Taro.navigateTo({ url: "/pages/user/appendAddress/index?key=" })
    } else {
      Address.Details = item;
      const key = get(this.$router, 'params.key', '')
      if (key == "Select") {
        return Taro.navigateBack()
      } else {
        Taro.navigateTo({ url: "/pages/user/appendAddress/index?key=" })
      }
    }
  }
  onOpened(index) {
    this.setState({ isOpened: index })
  }
  onClosed(index) {
    this.setState({ isOpened: -1 })
  }
  onClick(item) {
    console.log(item)
    Address.onDelete(item.id)
  }
  render() {
    const data = [...Address.dataSource.PagingData];
    const loadingVis = Address.dataSource.PagingLoading;
    return (
      <View>
        <View className='address'>
          <AtList hasBorder={false} >
            {data.map((item, index) => {
              return <AtSwipeAction
                onClick={this.onClick.bind(this, item)}
                onOpened={this.onOpened.bind(this, index)}
                onClosed={this.onClosed.bind(this, index)}
                isOpened={this.state.isOpened === index}
                autoClose
                key={item.id}
                options={[
                  {
                    text: '删除',
                    style: {
                      backgroundColor: '#FF4949'
                    }
                  }
                ]}>
                <AtListItem
                  onClick={this.onAppend.bind(this, item)}
                  arrow='right'
                  note={item.address}// `${item.province} ${item.city} ${item.area} `}
                  title={item.receiver + "  " + Address.getHidePhone(item.phone)}
                  hasBorder={false}
                />
              </AtSwipeAction>
            })}
          </AtList>
          <Loading visible={loadingVis} />
        </View>
        <View className="address-btn">
          <Button onClick={this.onAppend.bind(this, "add")}>添加地址</Button>
        </View>
      </View>
    )
  }
}
