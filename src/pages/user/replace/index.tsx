import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import './index.less';
import { View, Text } from '@tarojs/components';
import { AtForm, AtInput, AtButton } from 'taro-ui';

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
        phone: '',
        code: '',
        type: false
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
    onClick() {
        this.setState({
            type: true
        })
    }
    render() {
        return (
            <View className="replace">
                <AtForm className="form-body" onSubmit={this.onSubmit.bind(this)}>
                    {
                        this.state.type ? <AtInput
                            className="form-input"
                            name="phone"
                            clear
                            type='text'
                            placeholder='请输入手机号'
                            value={this.state.phone}
                            onChange={this.onChange.bind(this, "phone")}
                        /> : <View className="form-view">当前手机号<Text className="form-text">185****3566</Text></View>
                    }
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
                    {
                        this.state.type ? <AtButton formType='submit' className="btn-submit">完成</AtButton>
                            :
                            <AtButton className="btn-submit" onClick={this.onClick.bind(this)}>下一步</AtButton>
                    }

                </AtForm>
            </View>

        )
    }
}