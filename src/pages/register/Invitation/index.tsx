import { View, Navigator } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import './index.less';
import { AtButton, AtForm, AtDivider, AtIcon, AtList, AtListItem } from 'taro-ui';

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
    navigationBarTitleText: '美季'
  }

  componentWillMount() { }

  componentWillReact() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onSubmit() {

  }
  render() {
    return (
      <View className='index'>
        <View className="title">请输入邀请码</View>
        <AtForm className="form-body" onSubmit={this.onSubmit.bind(this)}>
          <View className='at-row'>
            <View className='at-col'>A</View>
            <View className='at-col'>B</View>
            <View className='at-col'>C</View>
            <View className='at-col'>C</View>
          </View>
          <AtButton formType='submit' className="btn-submit">完成</AtButton>
        </AtForm>
        <View className="divider">
          <AtDivider>
            <View className="divider-text">或</View>
          </AtDivider>
        </View>
        <Navigator url="/pages/equity/index">
          <AtList hasBorder={false}>
            <AtListItem
              className="nav-item"
              hasBorder={false}
              extraText='购买会员升级体验'
              arrow='right'
            />
          </AtList>
        </Navigator>
      </View>
    )
  }
}
