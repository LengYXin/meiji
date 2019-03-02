import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import './index.less';
import { AtForm, AtInput, AtButton } from 'taro-ui';
export default class extends Component<any, any> {
    state = {
        phone: '',
        code: ''
    }
    onSubmit(event) {
        // Taro.navigateTo({ url: "/pages/register/Invitation/index" })
        console.log(this.state)
    }
    onChange(type, event) {
        this.setState({
            [type]: event
        })
    }
    render() {
        return (
            <View className="verification">
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
                </AtForm>
            </View>

        )
    }
}