import { View, Button } from '@tarojs/components';
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

  onAppend(){
    Taro.navigateTo({url: "/pages/user/appendAddress/index?key=" })
  }
  render() {
    const name = "张磊"
    const phone = "185****3566"
    const data = ['1', '2', '3', '4']
    return (
      <View>
        <View className='address'>
          {data.map((x, index) => {
            return <AtList hasBorder={false} key={index}>
              <AtListItem
                arrow='right'
                note='北京市昌平区天通苑'
                title={name + "  " + phone}
                hasBorder={false}
              />
            </AtList>
          })}
        </View>
        <View className="address-btn">
          <Button onClick={this.onAppend.bind(this)}>添加地址</Button>
        </View>
      </View>
    )
  }
}
