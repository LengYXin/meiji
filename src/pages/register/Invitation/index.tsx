import { View, Navigator, Input } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import './index.less';
import { AtButton, AtForm, AtDivider, AtIcon, AtList, AtListItem } from 'taro-ui';
import lodash from 'lodash';

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
  state = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
  }
  componentWillMount() { }

  componentWillReact() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onSubmit() {
    Taro.switchTab({ url: "/pages/home/index" })
    // console.log(this.state)
  }
  onInput(type, value) {
    this.setState({ [type]: lodash.get(value, 'detail.value', '') })
  }
  render() {
    const disabled = this.state.code1 && this.state.code2 && this.state.code3 && this.state.code4;
    return (
      <View className='index'>
        <View className="title">请输入邀请码</View>
        <AtForm className="form-body" onSubmit={this.onSubmit.bind(this)}>
          <View className='at-row'>
            <View className='at-col-input'>
              <Input type="number" maxLength={1} onInput={this.onInput.bind(this, 'code1')} />
            </View>
            <View className='at-col'></View>
            <View className='at-col-input'>
              <Input type="number" maxLength={1} onInput={this.onInput.bind(this, 'code2')} />
            </View>
            <View className='at-col'></View>
            <View className='at-col-input'>
              <Input type="number" maxLength={1} onInput={this.onInput.bind(this, 'code3')} />
            </View>
            <View className='at-col'></View>
            <View className='at-col-input'>
              <Input type="number" maxLength={1} onInput={this.onInput.bind(this, 'code4')} />
            </View>
          </View>
          <AtButton disabled={!disabled} formType='submit' className="btn-submit">完成</AtButton>
        </AtForm>
        {/* <View className="divider">
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
        </Navigator> */}
      </View>
    )
  }
}
