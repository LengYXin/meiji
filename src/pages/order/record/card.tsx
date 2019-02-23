import { View, Text, Image, Button } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import './index.less';

@observer
export default class extends Component<{ data: any }, any> {

    /**
     * 指定config的类型声明为: Taro.Config
     *  
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: '我的订单'
    }

    componentWillMount() { }

    componentWillReact() {
    }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    renderState() {
        const data: any = 1
        switch (data) {
            case 1:
                return <View className="btn-left">待付款</View>
                break;
            case 2:
                return <View className="btn-left">待发货</View>
                break;
            case 3:
                return <View className="btn-left">已发货</View>
                break;
            case 4:
                return <View className="btn-left">已完成</View>
                break;
        }
    }
    render() {
        return (
            <View className="card">
                <View className="card-orderCode"><Text>订单编号：</Text>34765676543456</View>
                <View className="card-content">
                    <View className="content-left">
                        <Image src="" />
                    </View>
                    <View className="content-right">
                        <View className="right-name">湖丰阳澄湖大闸蟹螃蟹</View>
                        <View className="right-address"><Text>产地：</Text>阳澄湖</View>
                        <View className="right-money">
                            <View className="money-left">
                                <View className="left-qian">￥2.300</View>
                                <View className="left-type">全款预付</View>
                            </View>
                            <View className="money-rignt">
                                <View className="rignt-num">×1</View>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="card-btn">
                    {this.renderState()}
                    <View className="btn-rigtn">
                        <Button>取消</Button>
                    </View>
                </View>
            </View>
        )
    }
}