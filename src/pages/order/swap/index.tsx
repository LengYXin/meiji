import { Button, Image, Text, View, Input } from "@tarojs/components";
import { observer } from "@tarojs/mobx";
import Taro, { Component, Config } from "@tarojs/taro";
import { toJS } from "mobx";
import { AtImagePicker, AtTextarea, AtButton, AtList, AtListItem } from "taro-ui";
import Imgs from "../../../img";
import { Address, Orders, Products, User, EnumVipType } from "../../../store";
import "./index.less";

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
        navigationBarTitleText: "退换货"
    };
    state = {
        files: [],
        value: "",
        loading: false
    };
    componentWillMount() { }

    componentWillReact() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    onChange(files) {
        this.setState({
            files
        });
    }
    onFail(mes) {
        console.log(mes);
    }
    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }
    render() {
        const { files, value, loading } = this.state;
        return (
            <View className="swap">
                <View className="product-info">
                    <Image src={Imgs.Right} mode="aspectFit" />
                    <View className="info-ctx">
                        <View className="member">
                            <Text>湖丰阳澄湖大闸蟹螃蟹</Text>
                        </View>
                        <View className="maturity">产地：阳澄湖</View>
                    </View>
                </View>
                <View className="reason">
                    {/* <View className="reason-left item-title">退款原因</View>
                    <View className="reason-right">></View> */}
                    <AtList hasBorder={false}>
                        <AtListItem title='退款原因' arrow='right' onClick={()=>Taro.navigateTo({url:"/pages/order/swapType/index"})} hasBorder={false} />
                    </AtList>
                </View>
                <View className="description">
                    <View className="item-title">退款说明</View>
                    <AtTextarea
                        className="description-textarea"
                        count={false}
                        value={value}
                        onChange={this.handleChange.bind(this)}
                        placeholder=""
                    />
                </View>
                <View className="upload">
                    <View className="item-title">上传凭证</View>
                    <AtImagePicker
                        className="upload-imgpicker"
                        length={3}
                        files={files}
                        onChange={this.onChange.bind(this)}
                    />
                </View>
                <AtButton
                    className="but-bottom"
                    loading={loading}
                    type="primary"
                >
                    提交
                </AtButton>
            </View>
        );
    }
}
