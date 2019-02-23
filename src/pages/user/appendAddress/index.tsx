import { View, Form, Button, } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import { AtInput, AtForm, AtButton } from 'taro-ui'
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
        navigationBarTitleText: '添加地址'
    }

    componentWillMount() { }

    componentWillReact() {
    }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    state = {
        name: '',
        phone: '',
        address: '',
        region: ''
    }
    onSubmit(e) {
        e.preventDefault()
        e.stopPropagation()
        console.log(this.state)
    }
    onName(value) {
        this.setState({
            name: value
        })
    }
    onPhone(value) {
        this.setState({
            phone: value
        })
    }
    onAddress(value) {
        this.setState({
            address: value
        })
    }
    onRegion(value) {
        this.setState({
            region: value
        })
    }
    render() {
        return (
            <View className="appendAddress">
                <Form
                    onSubmit={this.onSubmit.bind(this)}
                >
                    <AtInput
                        name='value'
                        title='收货人'
                        type='text'
                        placeholder='名字'
                        value={this.state.name}
                        onChange={this.onName.bind(this)}
                    />
                    <AtInput
                        name='value'
                        title='手机号码'
                        type='text'
                        placeholder='11位手机号'
                        value={this.state.phone}
                        onChange={this.onPhone.bind(this)}
                    />
                    <AtInput
                        name='value'
                        title='所在地区'
                        type='text'
                        placeholder='选择所在地区'
                        value={this.state.region}
                        onChange={this.onRegion.bind(this)}
                    />
                    <AtInput
                        name='value'
                        title='收货地址'
                        type='text'
                        placeholder='详细街道楼牌号等'
                        value={this.state.address}
                        onChange={this.onAddress.bind(this)}
                    />
                    <View className="btn">
                        <Button formType='submit'>保存</Button>
                    </View>
                </Form>
            </View>
        )
    }
}