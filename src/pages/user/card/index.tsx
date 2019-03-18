import { View, Button } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import { User } from '../../../store';
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
    navigationBarTitleText: '卡卷'
  }

  componentWillMount() { }

  componentWillReact() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() {
    User.onGetCoupon()
  }

  componentDidHide() { }
  onClick() {
    Taro.switchTab({ url: "/pages/sale/index" });
  }
  render() {
    const Coupon = toJS(User.Coupon);

    return (
      <View className='card'>
        {Coupon.map(data => {
          return <View className="card-box" key={data.id}>
            <View className="card-left">
              <View className="left-top">
                加购劵
        </View>
              <View className="left-bottom">
                凭此劵可额外加购商品
        </View>
            </View>
            <View className="card-right">
              <View className="right-top">
                <Button onClick={this.onClick.bind(this)}>立即使用</Button>
              </View>
              <View className="right-bottom">
                有效期:{data.endTime}
              </View>
            </View>
          </View>
        })}
      </View>
    )
  }
}
