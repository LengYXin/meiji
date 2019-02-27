import { Image, Navigator, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import { AtButton, AtForm, AtInput, AtList, AtListItem } from 'taro-ui';
import lodash from 'lodash';
import NiuPai from '../../components/niupai';
import Img from '../../img';
import { User, Regular } from '../../store';
import './index.less';
const time = process.env.NODE_ENV === 'development' ? 5 : 60;
let codeTime = time
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
    phone: process.env.NODE_ENV === 'development' ? '1861175286' : '',
    code: '0327',
    codeTime: codeTime,//计时时间
    codeTimeStart: false,//计时开始状态
    codeDisabled: true,//按钮可用状态
    submitDisabled: true,//登陆按钮状态
  }
  componentWillMount() { }

  componentWillReact() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  /**
   * 登陆提交
   * @param event 
   */
  onSubmit(event) {
    if (!Regular.mobilePhone.test(this.state.phone)) {

    }
    User.onLogin({ phone: this.state.phone, loginValidateCode: this.state.code });
  }
  /**
   * 倒计时
   */
  onTime = (callback?) => {
    if (codeTime <= 1) {
      codeTime = time;
      return this.setState({ codeTime, codeTimeStart: false })
    }
    codeTime--;
    this.setState({ codeTime, codeTimeStart: true }, () => {
      lodash.delay(this.onTime, 1000);
      callback && callback()
    })
  }
  /**
   * 发送验证码
   */
  async onSendCode() {
    if (this.state.codeTimeStart) {
      return console.log("冷却中")
    }
    Taro.showLoading({ title: "", mask: true })
    const res = await User.onSendCode(this.state.phone);
    if (res) {
      this.onTime(() => {
        Taro.hideLoading()
      })
    } else {
      Taro.hideLoading();
      Taro.showToast({ title: "验证码发送失败，请重试", icon: "none" })
    }

  }
  /**
   * 数据更改
   * @param type 
   * @param event 
   */
  onChange(type: "phone" | "code", event: string) {
    let state: any = {
      [type]: event
    }
    if (type == "phone") {
      state['codeDisabled'] = !Regular.mobilePhone.test(event)
    }
    if (type == "code") {
      state['submitDisabled'] = event.length < 4;
    }
    this.setState(state)
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
            type='phone'
            placeholder='请输入手机号'
            maxlength={11}
            value={this.state.phone}
            onChange={this.onChange.bind(this, "phone")}
          />
          <AtInput
            className="form-input"
            name="code"
            clear
            type='number'
            disabled={this.state.codeDisabled}
            maxlength={4}
            placeholder='请输入验证码'
            value={this.state.code}
            onChange={this.onChange.bind(this, "code")}
          >
            <AtButton
              className="btn-code"
              disabled={this.state.codeDisabled || this.state.codeTimeStart}
              onClick={this.onSendCode.bind(this)}>
              {this.state.codeTimeStart ? `${this.state.codeTime}s 后发送` : '发送验证码'}
            </AtButton>
          </AtInput>
          <AtButton formType='submit' disabled={this.state.submitDisabled} className="btn-submit">登陆</AtButton>
          {/* <Navigator url="/pages/register/index">
            <AtList hasBorder={false}>
              <AtListItem
                hasBorder={false}
                extraText='会员注册'
                arrow='right'
              />
            </AtList>
          </Navigator> */}
        </AtForm>
        <View className="img-view">
          <Navigator url="/pages/home/index" openType="switchTab">
            <Image className="img-wx" mode="aspectFit" src={Img.Wx} />
          </Navigator>
        </View>
      </View>
    )
  }
}
