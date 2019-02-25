import { Image, Text, View, Navigator } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import { AtButton, AtForm, AtInput, AtList, AtListItem } from 'taro-ui';
import NiuPai from '../../components/niupai';
import Img from '../../img'
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
    navigationBarTitleText: '美季'
  }
  state = {
    phone: '',
    code: ''
  }
  componentWillMount() { }

  componentWillReact() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onSubmit(event) {
    Taro.navigateTo({ url: "/pages/register/Invitation/index" })
    console.log(this.state)
  }
  onChange(type, event) {
    this.setState({
      [type]: event
    })
  }
  render() {
    return (
      <View className='index'>
        <NiuPai />
        <AtForm className="form-body" onSubmit={this.onSubmit.bind(this)}>
          <AtInput
            className="form-input"
            name="phone"
            clear
            type='text'
            placeholder='请输入手机号'

            value={this.state.phone}
            onChange={this.onChange.bind(this, "phone")}
          />
          <AtInput
            className="form-input"
            name="code"
            clear
            type='text'

            placeholder='验证码'
            value={this.state.code}
            onChange={this.onChange.bind(this, "code")}
          >
            <AtButton className="btn-code">发送验证码</AtButton>
          </AtInput>
          <AtButton formType='submit' className="btn-submit">注册</AtButton>
          <Navigator url="/pages/login/index" openType="navigateBack">
            <AtList hasBorder={false}>
              <AtListItem
                hasBorder={false}
                extraText='会员登录'
                arrow='right'
              />
            </AtList>
          </Navigator>
        </AtForm>
        <View className="img-view">
          <Image className="img-wx" mode="aspectFit" src={Img.Wx} />
        </View>
      </View>
    )
  }
}
