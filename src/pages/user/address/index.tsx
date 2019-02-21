import { View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import './index.less';
import { AtList, AtListItem } from 'taro-ui';

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
    navigationBarTitleText: '收货地址'
  }

  componentWillMount() { }

  componentWillReact() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const name = "张磊"
    const phone = "185****3566"
    return (
      <View className='address'>
        <AtList hasBorder={false}>
          <AtListItem
            arrow='right'
            note='北京市昌平区天通苑'
            title={name + "  " + phone}
            hasBorder={false}
          />
        </AtList>
      </View>
    )
  }
}
