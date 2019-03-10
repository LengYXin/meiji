import { Text, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config, navigateTo } from '@tarojs/taro';
import delay from 'lodash/delay';
import { AtButton, AtForm, AtInput } from 'taro-ui';
import { User } from '../../..//store';
import './index.less';
const dev = process.env.NODE_ENV === 'development'
const time = dev ? 5 : 60;
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
        navigationBarTitleText: '账户安全'
    }

    componentWillMount() { }

    componentWillReact() {
    }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    state = {
        codeTime: codeTime,//计时时间
        codeTimeStart: false,//计时开始状态
        codeDisabled: true,//按钮可用状态
        newPhone: '',
        newValidateCode: '',
        oldValidateCode: '',
        type: false
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
            delay(this.onTime, 1000);
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
        const phone = this.state.type ? this.state.newPhone : User.Info.phone;
        const type = this.state.type ? "changePhone" : "verification"
        Taro.showLoading({ title: "", mask: true })
        const res = await User.onSendCode(phone, type);
        if (res) {
            this.onTime(() => {
                Taro.hideLoading()
            })
        }
    }
    async  onSubmit(event) {
        const res = await User.onUpdatePhone({
            newPhone: this.state.newPhone,
            newValidateCode: this.state.newValidateCode,
            oldValidateCode: this.state.oldValidateCode,
        })
        if (res.isSuccess) {
            Taro.showToast({ title: "修改成功", icon: "none", mask: true })
            delay(Taro.navigateBack, 2000);
        } else {
            Taro.showToast({ title: res.msg, icon: "none", })
        }
    }
    onChange(type, event) {
        this.setState({
            [type]: event
        })
    }
    onClick() {
        this.setState({
            type: true
        })
    }
    render() {
        const HidePhone = User.HidePhone
        const xdisabled = this.state.oldValidateCode.length < 4;
        const sdisabled = this.state.newValidateCode.length < 4;
        const type = this.state.type
        return (
            <View className="replace">
                <AtForm className="form-body" onSubmit={this.onSubmit.bind(this)}>
                    {
                        type ? <AtInput
                            className="form-input"
                            name="phone"
                            clear
                            type='text'
                            placeholder='请输入手机号'
                            value={this.state.newPhone}
                            onChange={this.onChange.bind(this, "newPhone")}
                        /> : <View className="form-view">当前手机号<Text className="form-text">{
                            HidePhone
                        }</Text></View>
                    }
                    <AtInput
                        className="form-input"
                        name="code"
                        clear
                        type='text'
                        placeholder='验证码'
                        value={type ? this.state.newValidateCode : this.state.oldValidateCode}
                        onChange={this.onChange.bind(this, type ? "newValidateCode" : "oldValidateCode")}
                    >
                        <AtButton
                            className="btn-code"
                            disabled={this.state.codeTimeStart}
                            onClick={this.onSendCode.bind(this)}>
                            {this.state.codeTimeStart ? `${this.state.codeTime}s 后发送` : '发送验证码'}
                        </AtButton>
                    </AtInput>
                    {
                        type ? <AtButton formType='submit' disabled={sdisabled} className="btn-submit">完成</AtButton>
                            :
                            <AtButton className="btn-submit" disabled={xdisabled} onClick={this.onClick.bind(this)}>下一步</AtButton>
                    }

                </AtForm>
            </View>

        )
    }
}