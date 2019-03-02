import { View, Button } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
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
    navigationBarTitleText: '卡卷'
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
      <View className='card'>
        {/* 蓝湖下载的背景图片有问题 */}
        <View className="card-box">
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
              <Button>立即使用</Button>
            </View>
            <View className="right-bottom">
              有效期:1019.1.1
          </View>
          </View>
        </View>
      </View>
    )
  }
}
