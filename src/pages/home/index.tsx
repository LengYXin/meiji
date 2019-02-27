import { View, Button, Textarea } from '@tarojs/components';
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
    navigationBarTitleText: '首页'
  }
  state = {
    view: false,
    code: ""
  }
  componentWillMount() { }

  componentWillReact() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  async onGet() {
    const code = await Taro.login()
    this.setState({ code: code.code, view: true })
  }
  render() {
    return (
      <View className='index'>
        <Button onClick={this.onGet.bind(this)}>获取</Button>
        {this.state.view && <View>
          <View>🐷：这是您的 Code</View>
          <Textarea value={this.state.code} />
        </View>}

      </View>
    )
  }
}
